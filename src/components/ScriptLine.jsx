import React, { useState, useContext, useEffect } from "react";
import { Tr, Td } from "react-super-responsive-table";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AllDefinitionsContext from "../context/definitionsContext";
import AuthContext from "../context/authContext";
import MKMModalContext from "../context/mkmModalConnectionContext";
import transparentDivContext from "../context/transparentDivContext";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AppLangContext from "../context/selectedAppLang";
import axios from "axios";
import { toast } from "react-toastify";
import authAPI from "../services/authAPI";
import { FormattedMessage, useIntl } from "react-intl";
import { isMobile } from "react-device-detect";
import MKMAPI from "../services/MKMAPI";
import subscribeAPI from "../services/subscribeAPI";
import ScriptStatusCalculator from "./ScriptStatutCalculator";

const ScriptLine = ({ script, history, index }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log("auth context from scriptline", authenticationInfos);

  const { allDefinitions } = useContext(AllDefinitionsContext);

  const { setPopInLaunchingScriptInformations } = useContext(
    PopInLaunchingConfirmationContext
  );

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKMModalContext);

  //App Lang
  const { currentLang } = useContext(AppLangContext);

  //Transparent Div Context
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(transparentDivContext);

  const WAIT_INTERVAL = 2000;

  const [timer, setTimer] = useState(null);

  const [selectedFormats, setSelectedFormats] = useState(
    script.formats.map((format) => format.id)
  );

  const [savingState, setSavingState] = useState(null);

  const indexScript = authenticationInfos.userScripts.findIndex(
    (contextScript) => script.id == contextScript.id
  );

  const handleChangeSelect = (event) => {
    setSavingState("saving");
    setTimer(clearTimeout(timer));

    let idFormat = parseInt(event.target.value[0]);

    console.log("id format", idFormat);

    //Creating an immediate copy that will be available before the state has been updated
    let copySelectedFormatsUpToDate;

    //Copy of current auth context to take in back in case
    let copyAuthContext = { ...authenticationInfos };

    //ajouter ou retirer dans selectedFormats
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

    //sync data
    let authCopy = { ...authenticationInfos };
    authCopy.userScripts[index].formats = selectedFormats.map((IDformat) =>
      allDefinitions.allFormats.find(
        (definitionFormat) => definitionFormat.id === IDformat
      )
    );
    setAuthenticationInfos(authCopy);

    setTimer(
      setTimeout(() => {
        console.log("fonction 2");
        console.log("api saving", index);
        axios
          .patch(
            "/api/script/" +
              script.id +
              "?idUser=" +
              authenticationInfos.user.id,
            {
              formats: copySelectedFormatsUpToDate,
            }
          )
          .then((resp) => {
            console.log(resp);
            console.log("2");
            authAPI.transformAuthContextIntoLocalStorageFormat(
              authenticationInfos
            );
            setSavingState("saved");
            setTimeout(() => {
              setSavingState(null);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setAuthenticationInfos(copyAuthContext);
            toast.error("Probleme dans la save A TRADUIRE");
          });
      }, WAIT_INTERVAL)
    );
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

  const launchScript = () => {
    if (!subscribeAPI.isUserSubscribed(authenticationInfos.isSusbcribedUntil)) {
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

    // number of formats check : more than 0 mandatory
    // this check is done in real & test script in ScriptLine and Create My Script
    if (selectedFormats.length === 0) {
      toast.error(
        <FormattedMessage
          id="scriptline.select.formats.mustHaveOneAtLeast"
          defaultMessage="Your script must at least target one format."
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

    // Passing all relevant data to confirmation pop in through Context
    setPopInLaunchingScriptInformations({
      isDisplayed: true,
      formats: selectedFormats,
      isTest: false,
      locale: currentLang.locale,
    });
  };

  const launchTest = () => {
    if (!subscribeAPI.isUserSubscribed(authenticationInfos.isSusbcribedUntil)) {
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

    // number of formats check : more than 0 mandatory
    // this check is done in real & test script in ScriptLine and Create My Script
    if (selectedFormats.length === 0) {
      toast.error(
        <FormattedMessage
          id="scriptline.select.formats.mustHaveOneAtLeast"
          defaultMessage="Your script must at least target one format."
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

    const payload = {
      formats: selectedFormats,
      isTest: true,
      locale: currentLang.locale,
    };

    // Launching the test script request
    axios
      .post(
        `/api/scriptExecution?idShop=${authenticationInfos.shop.id}&idScript=${script.id}`,
        payload
      )
      .then((resp) => {
        toast.success(
          <FormattedMessage
            id="createMyScript.launchTest.success"
            defaultMessage="The test script has been launched. Once it's done, you will receive a summary by mail."
          />
        );

        //Updating auth context with isRunning Info to 1
        const authContextCopy = { ...authenticationInfos };
        authContextCopy.userScripts[indexScript].isRunning = 1;
        setAuthenticationInfos(authContextCopy);
      })
      .catch((error) =>
        toast.error(
          <FormattedMessage
            id="createMyScript.launchTest.failure"
            defaultMessage="The test script could not be launched. Please try later, or contact us if the problem persists."
          />
        )
      );
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
    seeButton: {
      backgroundColor: "rgb(149, 165, 166)",
      "&:hover": {
        background: "rgb(103, 128, 159)",
      },
      width: "82px",
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

  /* ****************** */
  /* ***TRANSLATIONS*** */
  /* ****************** */
  const intl = useIntl();

  const formatSelectTitle = intl.formatMessage({
    id: "scriptline.select.formats.title",
    defaultMessage: "Formats",
  });

  return (
    <Tr>
      <Td className="all-my-scripts-link-to-script">
        <Link to={"/edit-script/" + script.id}>{script.name}</Link>
      </Td>
      <Td className={isMobile && "marginHeight20px"}>
        <Button
          variant="contained"
          color="primary"
          className={classes.seeButton}
          size="large"
          onClick={(e) => history.push("/edit-script/" + script.id)}
        >
          <FormattedMessage id="scriptLine.buttons.see" defaultMessage="See" />
        </Button>
      </Td>
      <Td className={isMobile && "marginHeight20px"}>
        <Button
          variant="contained"
          color="primary"
          className={classes.testButton}
          size="large"
          onClick={launchTest}
          disabled={script.isRunning === 1}
        >
          <FormattedMessage
            id="scriptLine.buttons.test"
            defaultMessage="Test"
          />
        </Button>
      </Td>
      <Td className={isMobile && "marginHeight20px"}>
        <Button
          variant="contained"
          color="primary"
          className={classes.launchButton}
          size="large"
          onClick={launchScript}
          disabled={script.isRunning === 1}
        >
          <FormattedMessage
            id="scriptLine.buttons.launch"
            defaultMessage="Launch"
          />
        </Button>
      </Td>
      <Td>
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
                <ListItemText primary={format.name} className="format-select" />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Td>
      <Td className={isMobile && "marginHeight20px"}>
        <ScriptStatusCalculator
          isScriptRunning={script.isRunning}
          savingState={savingState}
        />
      </Td>
    </Tr>
  );
};

export default ScriptLine;
