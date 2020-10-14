import React, { useState, useEffect, useRef, useContext } from "react";
import "./createMyScript.css";
import axios from "axios";
import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";
import { toast } from "react-toastify";
import { matchPath } from "react-router";

import AuthContext from "../../../context/authContext";
import DefinitionContext from "../../../context/definitionsContext";

const CreateMyScript = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Getting id param on edition mode (with /manage-script/ route)
  const match = matchPath(history.location.pathname, {
    path: "/edit-script/:id",
    exact: true,
    strict: false,
  });

  console.log("auth from create script", authenticationInfos);

  // If we have an id param, that means we are editing a script. Otherwise, we are creating a brand new one !
  const isCreationOrEditionMode = match?.params?.id ? "Edition" : "Creation";

  console.log("ARE WE IN MODE CREATION OR EDITION ?", isCreationOrEditionMode);

  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);
  console.log("definitions", allDefinitions);

  const defaultCreationState = {
    regular: [
      {
        temporaryId: 485,
        priceRangeFrom: 0,
        priceRangeTo: 1,
        ruleTypeId: 2,
        behaviourId: 13,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 1,
        priceRangeTo: 10,
        ruleTypeId: 2,
        behaviourId: 14,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 10,
        priceRangeTo: 30,
        ruleTypeId: 2,
        behaviourId: 15,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 30,
        priceRangeTo: 100,
        ruleTypeId: 2,
        behaviourId: 16,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 100,
        priceRangeTo: 500,
        ruleTypeId: 2,
        behaviourId: 19,
      },
    ],
    foil: [
      {
        temporaryId: 485,
        priceRangeFrom: 0,
        priceRangeTo: 1,
        ruleTypeId: 2,
        behaviourId: 13,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 1,
        priceRangeTo: 10,
        ruleTypeId: 2,
        behaviourId: 14,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 10,
        priceRangeTo: 30,
        ruleTypeId: 2,
        behaviourId: 15,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 30,
        priceRangeTo: 100,
        ruleTypeId: 2,
        behaviourId: 16,
      },
      {
        temporaryId: 15,
        priceRangeFrom: 100,
        priceRangeTo: 500,
        ruleTypeId: 2,
        behaviourId: 19,
      },
    ],
  };

  const [customRulesGlobalState, setCustomRulesGlobalState] = useState(
    isCreationOrEditionMode === "Creation"
      ? defaultCreationState
      : { regular: [], foil: [] }
  );

  //TODO : pouvoir Charger un script : le get, et trier les règles et les passer en state
  // TO DO : permettre la création from scracth egélaement
  useEffect(() => {
    console.log("getting custom rules");
    //If we are in edit mode, get the data from the script
    if (isCreationOrEditionMode === "Edition") {
      console.log("the call for charging custom rules has started !");
      axios
        .get(
          `/api/customRules?idUser=${authenticationInfos.user.id}&idScript=${match?.params?.id}`
        )
        .then((resp) => {
          console.log(resp.data);
          console.log("test");
          setCustomRulesGlobalState(prepareStateFromArrayOfRules(resp.data));
        })
        .catch((err) =>
          console.log("error when calling custom rules for this script", err)
        );
    }
  }, []);

  //Returns an object ready to be passed in state
  function prepareStateFromArrayOfRules(arrayOfCustomRules) {
    //Separing foil rules from regular rules
    let arrayOfRegularCustomRules = arrayOfCustomRules.filter(
      (rule) => rule.isForFoils === 0
    );
    let arrayOfFoilCustomRules = arrayOfCustomRules.filter(
      (rule) => rule.isForFoils === 1
    );

    function compare(a, b) {
      if (a.priceRangeTo < b.priceRangeTo) {
        return -1;
      }
      if (a.priceRangeTo > b.priceRangeTo) {
        return 1;
      }
      return 0;
    }

    arrayOfRegularCustomRules.sort(compare);
    arrayOfFoilCustomRules.sort(compare);

    const objectToReturn = {
      regular: arrayOfRegularCustomRules,
      foil: arrayOfFoilCustomRules,
    };

    console.log("here is the result", objectToReturn);
    return objectToReturn;
  }

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
    // console.log("the removed element", removedElement);

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
        toast.error("pas pu la retirer en DB ! hardcoded ?");
      });
    }
  };

  const updateACustomRule = (event, position, FoilOrRegular) => {
    let mutatedState = { ...customRulesGlobalState };
    const { name } = event.target;
    let { value } = event.target;
    console.log(name, value);
    if (
      name === "priceRangeFrom" ||
      name === "priceRangeTo" ||
      name === "ruleTypeId" ||
      name == "priceRangeValueToSet" ||
      name === "priceGuidePossibility" ||
      name === "ruleBehaviours"
    ) {
      if (value !== "" && !isNaN(parseInt(value))) {
        value = parseInt(value);
      } else if (value == "") {
      } else {
        value = 0;
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
        if (i === 0 && arrayOfCustomRules[i].priceRangeFrom !== 0) {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = true;
        } else {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = false;
        }

        //We check if price are defined or if there is an empty place
        if (
          isNaN(parseInt(arrayOfCustomRules[i].priceRangeFrom)) ||
          isNaN(parseInt(arrayOfCustomRules[i].priceRangeTo))
        ) {
          arrayOfCustomRules[i].hasEmptyInput = true;
        } else {
          //If price are defined
          arrayOfCustomRules[i].hasEmptyInput = false;
          if (
            arrayOfCustomRules[i].priceRangeFrom >=
            arrayOfCustomRules[i].priceRangeTo
          ) {
            //Universal check : are price coherent (from < to) ?
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = false;
          }
          //Checking, if rule expect a price to sell, if this price is precised
          if (
            arrayOfCustomRules[i].ruleTypeId === 1 &&
            !Boolean(arrayOfCustomRules[i].priceRangeValueToSet)
          ) {
            arrayOfCustomRules[i].isMissingSellingPrice = true;
          } else {
            arrayOfCustomRules[i].isMissingSellingPrice = false;
          }
        }

        //We do this comparison only if it's not the last element of the array (because the next element doesn't exist, yeah !)
        if (i !== arrayOfCustomRules.length - 1) {
          if (
            arrayOfCustomRules[i].priceRangeTo !==
            arrayOfCustomRules[i + 1].priceRangeFrom
          ) {
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

  //Checks if there is at least one error in the state. IF so, returns false.
  const canStateBeSaved = (currentState) => {
    return (
      currentState.foil.filter(
        (rule) =>
          rule.hasEmptyInput ||
          rule.hasIncoherentFollowingPrices ||
          rule.hasIncoherentOrderInFromTo ||
          rule.hasIncoherentStartingPrice ||
          rule.isMissingSellingPrice
      ).length === 0 &&
      currentState.regular.filter(
        (rule) =>
          rule.hasEmptyInput ||
          rule.hasIncoherentFollowingPrices ||
          rule.hasIncoherentOrderInFromTo ||
          rule.hasIncoherentStartingPrice ||
          rule.isMissingSellingPrice
      ).length === 0
    );
  };

  const saveScriptAndCustomRules = () => {
    //.map array regular
    let regularRules = customRulesGlobalState.regular.map((rule) => {
      //si pas d'id
      //POST
      //si id et isToBeSaved = tru
      //PUT
    });
    //.map array foil

    let foilRules = customRulesGlobalState.foil.map((rule) => {
      //si pas d'id
      //POST
      //si id et isToBeSaved = tru
      //PUT
    });
    //promises.all

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
      <button onClick={(e) => saveScriptAndCustomRules}>Save</button>
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
