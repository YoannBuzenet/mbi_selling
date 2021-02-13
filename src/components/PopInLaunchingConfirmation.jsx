import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AuthContext from "../context/authContext";
import BlackDivContext from "../context/blackDivModalContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { toast } from "react-toastify";

const PopInLaunchingConfirmation = () => {
  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //Pop in
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
        `/api/scriptExecution?idShop=${authenticationInfos.shop.id}&idScript=${popInLaunchingScriptInformations.idScript}`,
        payload
      )
      .then((resp) => {
        toast.success(
          <FormattedMessage
            id="createMyScript.launchReal.success"
            defaultMessage="The MKM script has been launched. Once it's done, you will receive a summary by mail."
          />,
          { autoClose: 10000 }
        );

        //Updating auth context with isRunning Info to 1
        const authContextCopy = { ...authenticationInfos };
        authContextCopy.userScripts[
          popInLaunchingScriptInformations.indexScript
        ].isRunning = 1;
        setAuthenticationInfos(authContextCopy);
        setPopInLaunchingScriptInformations({ isDisplayed: false });
        setIsBlackDivModalDisplayed("deactivated");
      })
      .catch((error) =>
        toast.error(
          <FormattedMessage
            id="createMyScript.launchReal.failure"
            defaultMessage="The MKM script could not be launched. Please try later, or contact us if the problem persists."
          />,
          { autoClose: 10000 }
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
      <h3>
        <FormattedMessage
          id="app.popIn.confirmationLaunching"
          defaultMessage="Launch Script ?"
        />
      </h3>
      <p className="explainationScript">
        <FormattedMessage
          id="app.popIn.confirmationLaunching.explaination"
          defaultMessage="Your script will be launched. Process needs between few minutes and some hours, depending on the size of your stock, and the number of people using the website. You will receive an email at the end of the process."
        />
      </p>
      <div className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          className={classes.confirmButton}
          size="large"
          onClick={launchScript}
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
          onClick={(e) => {
            setPopInLaunchingScriptInformations({ isDisplayed: false });
            setIsBlackDivModalDisplayed("deactivated");
          }}
        >
          <FormattedMessage
            id="app.popIn.confirmationLaunching.button.cancel"
            defaultMessage="Cancel"
          />
        </Button>
      </div>
    </div>
  );
};

export default PopInLaunchingConfirmation;
