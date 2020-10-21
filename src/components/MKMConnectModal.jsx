import React, { useContext, useEffect, useState } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import BlackDivContext from "../context/blackDivModalContext";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage, FormattedDate, FormattedTime } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const MKMConnectModal = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [classModal, setClassModal] = useState(
    "MKM_modal_Connection transition-on"
  );

  const [
    isConnectedAnDisplayingConnectionText,
    setIsConnectedAnDisplayingConnectionText,
  ] = useState(false);

  const isUserConnectedToMKM = MKMAPI.isUserConnectedToMKM(
    authenticationInfos?.shop?.ExpirationMkmToken
  );

  useEffect(() => {
    setTimeout(() => {
      setClassModal("MKM_modal_Connection");
    }, 100);
  }, []);

  const closeWithAnimation = () => {
    document.getElementById("mkm_modal").classList.add("transition-on");
    setTimeout(() => {
      setIsMKMModalDisplayed(false);
    }, 300);
  };

  console.log("is user connected to mkm ?", isUserConnectedToMKM);

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);

  //Loading
  const [isLoading, setIsLoading] = useState(false);

  // console.log(authenticationInfos);

  const handleClick = () => {};

  const handleRefresh = (event) => {
    authAPI
      .refreshTokenAndInfos(authenticationInfos.refresh_token)
      .then((resp) => {
        if (resp.data.shop.ExpirationMkmToken > new Date().getTime() / 1000) {
          //Connection did succeed
          const authenticationInfoCopy = { ...authenticationInfos };
          authenticationInfoCopy.shop.ExpirationMkmToken =
            resp.data.shop.ExpirationMkmToken;
          setAuthenticationInfos(authenticationInfoCopy);

          toast.success(
            <FormattedMessage
              id="app.MKMConnect.toast.success"
              defaultMessage={`You logged succesfully to MCM.`}
            />
          );
          closeWithAnimation();
        } else {
          //Connection didn't succeed
          toast.error(
            <FormattedMessage
              id="app.MKMConnect.shouldConnect.toast.failure"
              defaultMessage={`Data seems to not be up to date. Please try again.`}
            />
          );
        }
      });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    logMKM: {
      backgroundColor: "rgb(232, 126, 4)",
      "&:hover": {
        backgroundColor: "#f9bf3b",
        borderColor: "#0062cc",
        boxShadow: "none",
      },
    },
    Sync: {
      marginLeft: "15px",
      backgroundColor: "rgb(0, 230, 64)",
      "&:hover": {
        backgroundColor: "#26a65b",
        borderColor: "#26a65b",
        boxShadow: "none",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classModal} id="mkm_modal">
      {isUserConnectedToMKM && !isConnectedAnDisplayingConnectionText && (
        <>
          <p>
            <FormattedMessage
              id="app.MKMConnect.connected.until"
              defaultMessage={`You are connected until `}
            />
            <FormattedDate
              value={
                new Date(authenticationInfos?.shop?.ExpirationMkmToken * 1000)
              }
              year="numeric"
              month="long"
              day="2-digit"
            />
            <FormattedTime value={new Date(1459832991883)} />
          </p>
          <Button
            variant="contained"
            className={classes.Sync}
            onClick={(e) => setIsConnectedAnDisplayingConnectionText(true)}
          >
            <FormattedMessage
              id="app.MKMConnect.connected.refresh"
              defaultMessage={`Refresh`}
            />
          </Button>
        </>
      )}
      {isUserConnectedToMKM && isConnectedAnDisplayingConnectionText && (
        <p>
          <ol>
            <li>
              <span>
                <a
                  href={
                    MKMAPI.MKM_AUTHENTICATION_URL_BASE +
                    authenticationInfos?.shop?.appToken
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained" className={classes.logMKM}>
                    <FormattedMessage
                      id="app.MKMConnect.connected.logMKM"
                      defaultMessage={`Log to MKM`}
                    />
                  </Button>
                </a>
              </span>
            </li>
            <li>
              <span>
                <FormattedMessage
                  id="app.MKMConnect.connected.logMtgInterface"
                  defaultMessage={`Log on MTG Interface`}
                />
              </span>
            </li>
            <li>
              <Button
                variant="contained"
                className={classes.Sync}
                onClick={handleRefresh}
              >
                <FormattedMessage
                  id="app.MKMConnect.connected.sync"
                  defaultMessage={`Sync !`}
                />
              </Button>
            </li>
          </ol>
        </p>
      )}
      {!isUserConnectedToMKM && (
        <>
          <p className="notConnectedToMKMReminder">
            <FormattedMessage
              id="app.MKMConnect.connected.notConnectedToMKM"
              defaultMessage={`You are not connected to MKM.`}
            />
          </p>
          <p>
            <ol>
              <li>
                <span>
                  <a
                    href={
                      MKMAPI.MKM_AUTHENTICATION_URL_BASE +
                      authenticationInfos?.shop?.appToken
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="contained" className={classes.logMKM}>
                      <FormattedMessage
                        id="app.MKMConnect.connected.logMKM"
                        defaultMessage={`Log to MKM`}
                      />
                    </Button>
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <FormattedMessage
                    id="app.MKMConnect.connected.logMtgInterface"
                    defaultMessage={`Log on MTG Interface`}
                  />
                </span>
              </li>
              <li>
                <Button
                  variant="contained"
                  className={classes.Sync}
                  onClick={handleRefresh}
                >
                  <FormattedMessage
                    id="app.MKMConnect.connected.sync"
                    defaultMessage={`Sync !`}
                  />
                </Button>
              </li>
            </ol>
          </p>
        </>
      )}
    </div>
  );
};

export default MKMConnectModal;
