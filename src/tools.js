import { Colors } from "./colors";

export function drawBrightnessChart(canvas, { maxBrightness, data }) {
  const ctx = canvas.getContext("2d");

  let guideHeight = 8;
  let startY = canvas.height - guideHeight;
  let dx = canvas.width / 256;
  let dy = startY / maxBrightness;
  ctx.lineWidth = dx;
  ctx.fillStyle = Colors.white;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  data.forEach((value, i) => {
    const x = i * dx;

    ctx.strokeStyle = Colors.black;
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY - value * dy);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "rgb(" + i + ", " + i + ", " + i + ")";
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, canvas.height);
    ctx.closePath();
    ctx.stroke();
  });
}

export function drawRGBChart(canvas, { maxBrightness, R, G, B }) {
  const ctx = canvas.getContext("2d");

  let guideHeight = 8;
  let startY = canvas.height - guideHeight;
  let dx = canvas.width / 256;
  let dy = startY / maxBrightness;
  ctx.lineWidth = dx;
  ctx.fillStyle = Colors.white;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  R.forEach((_value, i) => {
    const x = i * dx;

    ctx.strokeStyle = "rgba(220,0,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY - R[i] * dy);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "rgba(0,210,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY - G[i] * dy);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "rgba(0,0,255,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY - B[i] * dy);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "rgb(" + i + ", " + i + ", " + i + ")";
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, canvas.height);
    ctx.closePath();
    ctx.stroke();
  });
}
