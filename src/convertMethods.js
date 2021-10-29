export function invert(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);

  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  context.putImageData(imageData, 0, 0);
}

export function grayscale(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);

  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }

  context.putImageData(imageData, 0, 0);
}
