import React, { FC } from "react";
import "../index.css";

interface sizePickerProps {
  sizes: number[];
  activeSize: number;
  setActiveSize: (size: number) => void;
  activeColor: string | undefined;
}

const SizePicker: FC<sizePickerProps> = ({
  activeColor,
  activeSize,
  setActiveSize,
  sizes,
}: sizePickerProps) => {
  return (
    <fieldset className="size-picker">
      {sizes.map((size: number, i: number) => (
        <label key={i}>
          <input
            name="size"
            type="radio"
            value={size}
            checked={activeSize === size}
            onChange={() => setActiveSize(size)}
          />
          <span
            style={{
              height: size,
              width: size,
              borderWidth: activeSize === size ? 3 : 2,
              borderStyle: "solid",
              borderColor: activeSize === size ? activeColor : "black",
            }}
          />
        </label>
      ))}
    </fieldset>
  );
};

export default SizePicker;
