// The original PixelEditor class. Extend the constructor.
class PixelEditor {
  constructor(state, config) {
    let { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, (pos) => {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);
      if (onMove) {
        return (pos) => onMove(pos, this.state, dispatch);
      }
    });
    this.controls = controls.map((Control) => new Control(state, config));
    this.dom = elt(
      'div',
      { tabIndex: 0 },
      this.canvas.dom,
      elt('br'),
      ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
    );

    this.dom.addEventListener('keyup', toolsKeybindingHandler);
    this.dom.addEventListener('keyup', actionKeybindingHandler);

    function toolsKeybindingHandler(event) {
      for (const tool in tools) {
        if (tools.hasOwnProperty(tool)) {
          if (event.keyCode === tool.toUpperCase().charCodeAt(0)) {
            dispatch({ tool: tool });
            event.preventDefault();
            break;
          }
        }
      }
    }

    function actionKeybindingHandler(event) {
      if (event.metaKey || event.ctrlKey) {
        switch (event.keyCode) {
          case 'Z'.charCodeAt(0):
            dispatch({ undo: true });
            event.preventDefault();
            break;
        }
      }
    }
  }

  syncState(state) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) ctrl.syncState(state);
  }
}

document.querySelector('div').appendChild(startPixelEditor({}));
