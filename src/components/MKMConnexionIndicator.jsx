import React, { useContext } from "react";
import "status-indicator/styles.css";
import AuthContext from "../context/authContext";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MKMAPI from "../services/MKMAPI";

const MKMConnexionIndicator = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const connexionStatus = MKMAPI.mkmConnexionStateCalculator(
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
