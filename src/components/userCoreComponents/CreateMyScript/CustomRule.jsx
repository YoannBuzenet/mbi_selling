import React, { useEffect, useState, useContext } from "react";
import AddRuleButton from "./AddRuleButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton, Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import DefinitionContext from "../../../context/definitionsContext";

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
  console.log("definitions from the rule level", allDefinitions);

  const [isZoomed, setIsZoomed] = useState(!rule.wasCreatedHere || true);

  useEffect(() => {
    setTimeout(() => {
      setIsZoomed(true);
    }, 200);
  }, []);

  const handleChange = (e) => {
    updateACustomRule(e, index, FoilOrRegular);
  };

  //TODO : first rule must start from0. if not, has incoherenceStartingPoint = true

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
                onClick={(e) => deleteACustomRule(index, FoilOrRegular)}
              >
                <HighlightOffIcon color="secondary" />
              </IconButton>
            </div>
            DE
            <input
              className="inputValueNumber"
              value={typeof rule.from === "number" ? rule.from : ""}
              name={"from"}
              onChange={(e) => handleChange(e)}
            />
            A
            <input
              className="inputValueNumber"
              value={typeof rule.from === "number" ? rule.to : ""}
              name={"to"}
              onChange={(e) => handleChange(e)}
            />
            €
            <div className="ruleType-choice">
              Que faire ?
              <div>
                {Array.isArray(allDefinitions.ruleTypes) && (
                  <select
                    onChange={(e) => handleChange(e)}
                    name="ruleTypeId"
                    value={rule.ruleTypeId || 1}
                  >
                    {allDefinitions.ruleTypes.map((ruleType) => (
                      <option value={ruleType.id}>{ruleType.name}</option>
                    ))}
                  </select>
                )}
                {rule.ruleTypeId === 1 && (
                  <p>
                    A
                    <input
                      className="inputValueNumber"
                      value={
                        typeof rule.from === "number"
                          ? rule.priceRangeValueToSet
                          : ""
                      }
                      name={"priceRangeValueToSet"}
                      onChange={(e) => handleChange(e)}
                    />
                  </p>
                )}

                {/* TODO REPRENDRE LA AVEC TOUTES LES LIGNES DU PRICEGUIDE */}
                {rule.ruleTypeId === 2 && (
                  <p>
                    {Array.isArray(allDefinitions.priceGuidePossibilities) && (
                      <select
                        onChange={(e) => handleChange(e)}
                        name="priceGuidePossibility"
                        value={rule.priceGuidePossibilities || 1}
                      >
                        {allDefinitions.priceGuidePossibilities.map(
                          (priceGuidePossibility) => (
                            <option value={priceGuidePossibility.id}>
                              {priceGuidePossibility.name}
                            </option>
                          )
                        )}
                      </select>
                    )}
                    {Array.isArray(allDefinitions.ruleBehaviours) && (
                      <select
                        onChange={(e) => handleChange(e)}
                        name="ruleBehaviours"
                        value={rule.ruleBehaviours || 1}
                      >
                        {allDefinitions.ruleBehaviours.map((ruleBehaviour) => (
                          <option value={ruleBehaviour.id}>
                            {ruleBehaviour.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div>
              {rule.hasEmptyInput && (
                <p className="error-rule-explaination">
                  Les deux prix d'une règle doivent être renseignés.
                </p>
              )}
              {rule.hasIncoherentFollowingPrices && (
                <p className="error-rule-explaination">
                  Le prix de cette règle ne colle pas avec celui de la suivante.
                </p>
              )}
              {rule.hasIncoherentOrderInFromTo && (
                <p className="error-rule-explaination">
                  Le prix de départ de cette règle est supérieur ou égal au prix
                  d'arrivée.
                </p>
              )}
              {rule.hasIncoherentStartingPrice && (
                <p className="error-rule-explaination">
                  La première règle doit commencer à 0 euro.
                </p>
              )}
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
