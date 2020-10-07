import React, { useState } from "react";
import "./createMyScript.css";
//Mui
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

const AddRuleButton = ({ position, FoilOrRegular, handleClick }) => {
  console.log(".");
  return (
    <IconButton
      onClick={(e) => handleClick(position, FoilOrRegular)}
      size={"medium"}
      color="primary"
    >
      <AddCircleIcon className="add-icon" fontSize="large" color="primary" />
    </IconButton>
  );
};

export default AddRuleButton;
