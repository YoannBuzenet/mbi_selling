import React, { useState, useEffect, useRef, useContext } from "react";
import "./createMyScript.css";
import axios from "axios";
import PlainTextAddRuleButton from "./PlainTextAddRuleButton";
import CustomRule from "./CustomRule";
import { toast } from "react-toastify";
import { matchPath } from "react-router";
import { isMobile } from "react-device-detect";

import AuthContext from "../../../context/authContext";
import DefinitionContext from "../../../context/definitionsContext";
import errorHandlingAPI from "../../../services/errorHandlingAPI";
import MKMModalContext from "../../../context/mkmModalConnectionContext";
import transparentDivContext from "../../../context/transparentDivContext";
import appLangContext from "../../../context/selectedAppLang";
import PopInLaunchingConfirmationContext from "../../../context/popInConfirmationLaunchingScript";
import PopInTestConfirmationContext from "../../../context/popInConfirmationTestScript";
import BlackDivContext from "../../../context/blackDivModalContext";

// Material UI
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

// Prime React
import { MultiSelect } from "primereact/multiselect";

import { FormattedMessage, useIntl } from "react-intl";
import MKMAPI from "../../../services/MKMAPI";
import subscribeAPI from "../../../services/subscribeAPI";
import { Link } from "react-router-dom";

