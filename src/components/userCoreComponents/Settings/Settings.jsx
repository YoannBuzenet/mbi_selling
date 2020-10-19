import React, { useState, useContext } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TextField from "@material-ui/core/TextField";
import AuthContext from "../../../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [shouldStateBeSaved, setShouldStateBeSaved] = useState(false);

  const [pageState, setPageState] = useState({
    PercentPerConditionFoils: {
      ...authenticationInfos.shop.shopData.PercentPerConditionFoils,
    },
    PercentPerConditions: {
      ...authenticationInfos.shop.shopData.PercentPerConditions,
    },
    PercentPerLangs: { ...authenticationInfos.shop.shopData.PercentPerLangs },
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

  const save = async () => {
    //TODO
    //Check if a param is empty, if yes, display error and return

    console.log(
      "on save, si ça marche on MAJ le contexte + disable le bouton, sinon message derreur et on laisse le bouton"
    );

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

      //set en auth context

      //set en local storage

      setShouldStateBeSaved(false);

      toast.success("ok bro");
    } catch (e) {
      console.log(e);
      toast.error("shit bro");
    }
  };

  console.log(pageState);

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
          <h1>Manage your prices</h1>
          Quelle décôte voulez-vous appliquer en fonction des différents états
          des cartes et de leur langue ?
        </header>
        <div>
          <div>
            <h2>REGULAR</h2>
            <div>
              <Table className="settings-table regular zebra-table">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
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
                    <Td>Near-Mint</Td>
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
                    <Td>Excellent</Td>
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
                    <Td>Good</Td>
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
                    <Td>Light-Played</Td>
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
                    <Td>Played</Td>
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
                    <Td>Poor</Td>
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
            <h2>FOIL</h2>
            <div>
              <Table className="settings-table foil zebra-table">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
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
                    <Td>Near-Mint</Td>
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
                    <Td>Excellent</Td>
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
                    <Td>Good</Td>
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
                    <Td>Light-Played</Td>
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
                    <Td>Played</Td>
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
                    <Td>Poor</Td>
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
            <h2>LANGUE</h2>
            <div>
              <Table className="settings-table language zebra-table">
                <Thead>
                  <Tr>
                    <Th>Language</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>German</Td>
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
                    <Td>Spanish</Td>
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
                    <Td>French</Td>
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
                    <Td>Italian</Td>
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
                    <Td>Japanese</Td>
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
                    <Td>Portuguese(Brazil)</Td>
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
                    <Td>Russian</Td>
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
                    <Td>Chinese Simplified</Td>
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
                    <Td>English</Td>
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
                    <Td>Korean</Td>
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
                    <Td>Chinese Traditional</Td>
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
