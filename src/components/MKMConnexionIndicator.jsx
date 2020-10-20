import React, { useContext } from "react";
import "status-indicator/styles.css";
import AuthContext from "../context/authContext";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const MKMConnexionIndicator = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //State can be : Connected, JustConnected, SoonToUnlog, JustSoonToUnlog, Unlogged, JustUnlogged

  const mkmConnexionStateCalculator = (expirationToken) => {
    const timeStampOfNow = new Date().getTime();
    const timeLeftInMilliSeconds = expirationToken * 1000 - timeStampOfNow;

    // console.log("timeStampOfNow", timeStampOfNow);
    // console.log("expirationToken", expirationToken * 1000);
    // console.log("time left in MS", timeLeftInMilliSeconds);

    // If timestamp left more than 23h58, it means we are connected since less than 2 minutes
    if (timeLeftInMilliSeconds > 86280000) {
      return "JustConnected";
    }
    //Between 23h58 and 2 hours - normal connected
    else if (
      timeLeftInMilliSeconds <= 86280000 &&
      timeLeftInMilliSeconds > 7200000
    ) {
      return "Connected";
    }
    // Below 2 hours and 10 minutes left
    else if (
      timeLeftInMilliSeconds <= 7200000 &&
      timeLeftInMilliSeconds > 600000
    ) {
      return "SoonToUnlog";
    } else if (timeLeftInMilliSeconds <= 600000 && timeLeftInMilliSeconds > 0) {
      return "JustSoonToUnlog";
    }
    //Below 0 and above -2 minutes
    else if (timeLeftInMilliSeconds < 0 && timeLeftInMilliSeconds < -120000) {
      return "JustUnlogged";
    } else {
      return "Unlogged";
    }
  };

  const connexionStatus = mkmConnexionStateCalculator(
    authenticationInfos?.shop?.ExpirationMkmToken || 121000
  );

  //   console.log(connexionStatus);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  console.log("auth context in mkm connexion indicator", authenticationInfos);

  console.log(
    "positive",
    connexionStatus === "JustConnected" || connexionStatus === "Connected"
  );
  console.log(
    "intermediary",
    connexionStatus === "SoonToUnlog" || connexionStatus === "JustSoonToUnlog"
  );
  console.log(
    "negative",
    connexionStatus === "JustUnlogged" || connexionStatus === "Unlogged"
  );

  return (
    <div className="mkm-connexion-indicator ">
      <Button variant="outlined" color="default" className={classes.root}>
        <span className="connexion-text">
          <FormattedMessage
            id="mkmConnectionIndicator.title"
            default="MKM Connection"
          />
        </span>
        {connexionStatus === "JustConnected" && (
          <status-indicator positive active></status-indicator>
        )}
        {connexionStatus === "Connected" && (
          <status-indicator positive></status-indicator>
        )}
        {connexionStatus === "JustSoonToUnlog" && (
          <status-indicator intermediary active></status-indicator>
        )}
        {connexionStatus === "SoonToUnlog" && (
          <status-indicator intermediary></status-indicator>
        )}
        {connexionStatus === "Unlogged" && (
          <status-indicator negative></status-indicator>
        )}
        {connexionStatus === "JustUnlogged" && (
          <status-indicator negative active></status-indicator>
        )}
      </Button>
    </div>
  );
};

export default MKMConnexionIndicator;
