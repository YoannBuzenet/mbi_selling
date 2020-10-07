import React, { useState, useEffect } from "react";
import "./createMyScript.css";

import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";

const CreateMyScript = () => {
  const [customRulesGlobalState, setCustomRulesGlobalState] = useState({
    regularCustomRules: [],
    foilCustomRules: [],
  });

  const [arrayRegularRulesMock, setArrayRegularRulesMock] = useState([
    { from: 0, to: 1 },
    { from: 1, to: 2 },
  ]);
  const [arrayFoilsRulesMock, setArrayFoilsRulesMock] = useState([
    { from: 0, to: 1 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ]);

  //THE SCRIPT IS RESPONSIBLE FOR COHERENCE

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

  const handleChange = (e) => {
    console.log("ça écrit !");
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
            {arrayRegularRulesMock.map((rule, index) => {
              console.log(rule);
              return (
                <CustomRule
                  rule={rule}
                  index={index}
                  parentArrayLength={arrayRegularRulesMock.length}
                  FoilOrRegular="Regular"
                  addACustomRule={addACustomRule}
                />
              );
            })}
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
              <CustomRule
                rule={rule}
                index={index}
                parentArrayLength={arrayFoilsRulesMock.length}
                FoilOrRegular="Foil"
                addACustomRule={addACustomRule}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMyScript;
