function circle(start, state, dispatch) {
  const width = state.picture.width;
  const height = state.picture.height;

  function drawCircle(pos) {
    const radius = Math.ceil(
      Math.sqrt((start.x - pos.x) ** 2 + (start.y - pos.y) ** 2)
    );

    const drawn = [];
    for (let y = start.y - radius; y <= start.y + radius; y++) {
      for (let x = start.x - radius; x <= start.x + radius; x++) {
        if (Math.sqrt((start.x - x) ** 2 + (start.y - y) ** 2) <= radius) {
          drawn.push({ x, y, color: state.color });
        }
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawCircle(start);
  return drawCircle;
}

let dom = startPixelEditor({
  tools: Object.assign({}, baseTools, { circle }),
});
document.querySelector('div').appendChild(dom);
