import React, { useState } from "react";
import "./createMyScript.css";

import AddRuleButton from "./AddRuleButton";

const CreateMyScript = () => {
  const [arrayRegularRulesMock, setArrayRegularRulesMock] = useState([
    { name: "test1" },
    { name: "test2" },
  ]);
  const [arrayFoilsRulesMock, setArrayFoilsRulesMock] = useState([
    { name: "foil" },
    { name: "foil2" },
    { name: "foil3" },
    { name: "foil4" },
  ]);

  const addACustomRule = (position, FoilOrRegular) => {
    console.log("we add a rule");
    console.log(position, FoilOrRegular);
    if (FoilOrRegular === "Regular") {
      arrayRegularRulesMock.splice(position, 0, {
        name: "created programatically",
      });
      setArrayRegularRulesMock([...arrayRegularRulesMock]);
    } else {
      arrayFoilsRulesMock.splice(position, 0, {
        name: "created programatically",
      });
      setArrayFoilsRulesMock([...arrayFoilsRulesMock]);
    }
  };

  return (
    <div className="create-my-script-container">
      Create my script
      <p>SCRIPT NAME</p>
      <div className="parts-container">
        <div className="left-part">
          <div className="left-schema">
            <AddRuleButton
              position={0}
              FoilOrRegular="Regular"
              handleClick={addACustomRule}
            />
            {arrayRegularRulesMock.map((rule, index) => (
              <>
                <div className="ruleContainer">
                  Rule n°{index}
                  <div>name : {rule.name}</div>
                </div>
                <div className="belowRule-CTA">
                  {/* Colored Link between rules */}
                  {index !== arrayRegularRulesMock.length - 1 && (
                    <div className="colored-link"></div>
                  )}
                  <AddRuleButton
                    position={index + 1}
                    FoilOrRegular="Regular"
                    handleClick={addACustomRule}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="right-part">
          <div className="right-schema">
            <AddRuleButton
              position={0}
              FoilOrRegular="Foil"
              handleClick={addACustomRule}
            />
            {arrayFoilsRulesMock.map((rule, index) => (
              <>
                <div className="ruleContainer">
                  Rule n°{index}
                  <div>name : {rule.name}</div>
                </div>
                <div className="belowRule-CTA">
                  {/* Colored Link between rules */}
                  {index !== arrayFoilsRulesMock.length - 1 && (
                    <div className="colored-link"></div>
                  )}
                  <AddRuleButton
                    position={index + 1}
                    FoilOrRegular="Foil"
                    handleClick={addACustomRule}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMyScript;
