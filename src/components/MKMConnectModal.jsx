import React, { useContext, useEffect, useState } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import BlackDivContext from "../context/blackDivModalContext";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage, FormattedDate, FormattedTime } from "react-intl";

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

  const isUserConnectedToMKM =
    authenticationInfos?.shop?.ExpirationMkmToken * 1000 -
      new Date().getTime() >
    0;

  useEffect(() => {
    setTimeout(() => {
      setClassModal("MKM_modal_Connection");
    }, 100);
  }, []);

  console.log("is user connected to mkm ?", isUserConnectedToMKM);

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);

  //Loading
  const [isLoading, setIsLoading] = useState(false);

  // console.log(authenticationInfos);

  const handleClick = () => {};

  return (
    <div className={classModal} id="mkm_modal">
      {isUserConnectedToMKM && !isConnectedAnDisplayingConnectionText && (
        <>
          <p>
            Vous êtes connecté jusqu'au
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
          <p>Rafraichir de 24h</p>
        </>
      )}
      {isUserConnectedToMKM && isConnectedAnDisplayingConnectionText && (
        <p>
          <ol>
            <li>Synchro MKM</li>
            <li>Sychro MTG Interface</li>
            <li>Synchro here</li>
          </ol>
        </p>
      )}
      {!isUserConnectedToMKM && (
        <>
          <p className="notConnectedToMKMReminder">
            Vous n'êtes pas connecté à MKM.
          </p>
          <p>
            <ol>
              <li>Synchro MKM</li>
              <li>Sychro MTG Interface</li>
              <li>Synchro here</li>
            </ol>
          </p>
        </>
      )}
    </div>
  );
};

export default MKMConnectModal;
