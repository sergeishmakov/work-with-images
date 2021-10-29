import { max } from "lodash";

export function getImageData(img, method) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0);

  if (method) method(context, img.width, img.height);

  return context.getImageData(0, 0, img.width, img.height);
}

export function getBrightnessChartData(inImg) {
  const src = new Uint32Array(inImg.data.buffer);

  const data = new Array(256).fill(0);

  for (let i = 0; i < src.length; i++) {
    data[src[i] & 0xff]++;
  }

  return { maxBrightness: max(data), data };
}

export function getRGBChartData(inImg) {
  const src = new Uint32Array(inImg.data.buffer);

  let R = new Array(256).fill(0);
  let G = new Array(256).fill(0);
  let B = new Array(256).fill(0);

  for (let i = 0; i < src.length; i++) {
    const r = src[i] & 0xff;
    const g = (src[i] >> 8) & 0xff;
    const b = (src[i] >> 16) & 0xff;
    R[r]++;
    G[g]++;
    B[b]++;
  }

  return { maxBrightness: max([...R, ...G, ...B]), R, G, B };
}
