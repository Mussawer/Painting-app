import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import randomColor from "randomcolor";
import ColorPicker from "./colorPicker";
import Name from "./name";
import useWindowSize from "../hooks/useWindowSize";
import SizePicker from "./sizePicker";

const sizes = [4, 8, 14, 20, 24];

export default function Playground() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState();
  const [windowSizeVisible, setwindowSizeVisible] = useState(false)
  const [activeSize, setActiveSize] = useState(sizes[0])

  useEffect(() => {
    getColors();
  }, []);

  const timeoutId = useRef<NodeJS.Timeout>()

  const [windowWidth, windowHeight] = useWindowSize(()=>{
	setwindowSizeVisible(true)
	clearTimeout(timeoutId.current!);
	timeoutId.current = setTimeout(()=>setwindowSizeVisible(true), 500)
  })


  const getColors = () => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then(res => res.json())
      .then(res => {
        console.log("🚀 ~ file: playground.tsx:17 ~ getColors ~ res:", res);
        setColors(res.colors.map((color: any) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  };

  return (
    <>
      <header style={{ borderTop: `20px solid ${activeColor}` }}>
	  <div>
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
		  <SizePicker activeColor={activeColor} activeSize={activeSize} setActiveSize={setActiveSize} sizes={sizes}/>
        </div>
      </header>
	  <div className={`window-size ${windowSizeVisible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div>
    </>
  );
}
