import React, { useState, useEffect } from "react";
import "./createMyScript.css";

import AddRuleButton from "./AddRuleButton";

const CreateMyScript = () => {
  const [customRulesGlobalState, setCustomRulesGlobalState] = useState({
    regularCustomRules: [],
    foilCustomRules: [],
  });

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

  useEffect(() => {
    console.log("getting custom rules");
  }, []);

  const addACustomRule = (position, FoilOrRegular) => {
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
          <p>Regles génériques</p>
          <p>Les signées ne sont pas traitées.</p>
          <p>Les altérées ne sont pas traitées.</p>
          <p>Les playsets ne sont pas traités.</p>
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