const CreateMyScript = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKMModalContext);

  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //App Lang
  const { currentLang } = useContext(appLangContext);

  //Transparent Div Context
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(transparentDivContext);

  const { setPopInLaunchingScriptInformations } = useContext(
    PopInLaunchingConfirmationContext
  );
  const { setPopInTestScriptInformations } = useContext(
    PopInTestConfirmationContext
  );

  const intl = useIntl();

  //Getting id param on edition mode (with /edit-script/ route)
  const match = matchPath(history.location.pathname, {
    path: "/edit-script/:id",
    exact: true,
    strict: false,
  });

  const [selectedFormats, setSelectedFormats] = useState(() => {
    //If we are in edition mode, we start from the formats aldready stored in the script
    if (match?.params?.id) {
      return [];
      //They're updated thanks to an useEffect
    }
    //If we are in creation mode, starting value is NO formats
    else if (!match?.params?.id) {
      return [];
    }
  });

  console.log("auth from create script", authenticationInfos);

  // console.log("le path :", history.location.pathname);

  // If we have an id param, that means we are editing a script. Otherwise, we are creating a brand new one !
  const isCreationOrEditionMode = match?.params?.id ? "Edition" : "Creation";

  console.log("ARE WE IN MODE CREATION OR EDITION ?", isCreationOrEditionMode);

  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);
  console.log("definitions", allDefinitions);

  const translatedDefaultScriptName = intl.formatMessage({
    id: "createMyScript.script.title.defaultName",
    defaultMessage: "My new Script",
  });

  const defaultScriptName = translatedDefaultScriptName;

  // Keyword default state
  // Exemple of chip item :  { key: 0, label: "Angular" }
  const [chipData, setChipData] = React.useState([]);

  const [keywordBehaviour, setKeywordBehaviour] = useState("ignoresEverything");
  const [keywordName, setKeywordName] = useState("");

  const handleSelectBehaviour = (event) => {
    const { value } = event.target;
    setScriptMustbeSaved(true);
    setKeywordBehaviour(value);
  };

  // Empty state by default
  const defaultCreationState = {
    regular: [
      // {
      //   temporaryId: 485,
      //   priceRangeFrom: 0,
      //   priceRangeTo: 1,
      //   ruleTypeId: 2,
      //   behaviourId: 13,
      //   isForFoils: 0,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 16,
      //   priceRangeFrom: 1,
      //   priceRangeTo: 10,
      //   ruleTypeId: 2,
      //   behaviourId: 14,
      //   isForFoils: 0,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 17,
      //   priceRangeFrom: 10,
      //   priceRangeTo: 30,
      //   ruleTypeId: 2,
      //   behaviourId: 15,
      //   isForFoils: 0,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 18,
      //   priceRangeFrom: 30,
      //   priceRangeTo: 100,
      //   ruleTypeId: 2,
      //   behaviourId: 16,
      //   isForFoils: 0,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 19,
      //   priceRangeFrom: 100,
      //   priceRangeTo: 500,
      //   ruleTypeId: 2,
      //   behaviourId: 19,
      //   isForFoils: 0,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
    ],
    foil: [
      // {
      //   temporaryId: 486,
      //   priceRangeFrom: 0,
      //   priceRangeTo: 1,
      //   ruleTypeId: 2,
      //   behaviourId: 13,
      //   isForFoils: 1,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 20,
      //   priceRangeFrom: 1,
      //   priceRangeTo: 10,
      //   ruleTypeId: 2,
      //   behaviourId: 14,
      //   isForFoils: 1,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 21,
      //   priceRangeFrom: 10,
      //   priceRangeTo: 30,
      //   ruleTypeId: 2,
      //   behaviourId: 15,
      //   isForFoils: 1,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 22,
      //   priceRangeFrom: 30,
      //   priceRangeTo: 100,
      //   ruleTypeId: 2,
      //   behaviourId: 16,
      //   isForFoils: 1,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
      // {
      //   temporaryId: 23,
      //   priceRangeFrom: 100,
      //   priceRangeTo: 500,
      //   ruleTypeId: 2,
      //   behaviourId: 19,
      //   isForFoils: 1,
      //   isForSigned: 0,
      //   isForPlaysets: 0,
      // },
    ],
  };

  const [pricesAreBasedOn, setPricesAreBasedOn] = useState(
    isCreationOrEditionMode === "Creation" ? "mkmTrends" : ""
  );

  const [customRulesGlobalState, setCustomRulesGlobalState] = useState(
    isCreationOrEditionMode === "Creation"
      ? defaultCreationState
      : { regular: [], foil: [] }
  );

  const [scriptName, setScriptName] = useState(
    isCreationOrEditionMode === "Creation" ? defaultScriptName : ""
  );

  const [scriptMustBeSaved, setScriptMustbeSaved] = useState(
    isCreationOrEditionMode === "Creation" ? true : false
  );

  const [raritiesUsed, setRaritiesUsed] = useState({
    mythic: true,
    rare: true,
    uncommon: true,
    common: true,
  });

  const [expansionsSelected, setExpansionsSelected] = useState([]);

  //This value is kept in state for creation mode, where we will need to set it before sending our rules.
  //With this we have this potential ID always in the same variable.
  const [idScript, setIdScript] = useState(match?.params?.id);

  let indexScript;
  if (Boolean(idScript)) {
    indexScript = authenticationInfos.userScripts.findIndex(
      (script) => script.id == idScript
    );
  }

  console.log("indexScript", indexScript);
  console.log("idScript", idScript);

  useEffect(() => {
    console.log("getting custom rules");
    //If we are in edit mode, get the data from the script
    if (isCreationOrEditionMode === "Edition") {
      //GETTING CUSTOM RULES
      axios
        .get(
          `/api/customRules?idUser=${authenticationInfos.shop.id}&idScript=${match?.params?.id}`
        )
        .then((resp) => {
          // console.log(resp.data);

          setCustomRulesGlobalState(prepareStateFromArrayOfRules(resp.data));
        })
        .catch((err) => {
          console.log("error when calling custom rules for this script", err);
          errorHandlingAPI.checkErrorStatus(err);
          if (err?.response?.status === 403) {
            history.replace("/my-scripts");
          }
        });

      //GETTING SCRIPT NAME AND FORMATS
      axios
        .get(
          "/api/script/getById/" +
            idScript +
            "?idUser=" +
            authenticationInfos.user.id
        )
        .then((resp) => {
          console.log("pass script name in state");
          setRaritiesUsed(
            transformArrayOfRaritiesIntoStateObject(resp.data.rarities)
          );
          setPricesAreBasedOn(resp.data.willBeBasedOn);
          setExpansionsSelected(
            resp.data.expansions.map((expansion) => expansion.name)
          );
          setScriptName(resp.data.name);
          setChipData(
            resp.data.Keywords.map((keyword) => ({
              label: keyword.name,
              key: keyword.id,
            }))
          );
          setKeywordBehaviour(resp.data.keywordBehaviour);
          setSelectedFormats(
            resp.data.scriptFormats.map((format) => format.id)
          );
        })
        .catch((err) => {
          console.log(err);
          console.log("erreur dans le get script name");
          errorHandlingAPI.checkErrorStatus(err);
        });
    } else if (isCreationOrEditionMode === "Creation") {
      console.log("on trigger le use Effect en creation");
      setCustomRulesGlobalState(defaultCreationState);
      setScriptName(defaultScriptName);
      setPricesAreBasedOn("mkmTrends");
      setChipData([]);
      setKeywordBehaviour("ignoresEverything");
    }
  }, [history.location.pathname]);

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

    // console.log("here is the result", objectToReturn);
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

  const previousState = usePrevious(customRulesGlobalState);
  const previousStateStringified = usePrevious(
    JSON.stringify(customRulesGlobalState)
  );
  // console.log("previous state", previousStateStringified);
  // console.log("current state", customRulesGlobalState);
  // console.log(
  //   "comparison between 2 states - are they similar ? ",
  //   previousStateStringified === customRulesGlobalState
  // );

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
  }, [
    setCustomRulesGlobalState,
    customRulesGlobalState,
    history.location.pathname,
  ]);

  const addACustomRule = (position, FoilOrRegular) => {
    setScriptMustbeSaved(true);
    customRulesGlobalState[FoilOrRegular].splice(position, 0, {
      name: "created programatically",
      wasCreatedHere: true,
      temporaryId: Math.random(),
      priceRangeFrom: 0,
      priceRangeTo: 1,
      ruleTypeId: 2,
      behaviourId: 1,
      isForFoils: FoilOrRegular === "foil" ? 1 : 0,
      isForSigned: 0,
      isForPlaysets: 0,
    });
    setCustomRulesGlobalState({
      ...customRulesGlobalState,
    });
  };

  const deleteACustomRule = (position, FoilOrRegular) => {
    setScriptMustbeSaved(true);
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
      axios
        .delete(
          "/api/customRules/" +
            removedElement[0].id +
            "?idUser=" +
            authenticationInfos.user.id
        )
        .catch((err) => {
          customRulesGlobalState[FoilOrRegular].splice(
            position,
            0,
            removedElement[0]
          );
          setCustomRulesGlobalState({
            ...customRulesGlobalState,
          });
          errorHandlingAPI.checkErrorStatus(err);
        });
    }
  };

  const updateACustomRule = (event, position, FoilOrRegular) => {
    setScriptMustbeSaved(true);
    let mutatedState = { ...customRulesGlobalState };
    const { name } = event.target;
    let { value } = event.target;
    console.log("new input", name, value);
    if (
      name === "ruleTypeId" ||
      name === "mkmPriceGuideReference" ||
      name === "behaviourId"
    ) {
      console.log("parseInt if");
      if (value !== "" && !isNaN(parseInt(value))) {
        value = parseInt(value);
      } else if (value == "") {
      } else {
        value = 0;
      }
      //Allowing floats for price input
    } else if (
      name === "priceRangeFrom" ||
      name === "priceRangeTo" ||
      name == "priceRangeValueToSet"
    ) {
      console.log("parseFloat if");
      //If it lasts by a period, let it, it means user is entering a float number
      if (value[value.length - 1] === ".") {
        console.log("let the period happen");
      } else if (value !== "" && !isNaN(parseFloat(value))) {
        value = parseFloat(value);
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
    // console.log("search for incoherence");
    let mutatedState = { ...state };

    // console.log("search for incoherence in regular array");
    //Browsing Regular Array
    if (Array.isArray(mutatedState.regular)) {
      checkArrayIncoherence(mutatedState.regular);
    }
    // console.log("search for incoherence in foil array");
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
        // console.log(
        //   "here is the rule we are working on",
        //   arrayOfCustomRules[i]
        // );

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

        //We do this comparison only if it's NOT the last element of the array (because the next element doesn't exist, yeah !)
        if (i !== arrayOfCustomRules.length - 1) {
          if (
            arrayOfCustomRules[i].priceRangeTo !==
            arrayOfCustomRules[i + 1].priceRangeFrom
          ) {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = false;
          }
        } else {
          // If the last rule had a problem and was removed, the new last rule works OK, so we remove any error that might have been set.
          arrayOfCustomRules[i].hasIncoherentFollowingPrices = false;
        }
      }
      // console.log("treated array", arrayOfCustomRules);
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

  const handlePricedBasedOn = (event) => {
    setScriptMustbeSaved(true);
    const { value } = event.target;
    setPricesAreBasedOn(value);
  };

  const transformArrayOfRaritiesIntoStateObject = (arrayOfRarities) => {
    console.log("array of rarities received", arrayOfRarities);

    const initialState = {
      mythic: false,
      rare: false,
      uncommon: false,
      common: false,
    };

    // parse array, update object, return object

    for (let i = 0; i < arrayOfRarities.length; i++) {
      initialState[arrayOfRarities[i].name] = true;
    }

    return initialState;
  };

  const transformRarityStateObjectIntoArrayofObjects = (stateObject) => {
    console.log("in fonction to format, received param", stateObject);

    let finalArray = [];
    for (const rarity in stateObject) {
      if (stateObject[rarity]) {
        finalArray = [...finalArray, { name: rarity }];
      } else {
        continue;
      }
    }
    return finalArray;
  };

  const saveScriptAndCustomRules = async () => {
    if (canStateBeSaved(customRulesGlobalState) === false) {
      toast.error(
        <FormattedMessage
          id="createMyScript.checkStateCoherence.failure"
          defaultMessage="There seems to be an error among the rules. Please check them."
        />
      );

      if (
        customRulesGlobalState.foil.length +
          customRulesGlobalState.regular.length ===
        0
      ) {
        toast.error(
          <FormattedMessage
            id="createMyScript.launchScript.failure.customRulesatLeast1"
            defaultMessage="The script must at least have one rule."
          />
        );
        return;
      }
    } else {
      /* **************************************** */
      /* ***** STEP 1 : SCRIPT INFO HANDLING **** */
      /* **************************************** */

      //POST SCRIPT IF IT HAS NO ID
      //GET DATA BACK PASS IT IN STATE
      let newScriptId = null;
      if (Boolean(idScript) === false) {
        console.log("no script, must create one");
        try {
          const scriptCreated = await axios.post(
            "/api/script?idUser=" + authenticationInfos.user.id,
            {
              name: scriptName,
              formats: selectedFormats,
              willBeBasedOn: pricesAreBasedOn,
              keywordBehaviour: keywordBehaviour,
              rarities: transformRarityStateObjectIntoArrayofObjects(
                raritiesUsed
              ),
              expansions: expansionsSelected,
            }
          );
          console.log("data arrived : ", scriptCreated);
          setIdScript(scriptCreated.data.id);

          newScriptId = scriptCreated.data.id;
        } catch (e) {
          console.error("creation script error", e);
          errorHandlingAPI.checkErrorStatus(e);
          toast.error(
            <FormattedMessage
              id="createMyScript.creating.failure"
              defaultMessage="There has been an error while creating the script."
            />
          );
          return;
        }
      } else {
        //WE PATCH THE SCRIPT
        axios
          .patch(
            "/api/script/" +
              idScript +
              "?idUser=" +
              authenticationInfos.user.id,
            {
              name: scriptName,
              formats: selectedFormats,
              willBeBasedOn: pricesAreBasedOn,
              keywordBehaviour: keywordBehaviour,
              rarities: transformRarityStateObjectIntoArrayofObjects(
                raritiesUsed
              ),
              expansions: expansionsSelected,
            }
          )
          .catch((err) => {
            console.log(err);
            console.log("erreur lors du patch script");
            errorHandlingAPI.checkErrorStatus(err);
          });
      }

      // Script Id definition
      let scriptId;
      if (newScriptId !== null) {
        scriptId = parseInt(newScriptId);
      } else {
        scriptId = parseInt(idScript);
      }

      /* **************************************** */
      /* **** STEP 2 : CUSTOM RULES HANDLING **** */
      /* **************************************** */
      try {
        // Custom Rules are all parsed and posted/patched (if needed) and end in a Promise.all

        console.log("starting to POST/PATCH");
        //.map array regular
        let regularRules = customRulesGlobalState.regular.map(async (rule) => {
          if (rule.hasOwnProperty("id") && rule.isToBeSaved === true) {
            //PATCH
            console.log("PATCH", rule);
            return axios.patch(
              "/api/customRules/" +
                rule.id +
                "?idUser=" +
                authenticationInfos.user.id +
                "&idScript=" +
                scriptId,
              rule
            );
          } else if (rule.hasOwnProperty("temporaryId")) {
            console.log("POST", rule);
            return axios.post(
              "/api/customRules/" +
                "?idUser=" +
                authenticationInfos.user.id +
                "&idScript=" +
                scriptId,
              rule
            );
          }
          return rule;
        });

        //.map array foils
        let foilRules = customRulesGlobalState.foil.map(async (rule) => {
          if (rule.hasOwnProperty("id") && rule.isToBeSaved === true) {
            //PATCH
            console.log("PATCH", rule);
            return axios.patch(
              "/api/customRules/" +
                rule.id +
                "?idUser=" +
                authenticationInfos.user.id +
                "&idScript=" +
                scriptId,
              rule
            );
          } else if (rule.hasOwnProperty("temporaryId")) {
            console.log("POST", rule);

            return axios.post(
              "/api/customRules/" +
                "?idUser=" +
                authenticationInfos.user.id +
                "&idScript=" +
                scriptId,
              rule
            );
          }
          return rule;
        });

        const respServ = await Promise.all([...regularRules, ...foilRules]);

        /* ********************** */
        // Save the keywords here
        /* ********************** */
        const chipsCopy = [...chipData];
        for (let i = 0; i < chipsCopy.length; i++) {
          if (chipsCopy[i].hasOwnProperty("temporaryKey")) {
            await axios
              .post(
                `/api/keywords?idUser=${authenticationInfos.shop.id}&idScript=${scriptId}`,
                { name: chipsCopy[i].label }
              )
              .then((resp) => {
                delete chipsCopy[i].temporaryKey;
                chipsCopy[i].key = resp.data.id;
              });
          }
        }
        setChipData(chipsCopy);

        //Saving the new script id/name in current auth state
        //We check if it exsists already : if yes, we update it, if no we add a new one in the array of scripts

        //We will pass it into localStorage also
        //Depending on creation or edition mode, as for the state, we will save it differently in state
        let localStorageUserData = JSON.parse(
          window.localStorage.getItem("userInfos")
        );

        //Creating it in state
        if (
          authenticationInfos?.userScripts.filter(
            (script) => script.id === scriptId
          ).length === 0
        ) {
          setAuthenticationInfos({
            ...authenticationInfos,
            userScripts: [
              ...authenticationInfos.userScripts,
              {
                id: scriptId,
                name: scriptName,
                formats: selectedFormats,
                rarities: raritiesUsed,
              },
            ],
          });
          localStorageUserData.userScripts = [
            ...authenticationInfos.userScripts,
            {
              id: scriptId,
              name: scriptName,
              formats: selectedFormats,
              keywordBehaviour,
              willBeBasedOn: pricesAreBasedOn,
              rarities: raritiesUsed,
            },
          ];
        }
        //Refreshing only the relevant one in state
        else {
          const indexScriptToUpdate = authenticationInfos?.userScripts.findIndex(
            (script) => script.id === scriptId
          );
          authenticationInfos.userScripts[
            indexScriptToUpdate
          ].name = scriptName;

          authenticationInfos.userScripts[
            indexScriptToUpdate
          ].keywordBehaviour = keywordBehaviour;

          authenticationInfos.userScripts[
            indexScriptToUpdate
          ].willBeBasedOn = pricesAreBasedOn;

          authenticationInfos.userScripts[
            indexScriptToUpdate
          ].formats = selectedFormats;

          authenticationInfos.userScripts[
            indexScriptToUpdate
          ].rarities = raritiesUsed;

          setAuthenticationInfos({ ...authenticationInfos });
          localStorageUserData.userScripts = authenticationInfos.userScripts;
        }

        window.localStorage.setItem(
          "userInfos",
          JSON.stringify(localStorageUserData)
        );

        //removing IsToBeSaved prop from each table
        const allNewRules = respServ.map((rule) => {
          if (rule.hasOwnProperty("data")) {
            return { ...rule.data, isToBeSaved: false };
          } else {
            return rule;
          }
        });

        // console.log("all our news rules", allNewRules);

        setCustomRulesGlobalState(prepareStateFromArrayOfRules(allNewRules));
        setScriptMustbeSaved(false);

        toast.success(
          <FormattedMessage
            id="createMyScript.saving.success"
            defaultMessage="Your script has been saved."
          />
        );

        console.log("saved !");
      } catch (e) {
        errorHandlingAPI.checkErrorStatus(e);
        console.log("error while saving", e);
        toast.error(
          <FormattedMessage
            id="createMyScript.saving.failure"
            defaultMessage="There has been an error while saving."
          />
        );
        //Set l'ancien state - NOT TRIED
        console.log(previousState);
        setCustomRulesGlobalState(previousState);
      }
    }
  };

  const handleWriteKeywordName = (event) => {
    const { value } = event.target;
    setKeywordName(value);
  };

  const handleAddKeyword = (event, name) => {
    setScriptMustbeSaved(true);

    const temporaryNumber = Math.random();

    const newChipToAdd = {
      temporaryKey: temporaryNumber,
      key: temporaryNumber,
      label: name,
    };
    setChipData([...chipData, newChipToAdd]);
    setKeywordName("");
  };

  const handleDeleteChip = (chipToDelete) => () => {
    setScriptMustbeSaved(true);
    const arrayCopy = [...chipData];

    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );

    // If the chip has no temporary ID, then it was registered on DB, then we need to delete it
    if (!chipToDelete.hasOwnProperty("temporaryKey")) {
      //delete on API side
      // in case of failure, put it back + toast "createMyScript.script.select.keywordBehaviour.delete.failure.toast"
      axios
        .delete(
          `/api/keywords/${chipToDelete.key}?idUser=${authenticationInfos.shop.id}&idScript=${idScript}`
        )
        .catch((err) => {
          console.log("error when trying to delete", err);
          // Reseting Chip array because data could not be deleted
          setChipData(arrayCopy);
          toast.error(
            <FormattedMessage
              id="createMyScript.script.select.keywordBehaviour.delete.failure.toast"
              defaultMessage="This MKM comment could not be deleted. Please try later."
            />
          );
        });
    }
  };

  const handleChangeScriptName = (event) => {
    setScriptMustbeSaved(true);
    setScriptName(event.target.value);
  };

  const handleChangeRaritiesUsed = (e, rarity) => {
    setScriptMustbeSaved(true);
    setRaritiesUsed({ ...raritiesUsed, [rarity]: !raritiesUsed[rarity] });
  };

  const handleChangeSelect = (event) => {
    setScriptMustbeSaved(true);
    let idFormat = parseInt(event.target.value[0]);

    //Immediate state-of-the-app
    let copySelectedFormatsUpToDate;

    //Should we add or remove from selected elements ?
    if (selectedFormats.includes(idFormat)) {
      console.log("already included");
      setSelectedFormats(
        selectedFormats.filter((formatSelected) => formatSelected !== idFormat)
      );
      //We keep a copy to save in DB
      copySelectedFormatsUpToDate = selectedFormats.filter(
        (formatSelected) => formatSelected !== idFormat
      );
    } else {
      console.log("not included");
      setSelectedFormats([...selectedFormats, idFormat]);
      copySelectedFormatsUpToDate = [...selectedFormats, idFormat];
    }
  };

  const launchTest = () => {
    if (scriptMustBeSaved) {
      toast.error(
        <FormattedMessage
          id="createMyScript.scriptMustBeSaved"
          defaultMessage="Please save the script before launching it."
        />
      );
      return;
    }

    if (canStateBeSaved(customRulesGlobalState) === false) {
      toast.error(
        <FormattedMessage
          id="createMyScript.checkStateCoherence.failure"
          defaultMessage="There seems to be an error among the rules. Please check them."
        />
      );
      return;
    }

    if (
      customRulesGlobalState.foil.length +
        customRulesGlobalState.regular.length ===
      0
    ) {
      toast.error(
        <FormattedMessage
          id="createMyScript.launchScript.failure.customRulesatLeast1"
          defaultMessage="The script must at least have one rule."
        />
      );
      return;
    }

    if (
      raritiesUsed.mythic === false &&
      raritiesUsed.rare === false &&
      raritiesUsed.uncommon === false &&
      raritiesUsed.common === false
    ) {
      toast.error(
        <FormattedMessage
          id="scriptline.select.rarities.mustHaveOneAtLeast"
          defaultMessage="Your script must at least process one card rarity."
        />
      );
      return;
    }

    //Is user Subscribed to our service ?

    if (!subscribeAPI.isUserSubscribed(authenticationInfos.isSubscribedUntil)) {
      toast.error(
        <FormattedMessage
          id="subscribed.notSusbcribed.NeedToDoIt.text"
          defaultMessage="You need to subscribe to access this feature. You can do this {link}."
          values={{
            link: (
              <Link to="/subscribe">
                <FormattedMessage
                  id="subscribed.notSusbcribed.NeedToDoIt.link"
                  defaultMessage="here"
                />
              </Link>
            ),
          }}
        />
      );
      return;
    }

    //Check if user is connected to MKM
    if (
      !MKMAPI.isUserConnectedToMKM(
        authenticationInfos?.shop?.ExpirationMkmToken
      )
    ) {
      setIsMKMModalDisplayed(true);
      setIsTransparentDivDisplayed(true);
      toast.error(
        <FormattedMessage
          id="createMyScript.checkMKMConnection.failture"
          defaultMessage="You are not connected to MKM. Please connect in order to launch a script."
        />
      );
      return;
    }

    setIsBlackDivModalDisplayed("activated");

    // Passing all relevant data to confirmation pop in through Context
    setPopInTestScriptInformations({
      isDisplayed: true,
      formats: selectedFormats,
      isTest: true,
      locale: currentLang.locale,
      idScript,
      indexScript,
    });
  };

  const launchScript = () => {
    if (scriptMustBeSaved) {
      toast.error(
        <FormattedMessage
          id="createMyScript.scriptMustBeSaved"
          defaultMessage="Please save thhe script before launching it."
        />
      );
      return;
    }

    if (canStateBeSaved(customRulesGlobalState) === false) {
      toast.error(
        <FormattedMessage
          id="createMyScript.checkStateCoherence.failure"
          defaultMessage="There seems to be an error among the rules. Please check them."
        />
      );
      return;
    }

    if (
      customRulesGlobalState.foil.length +
        customRulesGlobalState.regular.length ===
      0
    ) {
      toast.error(
        <FormattedMessage
          id="createMyScript.launchScript.failure.customRulesatLeast1"
          defaultMessage="The script must at least have one rule."
        />
      );
      return;
    }

    if (
      raritiesUsed.mythic === false &&
      raritiesUsed.rare === false &&
      raritiesUsed.uncommon === false &&
      raritiesUsed.common === false
    ) {
      toast.error(
        <FormattedMessage
          id="scriptline.select.rarities.mustHaveOneAtLeast"
          defaultMessage="Your script must at least process one card rarity."
        />
      );
      return;
    }

    console.log(
      "is user subscribed ?",
      subscribeAPI.isUserSubscribed(authenticationInfos.isSubscribedUntil)
    );

    if (!subscribeAPI.isUserSubscribed(authenticationInfos.isSubscribedUntil)) {
      toast.error(
        <FormattedMessage
          id="subscribed.notSusbcribed.NeedToDoIt.text"
          defaultMessage="You need to subscribe to access this feature. You can do this {link}."
          values={{
            link: (
              <Link to="/subscribe">
                <FormattedMessage
                  id="subscribed.notSusbcribed.NeedToDoIt.link"
                  defaultMessage="here"
                />
              </Link>
            ),
          }}
        />
      );
      return;
    }

    //Check if user is connected to MKM
    if (
      !MKMAPI.isUserConnectedToMKM(
        authenticationInfos?.shop?.ExpirationMkmToken
      )
    ) {
      setIsMKMModalDisplayed(true);
      setIsTransparentDivDisplayed(true);
      toast.error(
        <FormattedMessage
          id="createMyScript.checkMKMConnection.failture"
          defaultMessage="You are not connected to MKM. Please connect in order to launch a script."
        />
      );
      return;
    }

    setIsBlackDivModalDisplayed("activated");

    // Passing all relevant data to confirmation pop in through Context
    setPopInLaunchingScriptInformations({
      isDisplayed: true,
      formats: selectedFormats,
      isTest: false,
      locale: currentLang.locale,
      idScript,
      indexScript,
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    disableScrollLock: true,
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
      style: {
        top: 500,
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: "1rem 0",
      position: "relative",
      minHeight: 40,
      "& > *": {
        margin: theme.spacing(1),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    radioFormControl: {},
    chip: {
      margin: theme.spacing(0.5),
    },
    saveButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
    },
    launchButton: {
      backgroundColor: "#FF546D",
      "&:hover": {
        background: "rgb(250, 216, 89)",
      },
    },
    testButton: {
      backgroundColor: "rgb(28, 100, 4242)",
      "&:hover": {
        background: "rgba(63, 131, 248, 0.8)",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      maxWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  /* ******************** */
  /* *** TRANSLATIONS *** */
  /* ******************** */

  const formatSelectTitle = intl.formatMessage({
    id: "createMyScript.select.formats.title",
    defaultMessage: "Formats",
  });

  const keywordAddLabel = intl.formatMessage({
    id: "createMyScript.script.select.keywordBehaviour.add.form.label",
    defaultMessage: "Add a MKM comment",
  });

  const translatedMkmTrendsBehaviour = intl.formatMessage({
    id: "createMyScript.script.select.pricedBasedOnPossibilities.mkmTrends",
    defaultMessage: "The MKM Data",
  });
  const translatedOldPricesBehaviour = intl.formatMessage({
    id: "createMyScript.script.select.pricedBasedOnPossibilities.oldPrices",
    defaultMessage: "My current prices",
  });
  const ignoreEveryKeyWordBehaviour = intl.formatMessage({
    id: "createMyScript.script.select.keywordBehaviourPossibilities.ignores",
    defaultMessage: "Ignores Specifically",
  });
  const targetSpecificallyBehaviour = intl.formatMessage({
    id:
      "createMyScript.script.select.keywordBehaviourPossibilities.targetsSpecifically",
    defaultMessage: "Targets these only",
  });
  const avoidSpecificallyBehaviour = intl.formatMessage({
    id:
      "createMyScript.script.select.keywordBehaviourPossibilities.avoidsSpecifically",
    defaultMessage: "Avoid Specifically",
  });

  const translatedLabelMythic = intl.formatMessage({
    id: "createMyScript.rarity.mythic",
    defaultMessage: "Mythic",
  });
  const translatedLabelRare = intl.formatMessage({
    id: "createMyScript.rarity.rare",
    defaultMessage: "Rare",
  });
  const translatedLabelUncommon = intl.formatMessage({
    id: "createMyScript.rarity.uncommon",
    defaultMessage: "Uncommon",
  });
  const translatedLabelCommon = intl.formatMessage({
    id: "createMyScript.rarity.common",
    defaultMessage: "Common",
  });
  const translatedplaceholderExpansionsMultiSelect = intl.formatMessage({
    id: "createMyScript.script.select.expansions.placeholder",
    defaultMessage: "Choose sets...",
  });
  const translatedXSetsSelectedExpansionsMultiSelect = intl.formatMessage({
    id: "createMyScript.script.select.expansions.numberOfSetsSelected",
    defaultMessage: "{0} sets selected",
  });
  const translatedPlaceholderSelectedFormatMultiSelect = intl.formatMessage({
    id: "createMyScript.select.formats.placeholder",
    defaultMessage: "Choose formats...",
  });
  const translatedXSetsSelectedFormatMultiSelect = intl.formatMessage({
    id: "createMyScript.script.select.formats.numberOfSetsSelected",
    defaultMessage: "{0} formats selected",
  });

  return (
    <>
      <div className="create-my-script-container">
        <div className="parts-container">
          <div className="left-part">
            <div className="second-menu-scripts">
              {isCreationOrEditionMode === "Creation" && (
                <h2 className="main-title">
                  <FormattedMessage
                    id="createMyScript.title.createAScript"
                    defaultMessage="Create a Script"
                  />
                </h2>
              )}
              {isCreationOrEditionMode === "Edition" && (
                <h2 className="main-title">
                  <FormattedMessage
                    id="createMyScript.title.scriptNumber"
                    defaultMessage="Script n°"
                  />
                  {idScript}
                </h2>
              )}
              <div className="main-buttons-menu">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => saveScriptAndCustomRules(e)}
                  className={"button-second-navbar " + classes.saveButton}
                  size="large"
                  disabled={!scriptMustBeSaved}
                >
                  <FormattedMessage
                    id="createMyScript.buttons.save"
                    defaultMessage="Save"
                  />
                </Button>

                {/* This button only displays if script has an ID */}
                {Boolean(idScript) && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={"button-second-navbar " + classes.testButton}
                    size="large"
                    onClick={launchTest}
                    disabled={
                      authenticationInfos?.userScripts?.[indexScript]
                        ?.isRunning === 1 ||
                      scriptMustBeSaved ||
                      false
                    }
                  >
                    <FormattedMessage
                      id="createMyScript.buttons.test"
                      defaultMessage="Test"
                    />
                  </Button>
                )}
                {/* This button only displays if script has an ID */}
                {Boolean(idScript) && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={"button-second-navbar " + classes.launchButton}
                    size="large"
                    onClick={launchScript}
                    disabled={
                      authenticationInfos?.userScripts?.[indexScript]
                        ?.isRunning === 1 ||
                      scriptMustBeSaved ||
                      false
                    }
                  >
                    <FormattedMessage
                      id="createMyScript.buttons.launch"
                      defaultMessage="Lancer"
                    />
                  </Button>
                )}
              </div>
              <div className="partContainer nameSelection">
                <div className="part-title">
                  <p>
                    <FormattedMessage
                      id="createMyScript.title.scriptname"
                      defaultMessage="Script Name"
                    />
                  </p>
                </div>
                <div className="partForm">
                  <TextField
                    id="outlined-from"
                    variant="outlined"
                    name={"priceRangeValueToSet"}
                    onChange={handleChangeScriptName}
                    className="scriptNameEdition"
                    value={scriptName}
                  />
                </div>
              </div>
              <div className="partContainer formatSelection">
                <div className="part-title">
                  <p>
                    <FormattedMessage
                      id="createMyScript.script.title.formatSelection"
                      defaultMessage="Format Selection"
                    />
                    <span> ({selectedFormats.length})</span>
                  </p>
                </div>
                <div className="partForm">
                  <MultiSelect
                    value={selectedFormats}
                    options={allDefinitions.allFormats}
                    onChange={(e) => {
                      setScriptMustbeSaved(true);
                      setSelectedFormats(e.value);
                    }}
                    optionLabel="name"
                    optionValue="id"
                    filter
                    placeholder={translatedPlaceholderSelectedFormatMultiSelect}
                    style={{ width: isMobile ? "250px" : "300px" }}
                    selectedItemsLabel={
                      translatedXSetsSelectedFormatMultiSelect
                    }
                  />
                </div>
              </div>
              <div className="partContainer expansionSelection">
                <div className="part-title">
                  <p>
                    <FormattedMessage
                      id="createMyScript.script.setSelection.title"
                      defaultMessage="Filter by set"
                    />
                    <span> ({expansionsSelected.length})</span>
                  </p>
                </div>
                <div className="partForm">
                  <MultiSelect
                    value={expansionsSelected}
                    options={allDefinitions.allMKMSets}
                    onChange={(e) => {
                      setScriptMustbeSaved(true);
                      setExpansionsSelected(e.value);
                    }}
                    optionLabel="mcmname"
                    optionValue="mcmname"
                    filter
                    placeholder={translatedplaceholderExpansionsMultiSelect}
                    style={{ width: isMobile ? "250px" : "300px" }}
                    selectedItemsLabel={
                      translatedXSetsSelectedExpansionsMultiSelect
                    }
                  />
                </div>
              </div>
              <div className="partContainer isBasedOnChoice">
                <div className="partContainer basedOnSelection">
                  <div className="part-title">
                    <p>
                      <FormattedMessage
                        id="createMyScript.script.select.pricesAreBasedOn.label"
                        defaultMessage="Calculate the new prices from : "
                      />
                    </p>
                  </div>
                  <div className="partForm">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue={pricesAreBasedOn}
                      value={pricesAreBasedOn}
                      className={classes.radioFormControl}
                    >
                      <FormControlLabel
                        value="mkmTrends"
                        control={<Radio color="primary" />}
                        label={translatedMkmTrendsBehaviour}
                        onChange={handlePricedBasedOn}
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="oldPrices"
                        control={<Radio color="primary" />}
                        label={translatedOldPricesBehaviour}
                        labelPlacement="start"
                        onChange={handlePricedBasedOn}
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="partContainer keywordSelection">
                <div className="partContainer behaviourSelect">
                  <div className="part-title">
                    <p>
                      <FormattedMessage
                        id="createMyScript.script.select.keywordBehaviour.title"
                        defaultMessage="About MKM comments : "
                      />
                    </p>
                  </div>
                  <div className="partForm">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue={keywordBehaviour}
                      value={keywordBehaviour}
                      className={classes.radioFormControl}
                    >
                      <FormControlLabel
                        value="ignoresEverything"
                        control={<Radio color="primary" />}
                        label={ignoreEveryKeyWordBehaviour}
                        onChange={handleSelectBehaviour}
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="targetsSpecifically"
                        control={<Radio color="primary" />}
                        label={targetSpecificallyBehaviour}
                        labelPlacement="start"
                        onChange={handleSelectBehaviour}
                      />
                      <FormControlLabel
                        value="avoidsSpecifically"
                        control={<Radio color="primary" />}
                        label={avoidSpecificallyBehaviour}
                        labelPlacement="start"
                        onChange={handleSelectBehaviour}
                      />
                    </RadioGroup>
                  </div>
                </div>
                <div className="keywordList">
                  <div className="part-title">
                    <p>
                      <FormattedMessage
                        id="createMyScript.script.select.keywordBehaviour.listOfComments.title"
                        defaultMessage="List of MKM Comments : "
                      />
                    </p>
                  </div>
                  <div className="partForm">
                    <Paper component="ul" className={classes.root}>
                      {chipData.length === 0 && (
                        <div className="chipsPlaceHolderNoKeywords">
                          <FormattedMessage
                            id="createMyScript.script.select.keywordChips.placeholder.noKeywords"
                            defaultMessage="No MKM comment were added."
                          />
                        </div>
                      )}
                      {chipData.map((data) => {
                        let icon;
                        // Icon can be set as non deletable - see doc
                        return (
                          <li key={data.key}>
                            <Chip
                              icon={icon}
                              label={data.label}
                              onDelete={handleDeleteChip(data)}
                              className={classes.chip}
                            />
                          </li>
                        );
                      })}
                    </Paper>
                  </div>
                </div>
                <div className="keywordAdder">
                  <TextField
                    id="keywordNametextfield"
                    label={keywordAddLabel}
                    value={keywordName}
                    onChange={handleWriteKeywordName}
                  />
                  <div className="keywordAdderContainer">
                    <IconButton
                      aria-label="add"
                      disabled={keywordName.length === 0}
                      onClick={(e) => handleAddKeyword(e, keywordName)}
                    >
                      <AddCircleIcon
                        color={keywordName.length === 0 ? "" : "primary"}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="partContainer rarityFilter">
                <div className="part-title">
                  <p>
                    <FormattedMessage
                      id="createMyScript.rarity.title"
                      defaultMessage="Rarities processed"
                    />
                  </p>
                </div>
                <div className="partForm raritiesCheck">
                  <FormGroup aria-label="position" row>
                    <div className="checkboxContainer">
                      <FormControlLabel
                        value="top"
                        control={
                          <Checkbox
                            color="primary"
                            checked={raritiesUsed.mythic}
                          />
                        }
                        label={translatedLabelMythic}
                        labelPlacement="end"
                        onChange={(e) => handleChangeRaritiesUsed(e, "mythic")}
                      />
                      <FormControlLabel
                        value="start"
                        control={
                          <Checkbox
                            color="primary"
                            checked={raritiesUsed.rare}
                          />
                        }
                        label={translatedLabelRare}
                        labelPlacement="end"
                        onChange={(e) => handleChangeRaritiesUsed(e, "rare")}
                      />
                    </div>
                    <div className="checkboxContainer">
                      <FormControlLabel
                        value="bottom"
                        control={
                          <Checkbox
                            color="primary"
                            checked={raritiesUsed.uncommon}
                          />
                        }
                        label={translatedLabelUncommon}
                        labelPlacement="end"
                        onChange={(e) =>
                          handleChangeRaritiesUsed(e, "uncommon")
                        }
                      />
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={raritiesUsed.common}
                          />
                        }
                        label={translatedLabelCommon}
                        labelPlacement="end"
                        onChange={(e) => handleChangeRaritiesUsed(e, "common")}
                      />
                    </div>
                  </FormGroup>
                </div>
              </div>
              <div className="partContainer genericRules">
                <div className="part-title">
                  <p>
                    <FormattedMessage
                      id="createMyScript.genericRules.title"
                      defaultMessage="Generic Rules"
                    />
                  </p>
                </div>
                <div className="partForm">
                  <ul className="genericList">
                    <li>
                      <FormattedMessage
                        id="createMyScript.genericRules.signedCardAreNotTreated"
                        defaultMessage="Signed cards are not processed."
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="createMyScript.genericRules.alteredCardAreNotTreated"
                        defaultMessage="Altered cards are not processed."
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="createMyScript.genericRules.playsetsAreNotTreated"
                        defaultMessage="Playsets are not processed."
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="createMyScript.genericRules.cardsWithSuperiorPriceAreNotTreated"
                        defaultMessage="Cards with superior prices to these mentionned here are not processed."
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* RULES */}
          <div className="right-part">
            <div className="regular-rules-schema">
              <div className="sectionTitle">
                <p>
                  <FormattedMessage
                    id="customRules.regularRules.title"
                    defaultMessage="REGULAR RULES"
                  />
                  <span> ({customRulesGlobalState.regular.length})</span>
                </p>
                {pricesAreBasedOn === "mkmTrends" && (
                  <span className="helperTextCustomRules">
                    <FormattedMessage
                      id="customRules.helpertext.basedOnRegularMKMTrends"
                      defaultMessage="based on MKM trend price"
                    />
                  </span>
                )}
                {pricesAreBasedOn === "oldPrices" && (
                  <span className="helperTextCustomRules">
                    <FormattedMessage
                      id="customRules.helpertext.basedOnCurrentPrices"
                      defaultMessage="based on your current prices"
                    />
                  </span>
                )}
              </div>
              <div className="regularRulesContainer">
                {Array.isArray(customRulesGlobalState.regular) &&
                  customRulesGlobalState.regular.length === 0 && (
                    <PlainTextAddRuleButton
                      position={0}
                      FoilOrRegular="regular"
                      handleClick={addACustomRule}
                    />
                  )}
                {Array.isArray(customRulesGlobalState.regular) &&
                  customRulesGlobalState.regular.map((rule, index) => {
                    // console.log(rule);
                    return (
                      <CustomRule
                        rule={rule}
                        index={index}
                        parentArrayLength={
                          customRulesGlobalState.regular.length
                        }
                        FoilOrRegular="regular"
                        addACustomRule={addACustomRule}
                        deleteACustomRule={deleteACustomRule}
                        key={
                          "" + rule.id + "" + rule.temporaryId + "" + "regular"
                        }
                        updateACustomRule={updateACustomRule}
                        scriptIsBasedOn={pricesAreBasedOn}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="foil-rules-schema">
              <div className="sectionTitle">
                <p>
                  <FormattedMessage
                    id="customRules.foilRules.title"
                    defaultMessage="FOIL RULES"
                  />
                  <span> ({customRulesGlobalState.foil.length})</span>
                </p>
                {pricesAreBasedOn === "mkmTrends" && (
                  <span className="helperTextCustomRules">
                    <FormattedMessage
                      id="customRules.helpertext.basedOnFoilMKMTrends"
                      defaultMessage="based on MKM Foil Trend price"
                    />
                  </span>
                )}
                {pricesAreBasedOn === "oldPrices" && (
                  <span className="helperTextCustomRules">
                    <FormattedMessage
                      id="customRules.helpertext.basedOnCurrentPrices"
                      defaultMessage="based on your current prices"
                    />
                  </span>
                )}
              </div>
              <div className="foilRulesContainer">
                {Array.isArray(customRulesGlobalState.foil) &&
                  customRulesGlobalState.foil.length === 0 && (
                    <PlainTextAddRuleButton
                      position={0}
                      FoilOrRegular="foil"
                      handleClick={addACustomRule}
                    />
                  )}
                {Array.isArray(customRulesGlobalState.foil) &&
                  customRulesGlobalState.foil.map((rule, index) => {
                    // console.log("foil rule", rule);
                    return (
                      <CustomRule
                        rule={rule}
                        index={index}
                        parentArrayLength={customRulesGlobalState.foil.length}
                        FoilOrRegular="foil"
                        addACustomRule={addACustomRule}
                        deleteACustomRule={deleteACustomRule}
                        key={
                          "" + rule.id + "" + rule.temporaryId + "" + "regular"
                        }
                        updateACustomRule={updateACustomRule}
                        scriptIsBasedOn={pricesAreBasedOn}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMyScript;
