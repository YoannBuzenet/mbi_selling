import React, { useState } from "react";
import "./createMyScript.css";
//Mui
import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddRuleButton = ({ position, FoilOrRegular, handleClick }) => {
  const [isHover, setIsHover] = useState(false);

  let classCTA;
  if (isHover) {
    classCTA = "CTA CTA-hovered";
  } else {
    classCTA = "CTA";
  }

  console.log(isHover);

  return (
    <div
      className={classCTA}
      onMouseEnter={(e) => setIsHover(!isHover)}
      onMouseLeave={(e) => setIsHover(!isHover)}
    >
      <AddCircleIcon
        className="add-icon"
        onClick={(e) => handleClick(position, FoilOrRegular)}
      />
    </div>
  );
};

export default AddRuleButton;
