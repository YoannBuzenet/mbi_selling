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

const CustomRule = ({
  rule,
  index,
  parentArrayLength,
  FoilOrRegular,
  addACustomRule,
  deleteACustomRule,
  updateACustomRule,
}) => {
  const { allDefinitions, setAllDefinitions } = useContext(DefinitionContext);
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
      minWidth: "480px",
      backgroundColor: "white",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuItem: {
      fontSize: "14px",
    },
  }));

  const classes = useStyles();

  let classNameFirstDiv = "div1left";
  let classNameSecondDiv = "div2right";
  if (rule.hasIncoherentFollowingPrices) {
    classNameFirstDiv = "div1left hasErrors";
    classNameSecondDiv = "div2right hasErrors";
  }

  return (
    <>
      <Zoom in={isZoomed}>
        <Typography>
          <div className="ruleContainer">
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
            DE
            <input
              className="inputValueNumber"
              value={
                rule.priceRangeFrom !== undefined ? rule.priceRangeFrom : ""
              }
              name={"priceRangeFrom"}
              onChange={(e) => handleChange(e)}
            />
            A
            <input
              className="inputValueNumber"
              value={rule.priceRangeTo !== undefined ? rule.priceRangeTo : ""}
              name={"priceRangeTo"}
              onChange={(e) => handleChange(e)}
            />
            €
            <div className="ruleType-choice">
              <div>
                {Array.isArray(allDefinitions.ruleTypes) && (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Que faire ?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => handleChange(e)}
                      name="ruleTypeId"
                      value={rule.ruleTypeId || 1}
                      label="TestToTranslate"
                      labelWidth="100px"
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
                  <p>
                    A
                    <input
                      className="inputValueNumber"
                      value={
                        rule.priceRangeFrom !== undefined
                          ? rule.priceRangeValueToSet
                          : ""
                      }
                      name={"priceRangeValueToSet"}
                      onChange={(e) => handleChange(e)}
                    />
                  </p>
                )}

                {rule.ruleTypeId === 2 && (
                  <p>
                    {Array.isArray(allDefinitions.priceGuidePossibilities) && (
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label-2">
                          Quel prix MKM ?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label-2"
                          id="demo-simple-select-outlined-2"
                          onChange={(e) => handleChange(e)}
                          name="mkmPriceGuideReference"
                          value={rule.mkmPriceGuideReference || 1}
                          label="TestToTranslate"
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
                          Quelle règle ?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label-3"
                          id="demo-simple-select-outlined-3"
                          onChange={(e) => handleChange(e)}
                          name="behaviourId"
                          value={rule.behaviourId || 1}
                          label="TestToTranslate"
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
                  </p>
                )}
              </div>
            </div>
            <div className="error-custom-rule">
              <ul>
                {rule.hasEmptyInput && (
                  <li className="error-rule-explaination">
                    Les deux prix d'une règle doivent être renseignés.
                  </li>
                )}
                {rule.hasIncoherentFollowingPrices && (
                  <li className="error-rule-explaination">
                    Le prix de cette règle ne colle pas avec celui de la
                    suivante.
                  </li>
                )}
                {rule.hasIncoherentOrderInFromTo && (
                  <li className="error-rule-explaination">
                    Le prix de départ de cette règle est supérieur ou égal au
                    prix d'arrivée.
                  </li>
                )}
                {rule.hasIncoherentStartingPrice && (
                  <li className="error-rule-explaination">
                    La première règle doit commencer à 0 euro.
                  </li>
                )}
                {rule.isMissingSellingPrice && (
                  <li className="error-rule-explaination">
                    Cette règle attend un prix de vente.
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="belowRule-CTA">
            {/* Colored Link between rules */}
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
            {index === parentArrayLength - 1 && (
              <AddRuleButton
                position={index + 1}
                FoilOrRegular={FoilOrRegular}
                handleClick={addACustomRule}
              />
            )}
          </div>
        </Typography>
      </Zoom>
    </>
  );
};

export default CustomRule;
