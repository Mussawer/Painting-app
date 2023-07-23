import React, { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const Canvas = (props) => {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const canvasContextRef = useRef();

  // needed to persist drawing on resize
  const inMemoryCanvasRef = useRef(document.createElement("canvas"));
  const inMemoryContextRef = useRef();

  useEffect(() => {
    canvasContextRef.current = canvasRef.current.getContext("2d");
    inMemoryContextRef.current = inMemoryCanvasRef.current.getContext("2d");
  }, []);

  useEffect(() => {
    canvasContextRef.current.fillStyle = "#ffffff";
    canvasContextRef.current.fillRect(0, 0, width, height);
    canvasContextRef.current.drawImage(inMemoryCanvasRef.current, 0, 0);
  }, [width, height]);

  useWindowSize(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  const handleMouseMove = (event) => {
    drawLine(event.clientX, event.clientY);
  };

  function drawLine(posX, posY) {
    // actual coordinates
    const coords = [
      posX - canvasRef.current.offsetLeft,
      posY - canvasRef.current.offsetTop,
    ];

    if (drawing) {
      canvasContextRef.current.lineTo(...coords);
      canvasContextRef.current.stroke();
    }

    if (props.handleMouseMove) {
      props.handleMouseMove(...coords);
    }
  }

  function startDrawing(posX, posY) {
    canvasContextRef.current.lineJoin = "round";
    canvasContextRef.current.lineCap = "round";
    canvasContextRef.current.lineWidth = props.lineWidth;
    canvasContextRef.current.strokeStyle = props.color;
    canvasContextRef.current.beginPath();

    console.log(posX, posY);

    // actual coordinates
    canvasContextRef.current.moveTo(
      posX - canvasRef.current.offsetLeft,
      posY - canvasRef.current.offsetTop
    );

    setDrawing(true);
  }

  const handleMouseDown = (event) => {
    startDrawing(event.clientX, event.clientY);
  };

  const stopDrawing = () => {
    canvasContextRef.current.closePath();
    setDrawing(false);

    inMemoryCanvasRef.current.width = canvasRef.current.width;
    inMemoryCanvasRef.current.height = canvasRef.current.height;
    inMemoryContextRef.current.drawImage(canvasRef.current, 0, 0);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startDrawing(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    drawLine(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    stopDrawing();
  };

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        width={props.width || width}
        height={props.height || height}
        onMouseDown={handleMouseDown}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      />
    </React.Fragment>
  );
};

export default Canvas;
