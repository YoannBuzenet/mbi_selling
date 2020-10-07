import React, { useState, useEffect, useRef } from "react";
import "./createMyScript.css";

import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";

const CreateMyScript = () => {
  const [customRulesGlobalState, setCustomRulesGlobalState] = useState({
    regularCustomRules: [
      { id: 485, from: 0, to: 1, hasIncoherence: false },
      { id: 15, from: 1, to: 2, hasIncoherence: false },
    ],
    foilCustomRules: [
      { id: 55, from: 0, to: 1, hasIncoherence: false },
      { id: 4, from: 2, to: 3, hasIncoherence: false },
      { id: 1485, from: 3, to: 4, hasIncoherence: false },
      { id: 85, from: 4, to: 5, hasIncoherence: false },
    ],
  });

  //Keep track of the last state
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const previousStateStringified = usePrevious(
    JSON.stringify(customRulesGlobalState)
  );
  console.log("previous state", previousStateStringified);
  console.log("current state", customRulesGlobalState);
  console.log(
    "comparison between 2 states - are they similar ? ",
    previousStateStringified === customRulesGlobalState
  );

  //THE SCRIPT IS RESPONSIBLE FOR CHECKING COHERENCE

  useEffect(() => {
    console.log("getting custom rules");
    //We ge an array of rules
    //Parse it, split it into 2 array of regular/foil, tidy it, add a "isCoherent : true" property
    //This prop is checked and updated a each function and the rule moved it css depending on it
  }, []);

  useEffect(() => {
    if (
      (customRulesGlobalState.hasOwnProperty("regularCustomRules") &&
        Array.isArray(customRulesGlobalState.regularCustomRules)) ||
      (customRulesGlobalState.hasOwnProperty("foilCustomRules") &&
        Array.isArray(customRulesGlobalState.foilCustomRules))
    ) {
      // Compare previous state and current state - if it changed, do compare them again
      if (JSON.stringify(customRulesGlobalState) !== previousStateStringified) {
        setCustomRulesGlobalState({ ...customRulesGlobalState });
      }
      console.log("checking custom rules coherence");
    }
  }, [setCustomRulesGlobalState, customRulesGlobalState]);

  const addACustomRule = (position, FoilOrRegular) => {
    if (FoilOrRegular === "Regular") {
      customRulesGlobalState.regularCustomRules.splice(position, 0, {
        name: "created programatically",
        wasCreatedHere: true,
        temporaryId: Math.random(),
      });
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    } else {
      customRulesGlobalState.foilCustomRules.splice(position, 0, {
        name: "created programatically",
        wasCreatedHere: true,
        temporaryId: Math.random(),
      });
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    }
  };

  const deleteACustomRule = (position, FoilOrRegular) => {
    console.log(
      "deleting custom rules at position",
      position,
      "from state :",
      FoilOrRegular
    );

    if (FoilOrRegular === "Regular") {
      customRulesGlobalState.regularCustomRules.splice(position, 1);
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    } else {
      customRulesGlobalState.foilCustomRules.splice(position, 1);
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    }
  };

  const updateACustomRule = (position, FoilOrRegular) => {};

  const saveScriptAndCustomRules = () => {
    console.log("saved !");
  };

  const launchTest = () => {
    //check if there is a one of the numerous "has incoherence" flag and notify if yes
    console.log("test !");
  };

  const launchScript = () => {
    //check if there is a one of the numerous "has incoherence" flag and notify if yes
    console.log("Launch !");
  };

  const checkCoherence = (FoilOrRegularArray) => {
    console.log("search for incoherence");
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
            {Array.isArray(customRulesGlobalState.regularCustomRules) &&
              customRulesGlobalState.regularCustomRules.map((rule, index) => {
                console.log(rule);
                return (
                  <CustomRule
                    rule={rule}
                    index={index}
                    parentArrayLength={
                      customRulesGlobalState.regularCustomRules.length
                    }
                    FoilOrRegular="Regular"
                    addACustomRule={addACustomRule}
                    deleteACustomRule={deleteACustomRule}
                    key={"" + rule.id + "" + rule.temporaryId + "" + "Regular"}
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
            {Array.isArray(customRulesGlobalState.foilCustomRules) &&
              customRulesGlobalState.foilCustomRules.map((rule, index) => (
                <CustomRule
                  rule={rule}
                  index={index}
                  parentArrayLength={
                    customRulesGlobalState.foilCustomRules.length
                  }
                  FoilOrRegular="Foil"
                  addACustomRule={addACustomRule}
                  deleteACustomRule={deleteACustomRule}
                  key={"" + rule.id + "" + rule.temporaryId + "" + "Regular"}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMyScript;
