import React, { useContext, useState } from "react";
import MKMAPI from "../services/MKMAPI";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import BlackDivContext from "../context/blackDivModalContext";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage } from "react-intl";

const MKMConnectModal = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);
  //Black Div Control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //Loading
  const [isLoading, setIsLoading] = useState(false);

  // console.log(authenticationInfos);

  const handleClick = () => {
    //Get info back from API to update MKM info on session to be able to do MKM API calls
    authAPI
      .refreshTokenAndInfos(authenticationInfos.refresh_token)
      .then((data) => {
        //TO DO Checker si la date de réception en session est VALIDE
        console.log(data);

        //Expiration token is in second, Date.getTime is in millisecond. We divide the latter to be able to compare them.
        if (data.data.shop.ExpirationMkmToken > new Date().getTime() / 1000) {
          const authenticationInfoCopy = { ...authenticationInfos };

          authenticationInfoCopy.shop.accesToken = "updated";
          authenticationInfoCopy.shop.accesSecret = "updated";
          authenticationInfoCopy.shop.dateReceptionMKMToken = "updated";
          authenticationInfoCopy.shop.ExpirationMkmToken =
            data.data.shop.ExpirationMkmToken;

          setAuthenticationInfos(authenticationInfoCopy);
          setIsMKMModalDisplayed("deactivated");
          setIsBlackDivModalDisplayed("deactivated");
          setIsLoading(false);

          toast.success(
            <FormattedMessage
              id="app.shop.MKMConnect.toast.success"
              defaultMessage={`You logged succesfully to MCM.`}
            />
          );
        } else {
          setIsLoading(false);

          toast.error(
            <FormattedMessage
              id="app.shop.MKMConnect.shouldConnect.toast.failure"
              defaultMessage={`Data seems to not be up to date. Please try again.`}
            />
          );
        }
      })
      .catch((err) => {
        toast.error(
          <FormattedMessage
            id="app.shop.MKMConnect.toast.failure"
            defaultMessage={`Error. Please try again.`}
          />
        );
        setIsLoading(false);
        return console.log(err);
      });
    setIsLoading(false);
  };

  return (
    <div className="MKM-connection-modal">
      <div>
        <div className="mkm-modal-container">
          <h2>
            <FormattedMessage
              id="app.shop.MKMConnect.title"
              defaultMessage={`Connect to Magic Card Market`}
            />
          </h2>
          <div className="MKM-rule">
            <span className="styled-ol-number">1.</span>
            <p>
              <FormattedMessage
                id="app.shop.MKMConnect.stepConnect"
                defaultMessage={`Login on Magic Card Market website`}
              />
            </p>
          </div>
          <p className="mkm_link_auth">
            <a
              href={
                MKMAPI.MKM_AUTHENTICATION_URL_BASE +
                authenticationInfos.shop.appToken
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              &#8594;
              <FormattedMessage
                id="app.shop.MKMConnect.stepConnectClick"
                defaultMessage={`Click Here`}
              />
              &#8592;
            </a>
          </p>
          <div className="MKM-rule">
            <span className="styled-ol-number">2.</span>
            <p>
              <FormattedMessage
                id="app.shop.MKMConnect.stepMTGI"
                defaultMessage={`Once Authentication completed, you will be redirected to www.mtgInterface.com. Please login there too.`}
              />
            </p>
          </div>
          <div className="MKM-rule">
            <span className="styled-ol-number">3.</span>
            <p>
              <FormattedMessage
                id="app.shop.MKMConnect.stepSynchronize"
                defaultMessage={`Once you have the confirmation message on www.mtgInterface.com, you can sync data.`}
              />
            </p>
          </div>
          <div
            className="syncronization-button"
            onClick={(event) => {
              handleClick(event);
              return setIsLoading(true);
            }}
          >
            {isLoading && (
              <span className="CSS-Loader-MKM">
                <CSSLoaderWaitingSpiral />
              </span>
            )}
            {!isLoading && (
              <>
                <span className="sync-symbol">&#8634;</span>
                <span className="button-content">
                  <FormattedMessage
                    id="app.shop.MKMConnect.stepSynchronizeButton"
                    defaultMessage={`Sync`}
                  />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MKMConnectModal;
