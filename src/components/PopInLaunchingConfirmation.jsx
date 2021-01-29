import React from "react";
import { FormattedMessage } from "react-intl";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AuthContext from "../context/authContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const PopInLaunchingConfirmation = () => {
  const { setPopInLaunchingScriptInformations } = useContext(
    PopInLaunchingConfirmationContext
  );
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const launchScript = () => {
    console.log("launching script...");
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
