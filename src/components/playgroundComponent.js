import React, { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import Name from "./NameComponent";
import Canvas from "./CanvasComponent";
import useWindowSize from "../hooks/useWindowSize";
import SizePicker from "./SizePickerComponent";
import InfoButton from "./InfoButtonComponent";

const sizes = [2, 6, 10, 14, 20];

const PlayGroundComponent = () => {
  const [activeColor, setActiveColor] = useState();
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [windowSizeVisible, setWindowSizeVisible] = useState(false);

  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWindowSizeVisible(true);
    clearTimeout(timeoutId);
    timeoutId.current = setTimeout(() => setWindowSizeVisible(false), 500);
  });

  const headerRef = useRef({ offsetHeight: 0 });
  const timeoutId = useRef();

  return (
    <div>
      <header
        ref={headerRef}
        style={{
          borderTop: `20px solid ${activeColor}`,
        }}
      >
        <div>
          <Name />
          <InfoButton />
        </div>
        <div style={{ marginTop: 10 }}>
          <HexColorPicker className="color-picker" color={activeColor} onChange={setActiveColor} />;
          <SizePicker
            sizes={sizes}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            activeColor={activeColor}
          />
        </div>
      </header>
      {activeColor && activeSize && (
        <Canvas
          color={activeColor}
          lineWidth={activeSize}
          height={window.innerHeight - headerRef.current.offsetHeight}
        />
      )}
      <div className={`window-size ${windowSizeVisible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div>
    </div>
  );
};

export default PlayGroundComponent;
