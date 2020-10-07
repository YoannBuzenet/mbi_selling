import React from "react";
import AddRuleButton from "./AddRuleButton";

const CustomRule = ({
  rule,
  index,
  parentArrayLength,
  FoilOrRegular,
  addACustomRule,
}) => {
  const handleChange = (e) => {
    console.log("update parent");
  };

  return (
    <>
      <div className="ruleContainer">
        DE{" "}
        <input
          className="inputValueNumber"
          value={typeof rule.from === "number" ? rule.from : ""}
          name={"from_" + index + "_" + "Regular"}
          onChange={(e) => handleChange(e)}
        />{" "}
        A{" "}
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
            <div className="div1left"></div>
            <div className="div2right"></div>
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
    </>
  );
};

export default CustomRule;
