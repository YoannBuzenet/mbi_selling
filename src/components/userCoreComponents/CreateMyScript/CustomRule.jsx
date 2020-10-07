import React, { useEffect, useState } from "react";
import AddRuleButton from "./AddRuleButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton, Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

const CustomRule = ({
  rule,
  index,
  parentArrayLength,
  FoilOrRegular,
  addACustomRule,
  deleteACustomRule,
}) => {
  const [isZoomed, setIsZoomed] = useState(!rule.wasCreatedHere || true);

  useEffect(() => {
    setTimeout(() => {
      setIsZoomed(true);
    }, 200);
  }, []);

  const handleChange = (e) => {
    console.log("update parent");
  };

  //TODO : first rule must start from0. if not, has incoherenceStartingPoint = true

  let classNameFirstDiv = "div1left";
  let classNameSecondDiv = "div2right";

  return (
    <>
      <Zoom in={isZoomed}>
        <Typography>
          <div className="ruleContainer">
            <div className="deleteButton">
              <IconButton
                onClick={(e) => deleteACustomRule(index, FoilOrRegular)}
              >
                <HighlightOffIcon color="secondary" />
              </IconButton>
            </div>
            DE
            <input
              className="inputValueNumber"
              value={typeof rule.from === "number" ? rule.from : ""}
              name={"from_" + index + "_" + "Regular"}
              onChange={(e) => handleChange(e)}
            />
            A
            <input
              className="inputValueNumber"
              value={typeof rule.from === "number" ? rule.to : ""}
              name={"to" + index + "_" + "Regular"}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="belowRule-CTA">
            {/* Colored Link between rules */}
            {index !== parentArrayLength - 1 && (
              <div className="twoBlocksContainer">
                <div className={classNameFirstDiv}></div>
                <div className={classNameSecondDiv}></div>
                <AddRuleButton
                  position={index + 1}
                  FoilOrRegular={FoilOrRegular}
                  handleClick={addACustomRule}
                  classToAdd="onSeparatedDivButton"
                />
              </div>
            )}
            {index === parentArrayLength - 1 && (
              <AddRuleButton
                position={index + 1}
                FoilOrRegular={FoilOrRegular}
                handleClick={addACustomRule}
              />
            )}
          </div>
        </Typography>
      </Zoom>
    </>
  );
};

export default CustomRule;
