import { useEffect, useRef, useState } from "react";

const Meme = () => {
  const [upper, setUpper] = useState("Upper Text");
  const [lower, setLower] = useState("Lower Text");
  const [image, setImage] = useState(
    "https://helios-i.mashable.com/imagery/articles/02bBNcEytrPlxf6CUAqZfYY/hero-image.fill.size_1200x900.v1623370042.png"
  );

  const canvas = useRef();
  let ctx = null;

  useEffect(() => {
    const canvasEle = canvas.current;
    console.log(canvasEle.clientWidth);
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = 1000;

    ctx = canvasEle.getContext("2d");
    console.log(ctx);
    var background = new Image();
    background.src = image;

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function () {
      ctx.drawImage(background, 0, 0);
      writeText({ text: "Clue Mediator!", x: 180, y: 70 });
    };

    console.log(canvasEle.toDataURL());
  }, []);

  const writeText = (info, style = {}) => {
    const { text, x, y } = info;
    const {
      fontSize = 40,
      fontFamily = "Arial",
      color = "black",
      textAlign = "center",
      textBaseline = "top",
    } = style;

    ctx.beginPath();
    ctx.font = fontSize + "px " + fontFamily;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.stroke();
  };

  return (
    <div>
      <input className="form-control"></input>
      <div className="container">
        <canvas ref={canvas} style={{ width: "100%" }}></canvas>
      </div>
    </div>
  );
};

export default Meme;
