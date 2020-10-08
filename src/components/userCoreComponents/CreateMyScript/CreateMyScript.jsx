import React, { useState, useEffect, useRef, useContext } from "react";
import "./createMyScript.css";
import axios from "axios";
import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";
import DefinitionContext from "../../../context/definitionsContext";
import { toast } from "react-toastify";

const CreateMyScript = () => {
  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);
  console.log("definitions", allDefinitions);

  const [customRulesGlobalState, setCustomRulesGlobalState] = useState({
    regular: [
      { id: 485, from: 2, to: 1 },
      { id: 15, from: 1, to: 2 },
    ],
    foil: [
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
      (customRulesGlobalState.hasOwnProperty("regular") &&
        Array.isArray(customRulesGlobalState.regular)) ||
      (customRulesGlobalState.hasOwnProperty("foil") &&
        Array.isArray(customRulesGlobalState.foil))
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
    customRulesGlobalState[FoilOrRegular].splice(position, 0, {
      name: "created programatically",
      ruleTypeId: 1,
      wasCreatedHere: true,
      temporaryId: Math.random(),
    });
    setCustomRulesGlobalState({
      ...customRulesGlobalState,
    });
  };

  const deleteACustomRule = (position, FoilOrRegular) => {
    console.log(
      "deleting custom rules at position",
      position,
      "from state :",
      FoilOrRegular
    );

    //Remove it from state
    let removedElement;
    if (FoilOrRegular === "regular") {
      removedElement = customRulesGlobalState.regular.splice(position, 1);
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    } else {
      removedElement = customRulesGlobalState.foil.splice(position, 1);
      setCustomRulesGlobalState({
        ...customRulesGlobalState,
      });
    }
    console.log("the removed element", removedElement);

    //If rule has an id, we delete it from DB
    if (removedElement[0].hasOwnProperty("id")) {
      axios.delete("/api/customRules/" + removedElement[0].id).catch((err) => {
        customRulesGlobalState[FoilOrRegular].splice(
          position,
          0,
          removedElement[0]
        );
        setCustomRulesGlobalState({
          ...customRulesGlobalState,
        });
        console.log("put it back in state and notify user");
        toast.error("sorry bro");
      });
    }
  };

  const updateACustomRule = (event, position, FoilOrRegular) => {
    let mutatedState = { ...customRulesGlobalState };
    const { name } = event.target;
    let { value } = event.target;
    console.log(name, value);
    if (
      name === "from" ||
      name === "to" ||
      name === "ruleTypeId" ||
      name == "priceRangeValueToSet"
    ) {
      if (value !== "") {
        value = parseInt(value);
      }
    }

    mutatedState[FoilOrRegular][position][name] = value;
    mutatedState[FoilOrRegular][position].isToBeSaved = true;

    setCustomRulesGlobalState(mutatedState);
  };

  // Browse the state, return a mutated state with the "incoherent" markets up to date.
  const browseScriptAndMarkIncoherence = (state) => {
    console.log("search for incoherence");
    let mutatedState = { ...state };

    //Browsing Regular Array
    if (Array.isArray(mutatedState.regular)) {
      checkArrayIncoherence(mutatedState.regular);
    }
    //Browsing Foil Array
    if (Array.isArray(mutatedState.foil)) {
      checkArrayIncoherence(mutatedState.foil);
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

  const canStateBeSaved = (customRulesGlobalState) => {
    //return bool
    console.log("browse the state, check if there is one error");
  };

  const saveScriptAndCustomRules = () => {
    //Bien penser à retirer tous les IsToBeSaved de chaque element de l'array
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

  return (
    <div className="create-my-script-container">
      Create my script
      <p>SCRIPT NAME</p>
      <div className="parts-container">
        <div className="left-part">
          REGULAR
          <div className="left-schema">
            <AddRuleButton
              position={0}
              FoilOrRegular="regular"
              handleClick={addACustomRule}
            />
            {Array.isArray(customRulesGlobalState.regular) &&
              customRulesGlobalState.regular.map((rule, index) => {
                console.log(rule);
                return (
                  <CustomRule
                    rule={rule}
                    index={index}
                    parentArrayLength={customRulesGlobalState.regular.length}
                    FoilOrRegular="regular"
                    addACustomRule={addACustomRule}
                    deleteACustomRule={deleteACustomRule}
                    key={"" + rule.id + "" + rule.temporaryId + "" + "regular"}
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
          FOIL
          <div className="right-schema">
            <AddRuleButton
              position={0}
              FoilOrRegular="foil"
              handleClick={addACustomRule}
            />
            {Array.isArray(customRulesGlobalState.foil) &&
              customRulesGlobalState.foil.map((rule, index) => (
                <CustomRule
                  rule={rule}
                  index={index}
                  parentArrayLength={customRulesGlobalState.foil.length}
                  FoilOrRegular="foil"
                  addACustomRule={addACustomRule}
                  deleteACustomRule={deleteACustomRule}
                  key={"" + rule.id + "" + rule.temporaryId + "" + "regular"}
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
