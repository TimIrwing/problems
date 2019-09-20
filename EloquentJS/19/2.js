// Change this method
PictureCanvas.prototype.syncState = function(picture) {
  if (this.picture == picture) return;
  if (
    this.picture &&
    this.picture.height === picture.height &&
    this.picture.width === picture.width
  ) {
    drawPicture(picture, this.dom, scale, this.picture);
  } else {
    drawPicture(picture, this.dom, scale);
  }
  this.picture = picture;
};

// You may want to use or change this as well
function drawPicture(picture, canvas, scale, prevPicture) {
  if (!prevPicture) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
  }
  let cx = canvas.getContext('2d');

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      if (prevPicture && prevPicture.pixel(x, y) === picture.pixel(x, y)) {
        continue;
      }

      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

document.querySelector('div').appendChild(startPixelEditor({}));
