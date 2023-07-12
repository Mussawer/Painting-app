import React, { FC, useState, ChangeEvent } from "react";
import "../index.css"
interface nameProps {}

const Name: FC<nameProps> = ({}) => {
  const [name, setName] = useState("");
 
  return (
    <div>
      <label className="header-name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={(event) =>
            (event.target as HTMLInputElement).setSelectionRange(0, (event.target as HTMLInputElement)?.value.length)
          }
          placeholder="Untitled"
        />
      </label>
    </div>
  );
};

export default Name;
