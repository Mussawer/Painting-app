import React, { FC } from "react";
import "../index.css"
interface colorPickerProps {
  colors: any;
  activeColor: string | undefined;
  setActiveColor: (color: any) => void;
}

const ColorPicker: FC<colorPickerProps> = ({
  colors,
  activeColor,
  setActiveColor,
}: colorPickerProps) => {
  if (colors.length === 0) {
    return null;
  }

  return (
    <fieldset className="color-picker">
      {colors.map((color: string, i: number) => (
        <label key={i}>
          <input
            name="color"
            type="radio"
            value={color}
            checked={activeColor === color}
            onChange={() => setActiveColor(color)}
          />
          <span
            style={{ background: color }}
          />
        </label>
      ))}
    </fieldset>
  );
};

export default ColorPicker;
