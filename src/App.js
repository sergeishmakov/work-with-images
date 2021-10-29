import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";
import { capitalize, startCase } from "lodash";

import { getBrightnessChartData, getImageData, getRGBChartData } from "./utils";

import "./App.css";
import { drawBrightnessChart, drawRGBChart } from "./tools";
import { grayscale, invert } from "./convertMethods";

const Filters = {
  NONE: "none",
  INVERSION: "inverse",
  BLACK_WHITE: "black_white",
};

const imageFilters = {
  [Filters.NONE]: "none",
  [Filters.INVERSION]: "invert(100%)",
  [Filters.BLACK_WHITE]: "grayscale(100%)",
};

const filterMethods = {
  [Filters.NONE]: null,
  [Filters.INVERSION]: invert,
  [Filters.BLACK_WHITE]: grayscale,
};

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isColor, setIsColor] = useState(false);
  const [filter, setFilter] = useState(Filters.NONE);
  const [img, setImg] = useState(null);

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
      setImg(this);
    };
  };

  const ref = useCallback((node) => {
    if (node) setCanvas(node);
  }, []);

  const createBarChart = useCallback(
    (data) => {
      if (isColor) return drawRGBChart(canvas, getRGBChartData(data));
      return drawBrightnessChart(canvas, getBrightnessChartData(data));
    },
    [canvas, isColor]
  );

  useEffect(() => {
    if (img && canvas) {
      const newImageData = getImageData(img, filterMethods[filter]);
      if (!newImageData) return;
      createBarChart(newImageData);
    }
  }, [canvas, createBarChart, filter, img]);

  const handleIsColorChange = (value) => {
    setIsColor(value);
  };

  return (
    <div className="App">
      <div className="row">
        <p>Выберите изображение</p>
      </div>

      <div className="row">
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>
      <div className="row">
        {Object.values(Filters).map((item) => (
          <label className="checkbox">
            <input
              type="checkbox"
              checked={filter === item}
              onChange={() => setFilter(item)}
            />
            {capitalize(startCase(item))}
          </label>
        ))}
      </div>
      <div className="row">
        <img
          style={{ filter: imageFilters[filter] }}
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
