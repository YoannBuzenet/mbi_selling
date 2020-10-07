import React, { useState } from "react";
import "./createMyScript.css";
//Mui
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

const AddRuleButton = ({
  position,
  FoilOrRegular,
  handleClick,
  classToAdd,
}) => {
  console.log(".");

  let classToImplement;
  if (classToAdd) {
    classToImplement = classToAdd;
  }
  return (
    <>
      <div className="whiteDivFillMuiIcon" />
      <IconButton
        onClick={(e) => handleClick(position, FoilOrRegular)}
        size={"medium"}
        color="primary"
        className={classToImplement}
      >
        <AddCircleIcon className="add-icon" fontSize="large" color="primary" />
      </IconButton>
    </>
  );
};

export default AddRuleButton;
