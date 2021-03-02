import React, { useState } from "react";
import "./createMyScript.css";
//Mui
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";

import { FormattedMessage, useIntl } from "react-intl";

const PlainTextAddRuleButton = ({
  position,
  FoilOrRegular,
  handleClick,
  classToAdd,
}) => {
  let classToImplement;
  if (classToAdd) {
    classToImplement = classToAdd;
  }
  return (
    <>
      <div className="whiteDivFillMuiIcon" />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={(e) => handleClick(position, FoilOrRegular)}
        className={classToImplement}
        startIcon={<AddCircleIcon />}
      >
        <FormattedMessage
          id="createMyScript.AddaRule"
          defaultMessage="Add a Rule"
        />
      </Button>
    </>
  );
};

export default PlainTextAddRuleButton;
