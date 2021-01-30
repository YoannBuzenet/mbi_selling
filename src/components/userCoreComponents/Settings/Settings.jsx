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

  const handleChange = (event, key) => {
    let value;
    if (event.target.value === "") {
      value = "";
    } else {
      value = parseInt(event.target.value);
    }

    if (isNaN(value)) {
      value = 0;
    }

    let stateCopy = { ...authenticationInfos };
    stateCopy.sellingShopParams[key] = value;
    setShouldStateBeSaved(true);
    setAuthenticationInfos(stateCopy);
  };

  //Browe each fields to check if it's filled or empty.
  //Return false if at least one of the fields is empty.
  const checkIfAllFieldsAreFilled = () => {
    let canStateBeSaved = true;
    for (const prop in authenticationInfos.sellingShopParams) {
      if (authenticationInfos.sellingShopParams[prop] === "") {
        canStateBeSaved = false;
      }
    }
    return canStateBeSaved;
  };

  // REWRITE
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
      const shopParams = { ...authenticationInfos.sellingShopParams };

      await axios.put(
        "/api/shop_params?idShop=" + authenticationInfos.shop.id,
        shopParams
      );

      setShouldStateBeSaved(false);

      //Update local storage
      authAPI.transformAuthContextIntoLocalStorageFormat({
        ...authenticationInfos,
      });

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
                          handleChange(e, "percentPerMintRegular")
                        }
                        value={
                          authenticationInfos?.sellingShopParams
                            ?.percentPerMintRegular
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerNearMintRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerNearMintRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerExcellentRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerExcellentRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerGoodRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerGoodRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLightPlayedRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLightPlayedRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerPlayedRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerPlayedRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerPoorRegular
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerPoorRegular")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerMintFoil
                        }
                        onChange={(e) => handleChange(e, "percentPerMintFoil")}
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerNearMintFoil
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerNearMintFoil")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerExcellentFoil
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerExcellentFoil")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerGoodFoil
                        }
                        onChange={(e) => handleChange(e, "percentPerGoodFoil")}
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLightPlayedFoil
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLightPlayedFoil")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerPlayedFoil
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerPlayedFoil")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerPoorFoil
                        }
                        onChange={(e) => handleChange(e, "percentPerPoorFoil")}
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangGerman
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangGerman")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangSpanish
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangSpanish")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangFrench
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangFrench")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangItalian
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangItalian")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangJapanese
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangJapanese")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangPortuguese
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangPortuguese")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangRussian
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangRussian")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangSimplifiedChinese
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangSimplifiedChinese")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangEnglish
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangEnglish")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangKorean
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangKorean")
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
                          authenticationInfos?.sellingShopParams
                            ?.percentPerLangTraditionalChinese
                        }
                        onChange={(e) =>
                          handleChange(e, "percentPerLangTraditionalChinese")
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
