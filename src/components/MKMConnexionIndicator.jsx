import React, { useContext } from "react";
import "status-indicator/styles.css";
import AuthContext from "../context/authContext";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import TransparentDivContext from "../context/transparentDivContext";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MKMAPI from "../services/MKMAPI";
import MKMConnectModal from "./MKMConnectModal";

const MKMConnexionIndicator = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Transparent Div Context
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(TransparentDivContext);

  const connexionStatus = MKMAPI.mkmConnexionStateCalculator(
    authenticationInfos?.shop?.ExpirationMkmToken
  );

  console.log(
    "duration of mkm token",
    authenticationInfos?.shop?.ExpirationMkmToken
  );

  console.log("now", new Date());

  //MKM Modal Control
  const { isMKMModalDisplayed, setIsMKMModalDisplayed } = useContext(
    MKM_ModalContext
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
      <Button
        variant="outlined"
        color="default"
        className={classes.root}
        onClick={(e) => {
          if (document.getElementById("mkm_modal")) {
            document.getElementById("mkm_modal").classList.add("transition-on");
            setTimeout(() => {
              setIsMKMModalDisplayed(false);
            }, 300);
          } else {
            setIsMKMModalDisplayed(true);
            setIsTransparentDivDisplayed(true);
          }
        }}
      >
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
      {isMKMModalDisplayed && <MKMConnectModal />}
    </div>
  );
};

export default MKMConnexionIndicator;
