// The old draw tool. Rewrite this.
function draw(pos, state, dispatch) {
  let prevPos = pos;

  drawPixels(pos, state);

  return drawPixels;

  function drawPixels(pos, state) {
    // console.log(state);

    const func = line(prevPos, state, dispatch);
    func(pos);
    prevPos = pos;
  }

  // function drawPixel({ x, y }, state) {
  //   let drawn = { x, y, color: state.color };
  //   dispatch({ picture: state.picture.draw([drawn]) });
  // }
  // drawPixel(pos, state);
  // return drawPixel;
}

function line(start, state, dispatch, persist) {
  drawLine(start);
  return drawLine;

  function drawLine(pos) {
    let startPoint = start;
    let endPoint = pos;

    if (pos.x < start.x) {
      [startPoint, endPoint] = [endPoint, startPoint];
    }
    const x = Math.abs(startPoint.x - endPoint.x);
    const y = Math.abs(startPoint.y - endPoint.y);

    let slope = (startPoint.y - endPoint.y) / (startPoint.x - endPoint.x);
    if (slope === -Infinity) slope = 999999;
    if (slope === Infinity) slope = -999999;

    const drawn = [
      { x: startPoint.x, y: startPoint.y, color: state.color },
      { x: endPoint.x, y: endPoint.y, color: state.color },
    ];

    for (let i = 0; i < Math.max(x, y); ++i) {
      const obj = {
        color: state.color,
      };

      if (x > y) {
        obj.x = startPoint.x + i;
        obj.y = Math.round(startPoint.y + i * slope);
      } else {
        obj.x = Math.round(startPoint.x + i / Math.abs(slope));
        obj.y = startPoint.y + (slope >= 0 ? i : -i);
      }

      drawn.push(obj);
    }

    dispatch({ picture: state.picture.draw(drawn) });
  }
}

let dom = startPixelEditor({
  tools: { draw, line, fill, rectangle, pick },
});
document.querySelector('div').appendChild(dom);

// function circle(start, state, dispatch) {
//   const width = state.picture.width;
//   const height = state.picture.height;

//   function drawCircle(pos) {
//     const radius = Math.ceil(
//       Math.sqrt((start.x - pos.x) ** 2 + (start.y - pos.y) ** 2)
//     );

//     const drawn = [];
//     for (let y = start.y - radius; y <= start.y + radius; y++) {
//       for (let x = start.x - radius; x <= start.x + radius; x++) {
//         if (Math.sqrt((start.x - x) ** 2 + (start.y - y) ** 2) <= radius) {
//           drawn.push({ x, y, color: state.color });
//         }
//       }
//     }
//     dispatch({ picture: state.picture.draw(drawn) });
//   }
//   drawCircle(start);
//   return drawCircle;
// }
