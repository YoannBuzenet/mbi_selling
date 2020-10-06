import React from "react";
import "./userCore.css";

const CreateMyScript = () => {
  const arrayRegularRulesMock = [{}, {}];
  const arrayFoilsRulesMock = [{}, {}, {}, {}];

  return (
    <div className="create-my-script-container">
      Create my script
      <p>SCRIPT NAME</p>
      <div className="parts-container">
        <div className="left-part">
          <div className="left-schema">
            {arrayRegularRulesMock.map((rule, index) => (
              <div>Rule n°{index}</div>
            ))}
          </div>
        </div>
        <div className="right-part">
          <div className="right-schema">
            {arrayFoilsRulesMock.map((rule, index) => (
              <div>Rule n°{index}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMyScript;
