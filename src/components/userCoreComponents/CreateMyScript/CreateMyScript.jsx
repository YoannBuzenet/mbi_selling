import React, { useState, useEffect, useRef, useContext } from "react";
import "./createMyScript.css";
import axios from "axios";
import AddRuleButton from "./AddRuleButton";
import CustomRule from "./CustomRule";
import { toast } from "react-toastify";
import { matchPath } from "react-router";

import AuthContext from "../../../context/authContext";
import DefinitionContext from "../../../context/definitionsContext";
import errorHandlingAPI from "../../../services/errorHandlingAPI";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

import { FormattedMessage, useIntl } from "react-intl";

const CreateMyScript = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [selectedFormats, setSelectedFormats] = useState(() => {
    //If we are in edition mode, we start from the formats aldready stored in the script
    if (match?.params?.id) {
      return [];
      //TODO FIND THE RIGHT VALUE HERE
    }
    //If we are in creation mode, starting value is empty array
    else if (!match?.params?.id) {
      return [];
    }
  });

  //Getting id param on edition mode (with /manage-script/ route)
  const match = matchPath(history.location.pathname, {
    path: "/edit-script/:id",
    exact: true,
    strict: false,
  });

  console.log("auth from create script", authenticationInfos);

  // console.log("le path :", history.location.pathname);

  // If we have an id param, that means we are editing a script. Otherwise, we are creating a brand new one !
  const isCreationOrEditionMode = match?.params?.id ? "Edition" : "Creation";

  console.log("ARE WE IN MODE CREATION OR EDITION ?", isCreationOrEditionMode);

  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);
  // console.log("definitions", allDefinitions);

  const defaultScriptName = "Nouveau Script à traduire";

  const defaultCreationState = {
    regular: [
      {
        temporaryId: 485,
        priceRangeFrom: 0,
        priceRangeTo: 1,
        ruleTypeId: 2,
        behaviourId: 13,
        isForFoils: 0,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 16,
        priceRangeFrom: 1,
        priceRangeTo: 10,
        ruleTypeId: 2,
        behaviourId: 14,
        isForFoils: 0,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 17,
        priceRangeFrom: 10,
        priceRangeTo: 30,
        ruleTypeId: 2,
        behaviourId: 15,
        isForFoils: 0,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 18,
        priceRangeFrom: 30,
        priceRangeTo: 100,
        ruleTypeId: 2,
        behaviourId: 16,
        isForFoils: 0,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 19,
        priceRangeFrom: 100,
        priceRangeTo: 500,
        ruleTypeId: 2,
        behaviourId: 19,
        isForFoils: 0,
        isForSigned: 0,
        isForPlaysets: 0,
      },
    ],
    foil: [
      {
        temporaryId: 486,
        priceRangeFrom: 0,
        priceRangeTo: 1,
        ruleTypeId: 2,
        behaviourId: 13,
        isForFoils: 1,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 20,
        priceRangeFrom: 1,
        priceRangeTo: 10,
        ruleTypeId: 2,
        behaviourId: 14,
        isForFoils: 1,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 21,
        priceRangeFrom: 10,
        priceRangeTo: 30,
        ruleTypeId: 2,
        behaviourId: 15,
        isForFoils: 1,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 22,
        priceRangeFrom: 30,
        priceRangeTo: 100,
        ruleTypeId: 2,
        behaviourId: 16,
        isForFoils: 1,
        isForSigned: 0,
        isForPlaysets: 0,
      },
      {
        temporaryId: 23,
        priceRangeFrom: 100,
        priceRangeTo: 500,
        ruleTypeId: 2,
        behaviourId: 19,
        isForFoils: 1,
        isForSigned: 0,
        isForPlaysets: 0,
      },
    ],
  };

  const [customRulesGlobalState, setCustomRulesGlobalState] = useState(
    isCreationOrEditionMode === "Creation"
      ? defaultCreationState
      : { regular: [], foil: [] }
  );

  const [scriptName, setScriptName] = useState(
    isCreationOrEditionMode === "Creation" ? defaultScriptName : ""
  );

  //This value is kept in state for creation mode, where we will need to set it before sending our rules.
  //With this we have this potential ID always in the same variable.
  const [idScript, setIdScript] = useState(match?.params?.id);

  useEffect(() => {
    console.log("getting custom rules");
    //If we are in edit mode, get the data from the script
    if (isCreationOrEditionMode === "Edition") {
      //GETTING CUSTOM RULES
      axios
        .get(
          `/api/customRules?idUser=${authenticationInfos.user.id}&idScript=${match?.params?.id}`
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
          setScriptName(resp.data.name);
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
      setScriptName("Nouveau nom exprès");
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

  const saveScriptAndCustomRules = async () => {
    if (canStateBeSaved(customRulesGlobalState) === false) {
      toast.error("there's something in the state bro");
    } else {
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
            }
          );
          console.log("data arrived : ", scriptCreated);
          setIdScript(scriptCreated.data.id);
          newScriptId = scriptCreated.data.id;
        } catch (e) {
          console.log("creation script", e);
          errorHandlingAPI.checkErrorStatus(e);
          toast.error("error when creating script");
          return;
        }
      } else {
        //WE PATCH THE SCRIPT NAME
        axios
          .patch(
            "/api/script/" +
              idScript +
              "?idUser=" +
              authenticationInfos.user.id,
            {
              name: scriptName,
              formats: selectedFormats,
            }
          )
          .then((resp) => {
            console.log("ce .then sert à rien nan ?");
          })
          .catch((err) => {
            console.log(err);
            console.log("erreur lors du patch script");
            errorHandlingAPI.checkErrorStatus(err);
          });
      }

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
              authenticationInfos.user.id,
            rule
          );
        } else if (rule.hasOwnProperty("temporaryId")) {
          console.log("POST", rule);
          //We use the right script variable
          let scriptId;
          if (newScriptId !== null) {
            scriptId = newScriptId;
          } else {
            scriptId = idScript;
          }

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
              authenticationInfos.user.id,
            rule
          );
        } else if (rule.hasOwnProperty("temporaryId")) {
          console.log("POST", rule);
          //We use the right script variable
          let scriptId;
          if (newScriptId !== null) {
            scriptId = newScriptId;
          } else {
            scriptId = idScript;
          }

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

      try {
        console.log("serv resp", respServ);
        toast.success("Script saved babe");

        //Saving the new script id/name in current auth state
        //We check if it exsists already : if yes, we update it, if no we add a new one in the array of scripts

        //We use the right script variable
        let scriptId;
        if (newScriptId !== null) {
          scriptId = parseInt(newScriptId);
        } else {
          scriptId = parseInt(idScript);
        }

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
              { id: scriptId, name: scriptName, formats: selectedFormats },
            ],
          });
          localStorageUserData.userScripts = [
            ...authenticationInfos.userScripts,
            { id: scriptId, name: scriptName, formats: selectedFormats },
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
          ].formats = selectedFormats;
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

        console.log("all our news rules", allNewRules);

        setCustomRulesGlobalState(prepareStateFromArrayOfRules(allNewRules));
        console.log("saved !");
      } catch (e) {
        errorHandlingAPI.checkErrorStatus(e);
        console.log(e);
        toast.error("error when saving");
        //Set l'ancien state - NOT TRIED
        console.log(previousState);
        setCustomRulesGlobalState(previousState);
      }
    }
  };

  const handleChangeScriptName = (event) => {
    setScriptName(event.target.value);
  };

  const handleChangeSelect = (event) => {
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
    //check if there is a one of the numerous "has incoherence" flag and notify if yes
    console.log("test !");
  };

  const launchScript = () => {
    //check if there is a one of the numerous "has incoherence" flag and notify if yes
    console.log("Launch !");
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
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
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    saveButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
    },

    launchButton: {
      backgroundColor: "rgb(247, 202, 24)",
      "&:hover": {
        background: "rgb(250, 216, 89)",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
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

  const intl = useIntl();

  const formatSelectTitle = intl.formatMessage({
    id: "createMyScript.select.formats.title",
    defaultMessage: "Formats",
  });

  return (
    <>
      <div className="second-menu-scripts">
        <p style={{ margin: "0 20px" }}>
          <FormattedMessage
            id="createMyScript.title.scriptname"
            defaultMessage="Script Name"
          />
        </p>
        <TextField
          id="outlined-from"
          variant="outlined"
          name={"priceRangeValueToSet"}
          onChange={handleChangeScriptName}
          className="scriptNameEdition"
          value={scriptName}
        />
        <div className="buttons-right-menu">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveScriptAndCustomRules(e)}
            className={"button-second-navbar " + classes.saveButton}
            size="large"
          >
            <FormattedMessage
              id="createMyScript.buttons.save"
              defaultMessage="Save"
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={"button-second-navbar " + classes.testButton}
            size="large"
          >
            <FormattedMessage
              id="createMyScript.buttons.test"
              defaultMessage="Test"
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={"button-second-navbar " + classes.launchButton}
            size="large"
          >
            <FormattedMessage
              id="createMyScript.buttons.launch"
              defaultMessage="Lancer"
            />
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              {formatSelectTitle}
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={[]}
              onChange={handleChangeSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {allDefinitions.allFormats.map((format) => (
                <MenuItem key={format.id} value={format.id}>
                  <Checkbox
                    size="medium"
                    checked={selectedFormats.indexOf(format.id) > -1}
                  />
                  <ListItemText
                    primary={format.name}
                    className="format-select"
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="column-definitions">
          <p>
            <FormattedMessage
              id="createMyScript.columnTitles.regular"
              defaultMessage="Regular"
            />
          </p>
          <p>
            <FormattedMessage
              id="createMyScript.columnTitles.foil"
              defaultMessage="Foil"
            />
          </p>
        </div>
      </div>
      <div className="create-my-script-container">
        <div className="parts-container">
          <div className="left-part">
            <div className="left-schema">
              <AddRuleButton
                position={0}
                FoilOrRegular="regular"
                handleClick={addACustomRule}
              />
              {Array.isArray(customRulesGlobalState.regular) &&
                customRulesGlobalState.regular.map((rule, index) => {
                  // console.log(rule);
                  return (
                    <CustomRule
                      rule={rule}
                      index={index}
                      parentArrayLength={customRulesGlobalState.regular.length}
                      FoilOrRegular="regular"
                      addACustomRule={addACustomRule}
                      deleteACustomRule={deleteACustomRule}
                      key={
                        "" + rule.id + "" + rule.temporaryId + "" + "regular"
                      }
                      updateACustomRule={updateACustomRule}
                    />
                  );
                })}
            </div>
          </div>
          <div className="right-part">
            <div className="right-schema">
              <AddRuleButton
                position={0}
                FoilOrRegular="foil"
                handleClick={addACustomRule}
              />
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
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <p>
            <FormattedMessage
              id="createMyScript.genericRules.title"
              defaultMessage="Generic Rules"
            />
          </p>
          <p>
            <FormattedMessage
              id="createMyScript.genericRules.signedCardAreNotTreated"
              defaultMessage="Signed cards are not processed."
            />
          </p>
          <p>
            <FormattedMessage
              id="createMyScript.genericRules.alteredCardAreNotTreated"
              defaultMessage="Altered cards are not processed."
            />
          </p>
          <p>
            <FormattedMessage
              id="createMyScript.genericRules.playsetsAreNotTreated"
              defaultMessage="Playsets are not processed."
            />
          </p>
          <p>
            <FormattedMessage
              id="createMyScript.genericRules.cardsWithSuperiorPriceAreNotTreated"
              defaultMessage="Cards with superior prices to these mentionned here are not processed."
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateMyScript;
