import React, { useState, useEffect, useRef, useContext } from "react";
import "./createMyScript.css";

import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";
import DefinitionContext from "../../../context/definitionsContext";

const CreateMyScript = () => {
  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);

  const [customRulesGlobalState, setCustomRulesGlobalState] = useState({
    regularCustomRules: [
      { id: 485, from: 2, to: 1 },
      { id: 15, from: 1, to: 2 },
    ],
    foilCustomRules: [
      { id: 55, from: 0, to: 1 },
      { id: 4, from: 2, to: 6 },
      { id: 1485, from: 3, to: 4 },
      { id: 85, from: 4, to: 5 },
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

  useEffect(() => {
    console.log("getting custom rules");
    //We ge an array of rules
    //Parse it, split it into 2 array of regular/foil, tidy it, add a "isCoherent : true" property
    //This prop is checked and updated a each function and the rule moved it css depending on it
  }, []);

  // Automatic coherence check at each render
  useEffect(() => {
    if (
      (customRulesGlobalState.hasOwnProperty("regularCustomRules") &&
        Array.isArray(customRulesGlobalState.regularCustomRules)) ||
      (customRulesGlobalState.hasOwnProperty("foilCustomRules") &&
        Array.isArray(customRulesGlobalState.foilCustomRules))
    ) {
      // Compare previous state and current state - if it changed, do compare them again
      if (JSON.stringify(customRulesGlobalState) !== previousStateStringified) {
        console.log("checking custom rules coherence");
        console.log(
          "corrected state is :",
          browseScriptAndMarkIncoherence(customRulesGlobalState)
        );
        setCustomRulesGlobalState({
          ...browseScriptAndMarkIncoherence(customRulesGlobalState),
        });
      }
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

  const updateACustomRule = (event, position, FoilOrRegular) => {
    let mutatedState = { ...customRulesGlobalState };
    const { name } = event.target;
    let { value } = event.target;
    if (name === "from" || name === "to") {
      if (value !== "") {
        value = parseInt(value);
      }
    }
    if (FoilOrRegular === "Regular") {
      mutatedState.regularCustomRules[position][name] = value;
    } else {
      mutatedState.foilCustomRules[position][name] = value;
    }
    setCustomRulesGlobalState(mutatedState);
  };

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

  // Browse the state, return a mutated state with the "incoherent" markets up to date.
  const browseScriptAndMarkIncoherence = (state) => {
    console.log("search for incoherence");
    let mutatedState = { ...state };

    //Browsing Regular Array
    if (Array.isArray(mutatedState.regularCustomRules)) {
      checkArrayIncoherence(mutatedState.regularCustomRules);
    }
    //Browsing Foil Array
    if (Array.isArray(mutatedState.foilCustomRules)) {
      checkArrayIncoherence(mutatedState.foilCustomRules);
    }

    return mutatedState;
  };

  //We compare each rule to its next one and
  //1 Check that first price of the rule is inferior to the second price
  // 2. check if the number of sticking, thus creating no holes in the rule coverture
  const checkArrayIncoherence = (arrayOfCustomRules) => {
    if (Array.isArray(arrayOfCustomRules)) {
      for (let i = 0; i < arrayOfCustomRules.length; i++) {
        //Check if starting value is 0
        if (i === 0 && arrayOfCustomRules[i].from !== 0) {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = true;
        } else {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = false;
        }

        //We check if price are defined or if there is an empty place
        if (
          isNaN(parseInt(arrayOfCustomRules[i].from)) ||
          isNaN(parseInt(arrayOfCustomRules[i].to))
        ) {
          arrayOfCustomRules[i].hasEmptyInput = true;
        } else {
          //If price are defined
          arrayOfCustomRules[i].hasEmptyInput = false;
          if (arrayOfCustomRules[i].from >= arrayOfCustomRules[i].to) {
            //Universal check : are price coherent (from < to) ?
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = false;
          }
        }

        //We do this comparison only if it's not the last element of the array (because the next element doesn't exist, yeah !)
        if (i !== arrayOfCustomRules.length - 1) {
          if (arrayOfCustomRules[i].to !== arrayOfCustomRules[i + 1].from) {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = false;
          }
        }
      }
      console.log("treated array", arrayOfCustomRules);
      return arrayOfCustomRules;
    } else {
      throw new Error("Param received is not of type Array.");
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
                    updateACustomRule={updateACustomRule}
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
                  updateACustomRule={updateACustomRule}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMyScript;
