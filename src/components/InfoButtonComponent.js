import React from "react";

const InfoButton = () => {
  return (
    <button
      className="button-info"
      onClick={() =>
        alert(
          "Choose the color of your preference by clicking on the colored boxes.\nChange base color by clicking on the refresh button on the right side.\nChoose the desired line width by clicking on one of the circles.\nRight click on the drawing and click Save Image As... to download your work as a PNG file.\n\nHave fun!"
        )
      }
    >
      &#9432; How to use
    </button>
  );
};

export default InfoButton;
