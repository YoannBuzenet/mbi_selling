import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TextField from "@material-ui/core/TextField";
import AuthContext from "../../../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import authAPI from "../../../services/authAPI";

const Settings = () => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [shouldStateBeSaved, setShouldStateBeSaved] = useState(false);

  const [pageState, setPageState] = useState(() => {
    if (authenticationInfos?.shop?.shopData?.PercentPerConditionFoils) {
      return {
        PercentPerConditionFoils: {
          ...authenticationInfos.shop.shopData.PercentPerConditionFoils,
        },
        PercentPerConditions: {
          ...authenticationInfos.shop.shopData.PercentPerConditions,
        },
        PercentPerLangs: {
          ...authenticationInfos.shop.shopData.PercentPerLangs,
        },
      };
    } else {
      return {};
    }
  }, []);

  useEffect(() => {
    if (
      authenticationInfos?.shop?.shopData?.PercentPerConditionFoils !==
        undefined &&
      !pageState.hasOwnProperty("PercentPerConditionFoils")
    ) {
      setPageState({
        PercentPerConditionFoils: {
          ...authenticationInfos.shop.shopData.PercentPerConditionFoils,
        },
        PercentPerConditions: {
          ...authenticationInfos.shop.shopData.PercentPerConditions,
        },
        PercentPerLangs: {
          ...authenticationInfos.shop.shopData.PercentPerLangs,
        },
      });
    }
  });

  const handleChange = (event, category, idstate, key) => {
    let value;
    if (event.target.value === "") {
      value = "";
    } else {
      value = parseInt(event.target.value);
    }

    let stateCopy = { ...pageState };
    stateCopy[category][idstate][key] = value;
    setShouldStateBeSaved(true);
    setPageState(stateCopy);
  };

  //Browe each fields to check if it's filled or empty.
  //Return false if at least one of the fields is empty.
  const checkIfAllFieldsAreFilled = () => {
    let canStateBeSaved = true;
    for (const prop in pageState.PercentPerConditions) {
      if (pageState.PercentPerConditions[prop].percentPercondition === "") {
        canStateBeSaved = false;
      }
    }
    for (const prop in pageState.PercentPerConditions) {
      if (pageState.PercentPerConditionFoils[prop].percentPercondition === "") {
        canStateBeSaved = false;
      }
    }
    for (const prop in pageState.percentPerlanguage) {
      if (pageState.PercentPerLangs[prop].PercentPerLangs === "") {
        canStateBeSaved = false;
      }
    }
    return canStateBeSaved;
  };

  const save = async () => {
    //Check if a param is empty, if yes, display error and return
    let shouldContinue = checkIfAllFieldsAreFilled();
    if (!shouldContinue) {
      toast.error(
        <FormattedMessage
          id="settings.save.check.error.missingField"
          defaultMessage="One of the fields seems to be missing."
        />
      );
      return;
    }

    try {
      for (const percentObj in pageState.PercentPerConditionFoils) {
        axios.put(
          process.env.REACT_APP_MTGAPI_URL +
            "/percent_per_condition_foils/" +
            pageState.PercentPerConditionFoils[percentObj].id,
          {
            percent:
              pageState.PercentPerConditionFoils[percentObj]
                .percentPercondition,
          }
        );
      }
      for (const percentObj in pageState.PercentPerConditions) {
        axios.put(
          process.env.REACT_APP_MTGAPI_URL +
            "/percent_per_conditions/" +
            pageState.PercentPerConditions[percentObj].id,
          {
            percent:
              pageState.PercentPerConditions[percentObj].percentPercondition,
          }
        );
      }
      for (const percentObj in pageState.PercentPerLangs) {
        axios.put(
          process.env.REACT_APP_MTGAPI_URL +
            "/percent_per_langs/" +
            pageState.PercentPerLangs[percentObj].id,
          {
            percent: pageState.PercentPerLangs[percentObj].percentPerlanguage,
          }
        );
      }

      //Update authentication context
      setAuthenticationInfos({
        ...authenticationInfos,
        shop: {
          ...authenticationInfos.shop,
          shopData: {
            ...authenticationInfos.shop.shopData,
            PercentPerConditionFoils: pageState.PercentPerConditionFoils,
            PercentPerConditions: pageState.PercentPerConditions,
            PercentPerLangs: pageState.PercentPerLangs,
          },
        },
      });

      //Update local storage
      authAPI.transformAuthContextIntoLocalStorageFormat({
        ...authenticationInfos,
        shop: {
          ...authenticationInfos.shop,
          shopData: {
            ...authenticationInfos.shop.shopData,
            PercentPerConditionFoils: pageState.PercentPerConditionFoils,
            PercentPerConditions: pageState.PercentPerConditions,
            PercentPerLangs: pageState.PercentPerLangs,
          },
        },
      });

      setShouldStateBeSaved(false);

      toast.success(
        <FormattedMessage
          id="settings.save.success"
          defaultMessage="Your settings have been updated."
        />
      );
    } catch (e) {
      console.log(e);

      toast.error(
        <FormattedMessage
          id="settings.save.failure"
          defaultMessage="There has been an error. Please try again later. If this problem occurs again, please mail us immediately."
        />
      );
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    saveButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className="navbar-settings">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => save(e)}
          className={"button-second-navbar " + classes.saveButton}
          size="large"
          disabled={!shouldStateBeSaved}
        >
          <FormattedMessage
            id="createMyScript.buttons.save"
            defaultMessage="Save"
          />
        </Button>
      </div>
      <div className="settings-container">
        <header>
          <h1>
            <FormattedMessage
              id="settings.title"
              defaultMessage="Manage your prices"
            />
          </h1>
          <FormattedMessage
            id="settings.subtitle.explaination"
            defaultMessage="Compared to Mint, which percentage do you want to apply following the card condition and / or language ?"
          />
        </header>
        <div>
          <div>
            <h2>
              <FormattedMessage
                id="settings.category.regular"
                defaultMessage="Regular"
              />
            </h2>
            <div>
              <Table className="settings-table regular zebra-table">
                <Thead>
                  <Tr>
                    <Th>
                      <FormattedMessage
                        id="app.generics.condition"
                        defaultMessage="Condition"
                      />
                    </Th>
                    <Th>
                      <FormattedMessage
                        id="settings.percentageToApply"
                        defaultMessage="Percentage to Apply"
                      />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.mint"
                        defaultMessage="Mint"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "1",
                            "percentPercondition"
                          )
                        }
                        value={
                          pageState.PercentPerConditions["1"]
                            .percentPercondition
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.near-mint"
                        defaultMessage="Near-Mint"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["2"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "2",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.excellent"
                        defaultMessage="Excellent"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["3"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "3",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.good"
                        defaultMessage="Good"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["4"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "4",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.light-played"
                        defaultMessage="Light-Played"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["5"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "5",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.played"
                        defaultMessage="Played"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["6"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "6",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.poor"
                        defaultMessage="Poor"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditions["7"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditions",
                            "7",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            <h2>
              <FormattedMessage
                id="settings.category.foil"
                defaultMessage="Foil"
              />
            </h2>
            <div>
              <Table className="settings-table foil zebra-table">
                <Thead>
                  <Tr>
                    <Th>
                      <FormattedMessage
                        id="app.generics.condition"
                        defaultMessage="Condition"
                      />
                    </Th>
                    <Th>
                      <FormattedMessage
                        id="settings.percentageToApply"
                        defaultMessage="Percentage to Apply"
                      />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.mint"
                        defaultMessage="Mint"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["1"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "1",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.near-mint"
                        defaultMessage="Near-Mint"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["2"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "2",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.excellent"
                        defaultMessage="Excellent"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["3"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "3",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.good"
                        defaultMessage="Good"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["4"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "4",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.light-played"
                        defaultMessage="Light-Played"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["5"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "5",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.played"
                        defaultMessage="Played"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["6"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "6",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.poor"
                        defaultMessage="Poor"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerConditionFoils["7"]
                            .percentPercondition
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerConditionFoils",
                            "7",
                            "percentPercondition"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            <h2>
              <FormattedMessage
                id="settings.languages"
                defaultMessage="Languages"
              />
            </h2>
            <div>
              <Table className="settings-table language zebra-table">
                <Thead>
                  <Tr>
                    <Th>
                      <FormattedMessage
                        id="settings.language"
                        defaultMessage="Language"
                      />
                    </Th>
                    <Th>
                      <FormattedMessage
                        id="settings.percentageToApply"
                        defaultMessage="Percentage to Apply"
                      />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.german"
                        defaultMessage="German"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["1"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "1",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.spanish"
                        defaultMessage="Spanish"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["2"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "2",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.french"
                        defaultMessage="French"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["3"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "3",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.italian"
                        defaultMessage="Italian"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["4"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "4",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.japanese"
                        defaultMessage="Japanese"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["5"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "5",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.portugueseBrazil"
                        defaultMessage="Portuguese(Brazil)"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["6"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "6",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.russian"
                        defaultMessage="Russian"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["7"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "7",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.chineseSimplified"
                        defaultMessage="Chinese Simplified"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["8"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "8",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.english"
                        defaultMessage="English"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["9"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "9",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.korean"
                        defaultMessage="Korean"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["10"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "10",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <FormattedMessage
                        id="app.generics.chineseTraditional"
                        defaultMessage="Chinese Traditional"
                      />
                    </Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                        value={
                          pageState.PercentPerLangs["11"].percentPerlanguage
                        }
                        onChange={(e) =>
                          handleChange(
                            e,
                            "PercentPerLangs",
                            "11",
                            "percentPerlanguage"
                          )
                        }
                      />
                      %
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
