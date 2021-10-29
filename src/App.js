import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";

import { getBrightnessChartData, getImageData, getRGBChartData } from "./utils";

import "./App.css";
import { drawBrightnessChart, drawRGBChart } from "./tools";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isColor, setIsColor] = useState(false);

  const [canvas, setCanvas] = useState(null);

  const handleFileUpload = ({ target: { files } }) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.style.filter = "invert(100%)";
    img.onload = function () {
      setImageData(getImageData(this));
    };
  };

  const ref = useCallback((node) => {
    if (node) setCanvas(node);
  }, []);

  const createBarChart = useCallback(() => {
    if (isColor) return drawRGBChart(canvas, getRGBChartData(imageData));
    return drawBrightnessChart(canvas, getBrightnessChartData(imageData));
  }, [canvas, imageData, isColor]);

  const handleIsColorChange = (value) => {
    setIsColor(value);
  };

  useEffect(() => {
    if (canvas && imageData) {
      createBarChart();
    }
  }, [canvas, createBarChart, imageData]);

  return (
    <div className="App">
      <div className="row">
        <p>Выберите изображение</p>
      </div>

      <div className="row">
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>
      <div className="row">
        <img
          style={{ filter: "invert(100%)" }}
          src={imageUrl}
          width="300px"
          alt=""
        />
      </div>
      <div className="row">
        <span className="label">Brightness</span>
        <Switch onChange={handleIsColorChange} checked={isColor} />
        <span className="label">Color</span>
      </div>
      <div className="row">
        <canvas ref={ref} width="256" height="150" />
      </div>
    </div>
  );
}

export default App;
