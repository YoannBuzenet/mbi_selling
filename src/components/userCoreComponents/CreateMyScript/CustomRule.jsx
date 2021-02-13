import React, { useEffect, useState, useContext } from "react";
import AddRuleButton from "./AddRuleButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton, Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import DefinitionContext from "../../../context/definitionsContext";
import SelectAppLangContext from "../../../context/selectedAppLang";
import config from "../../../services/config";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage, useIntl } from "react-intl";

const CustomRule = ({
  rule,
  index,
  parentArrayLength,
  FoilOrRegular,
  addACustomRule,
  deleteACustomRule,
  updateACustomRule,
  scriptIsBasedOn,
}) => {
  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);

  // Uncomment to test design without server (with npm start) to feed custom rules
  // const allDefinitions = {
  //   ruleBehaviours: [
  //     { id: "0", name: "roundUp30percents" },
  //     { id: "1", name: "roundDown100" },
  //   ],
  //   priceGuidePossibilities: [
  //     { id: "2", name: "foilAvg30" },
  //     { id: "3", name: "germanProLow" },
  //   ],
  //   ruleTypes: [
  //     { id: "4", name: "setValue" },
  //     { id: "5", name: "operationsApplying" },
  //     { id: "5", name: "exclude" },
  //   ],
  // };

  // console.log("definitions from the rule level", allDefinitions);

  const { currentLang } = useContext(SelectAppLangContext);
  // console.log("definitions from the rule level", allDefinitions);

  const [isZoomed, setIsZoomed] = useState(!rule.wasCreatedHere || true);

  useEffect(() => {
    setTimeout(() => {
      setIsZoomed(true);
    }, 200);
  }, []);

  const handleChange = (e) => {
    updateACustomRule(e, index, FoilOrRegular);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "280px",
      maxWidth: "280px",
      backgroundColor: "white",
    },
    formControlAction: {
      margin: theme.spacing(1),
      minWidth: scriptIsBasedOn === "mkmTrends" ? "190px" : "220px",
      maxWidth: scriptIsBasedOn === "mkmTrends" ? "190px" : "220px",
      backgroundColor: "white",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuItem: {
      fontSize: "14px",
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControlSelect: {
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

  let classNameFirstDiv = "div1left";
  let classNameSecondDiv = "div2right";
  if (rule.hasIncoherentFollowingPrices) {
    classNameFirstDiv = "div1left hasErrors";
    classNameSecondDiv = "div2right hasErrors";
  }

  let borderRuleContainer;
  // if (index === 0) {
  //   borderRuleContainer = { border: "1px solid black" };
  // } else {
  //   // borderRuleContainer = {
  //   //   borderRight: "1px solid black",
  //   //   borderLeft: "1px solid black",
  //   //   borderBottom: "1px solid black",
  //   // };
  //   borderRuleContainer = { border: "1px solid black" };
  // }
  /* ****************** */
  /* ***TRANSLATIONS*** */
  /* ****************** */
  const intl = useIntl();

  const userChoice = intl.formatMessage({
    id: "customRules.select.title.userChoice",
    defaultMessage: "Do",
  });
  const userMKMChoice = intl.formatMessage({
    id: "customRules.select.title.mkmPossibilityToChoose",
    defaultMessage: "Base the new price on",
  });
  const userBehaviourChoice = intl.formatMessage({
    id: "customRules.select.title.behaviour",
    defaultMessage: "Rule to apply",
  });

  return (
    <>
      <Zoom in={isZoomed}>
        <Typography>
          <div className="ruleContainer" style={borderRuleContainer}>
            <div className="deleteButton">
              <IconButton
                onClick={(e) => {
                  setIsZoomed(false);
                  setTimeout(
                    () => deleteACustomRule(index, FoilOrRegular),
                    300
                  );
                }}
              >
                <HighlightOffIcon color="secondary" />
              </IconButton>
            </div>
            <div className="ruleMainBody">
              <p className="fromToText from">
                <FormattedMessage
                  id="customRules.price.from"
                  defaultMessage="From"
                />
              </p>
              <TextField
                id="outlined-from"
                defaultValue=""
                variant="outlined"
                name={"priceRangeFrom"}
                onChange={(e) => handleChange(e)}
                className="inputValueNumber"
                value={
                  rule.priceRangeFrom !== undefined ? rule.priceRangeFrom : ""
                }
              />
              <p className="fromToText">
                <FormattedMessage
                  id="customRules.price.to"
                  defaultMessage="To"
                />
              </p>
              <TextField
                id="outlined-from"
                defaultValue=""
                variant="outlined"
                name={"priceRangeTo"}
                onChange={(e) => handleChange(e)}
                className="inputValueNumber"
                value={rule.priceRangeTo !== undefined ? rule.priceRangeTo : ""}
              />
              <p className="fromToText">€</p>
              <div className="ruleType-choice">
                {Array.isArray(allDefinitions.ruleTypes) && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControlAction}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {userChoice}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => handleChange(e)}
                      name="ruleTypeId"
                      value={rule.ruleTypeId || 1}
                      label="TestToTranslate"
                      labelWidth="100px"
                      MenuProps={{ disableScrollLock: true }}
                    >
                      {allDefinitions.ruleTypes.map((ruleType) => (
                        <MenuItem
                          value={ruleType.id}
                          className={classes.menuItem}
                        >
                          {
                            config?.ruleTypesDictionnary?.[
                              currentLang.locale
                            ]?.[ruleType.name]
                          }
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {rule.ruleTypeId === 1 && (
                  <div className="setValueFixPrice">
                    <p className="fromToText">
                      <FormattedMessage
                        id="customRules.price.setFixedPrice.SellFor"
                        defaultMessage="Sell for"
                      />
                    </p>

                    <TextField
                      id="outlined-from"
                      defaultValue=""
                      variant="outlined"
                      name={"priceRangeValueToSet"}
                      onChange={(e) => handleChange(e)}
                      className="inputValueNumber"
                      value={
                        rule.priceRangeFrom !== undefined
                          ? rule.priceRangeValueToSet
                          : ""
                      }
                    />
                    <p className="fromToText">€</p>
                  </div>
                )}

                {rule.ruleTypeId === 2 && (
                  <>
                    {Array.isArray(allDefinitions.priceGuidePossibilities) &&
                      scriptIsBasedOn === "mkmTrends" && (
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel id="demo-simple-select-outlined-label-2">
                            {userMKMChoice}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label-2"
                            id="demo-simple-select-outlined-2"
                            onChange={(e) => handleChange(e)}
                            name="mkmPriceGuideReference"
                            value={rule.mkmPriceGuideReference || 1}
                            label="TestToTranslate"
                            MenuProps={{ disableScrollLock: true }}
                          >
                            {allDefinitions.priceGuidePossibilities.map(
                              (priceGuidePossibility) => (
                                <MenuItem
                                  value={priceGuidePossibility.id}
                                  className={classes.menuItem}
                                >
                                  {
                                    config?.mkmPriceGuideDictionnary?.[
                                      currentLang.locale
                                    ]?.[priceGuidePossibility.name]
                                  }
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      )}

                    {Array.isArray(allDefinitions.ruleBehaviours) && (
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label-3">
                          {userBehaviourChoice}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label-3"
                          id="demo-simple-select-outlined-3"
                          onChange={(e) => handleChange(e)}
                          name="behaviourId"
                          value={rule.behaviourId || 1}
                          label="TestToTranslate"
                          MenuProps={{ disableScrollLock: true }}
                        >
                          {allDefinitions.ruleBehaviours.map(
                            (ruleBehaviour) => (
                              <MenuItem
                                value={ruleBehaviour.id}
                                className={classes.menuItem}
                              >
                                {
                                  config?.BehaviourDictionnary?.[
                                    currentLang.locale
                                  ]?.[ruleBehaviour.name]
                                }
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="error-custom-rule">
              <ul>
                {rule.hasEmptyInput && (
                  <li className="error-rule-explaination">
                    <FormattedMessage
                      id="customRules.price.errorRule.twoPricesMustBeIndicated"
                      defaultMessage="Both prices of a rule should be filled in."
                    />
                  </li>
                )}
                {rule.hasIncoherentFollowingPrices && (
                  <li className="error-rule-explaination">
                    <FormattedMessage
                      id="customRules.price.errorRule.priceshouldBeCoherentWithNextRule"
                      defaultMessage="Price of this rule is not coherent with the next rule price."
                    />
                  </li>
                )}
                {rule.hasIncoherentOrderInFromTo && (
                  <li className="error-rule-explaination">
                    <FormattedMessage
                      id="customRules.price.errorRule.priceFromShouldInferiortoPriceTo"
                      defaultMessage="'From' Price must be inferior to 'To' price."
                    />
                  </li>
                )}
                {rule.hasIncoherentStartingPrice && (
                  <li className="error-rule-explaination">
                    <FormattedMessage
                      id="customRules.price.errorRule.firstRuleMustStartAt0euros"
                      defaultMessage="'From' Price must be inferior to 'To' price."
                    />
                  </li>
                )}
                {rule.isMissingSellingPrice && (
                  <li className="error-rule-explaination">
                    <FormattedMessage
                      id="customRules.price.errorRule.setFixedValueMustHaveASellingPrice"
                      defaultMessage="This rule expects a selling price."
                    />
                  </li>
                )}
              </ul>
            </div>
            <div className="asideRule hidden-rule-adder">
              {/* Colored Link between rules */}
              {/* Rules with colored link */}
              {index !== parentArrayLength - 1 && (
                <div className="twoBlocksContainer">
                  <div className={classNameFirstDiv}></div>
                  <div className={classNameSecondDiv}></div>
                  <AddRuleButton
                    position={index + 1}
                    FoilOrRegular={FoilOrRegular}
                    handleClick={addACustomRule}
                    classToAdd="onSeparatedDivButton"
                  />
                </div>
              )}
              {/* Rules without colored link */}
              {index === parentArrayLength - 1 && (
                <div className="twoBlocksContainer">
                  <AddRuleButton
                    position={index + 1}
                    FoilOrRegular={FoilOrRegular}
                    handleClick={addACustomRule}
                    classToAdd="onSeparatedDivButton"
                  />
                </div>
              )}
            </div>
          </div>
        </Typography>
      </Zoom>
    </>
  );
};

export default CustomRule;
