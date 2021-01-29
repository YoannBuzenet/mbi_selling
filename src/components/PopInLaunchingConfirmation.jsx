import React from "react";
import { FormattedMessage } from "react-intl";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AuthContext from "../context/authContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const PopInLaunchingConfirmation = () => {
  const {
    popInLaunchingScriptInformations,
    setPopInLaunchingScriptInformations,
  } = useContext(PopInLaunchingConfirmationContext);
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const launchScript = async () => {
    console.log("launching script...");

    const payload = {
      formats: popInLaunchingScriptInformations.formats,
      isTest: popInLaunchingScriptInformations.isTest,
      locale: popInLaunchingScriptInformations.locale,
    };
    // Launching the Real script request
    axios
      .post(
        `/api/scriptExecution?idShop=${authenticationInfos.shop.id}&idScript=${idScript}`,
        payload
      )
      .then((resp) => {
        toast.success(
          <FormattedMessage
            id="createMyScript.launchReal.success"
            defaultMessage="The MKM script has been launched. Once it's done, you will receive a summary by mail."
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
            id="createMyScript.launchReal.failure"
            defaultMessage="The MKM script could not be launched. Please try later, or contact us if the problem persists."
          />
        )
      );
  };

  const useStyles = makeStyles((theme) => ({
    confirmButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
    },
    cancelButton: {
      backgroundColor: "rgb(247, 202, 24)",
      "&:hover": {
        background: "rgb(250, 216, 89)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="launchingPopInConfirmation">
      u sure ?
      <Button
        variant="contained"
        color="primary"
        className={classes.confirmButton}
        size="large"
        onClick={(e) => console.log("launching script then closing window")}
      >
        <FormattedMessage
          id="app.popIn.confirmationLaunching.button.launch"
          defaultMessage="Launch"
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.cancelButton}
        size="large"
        onClick={(e) =>
          setPopInLaunchingScriptInformations({ isDisplayed: false })
        }
      >
        <FormattedMessage
          id="app.popIn.confirmationLaunching.button.cancel"
          defaultMessage="Cancel"
        />
      </Button>
    </div>
  );
};

export default PopInLaunchingConfirmation;
