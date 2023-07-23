import React from "react";

const SizePicker = ({ sizes, activeSize, setActiveSize, activeColor }) => {
  return (
    <fieldset className="size-picker">
      {sizes.map((size, i) => (
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
