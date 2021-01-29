import React from "react";
import { FormattedMessage } from "react-intl";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AuthContext from "../context/authContext";

const PopInLaunchingConfirmation = () => {
  const { setIsPopInDisplayed } = useContext(PopInLaunchingConfirmationContext);
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  return (
    <div className="launchingPopInConfirmation">
      u sure ?
      <button
        type="button"
        onClick={(e) => setIsPopInDisplayed(false)}
      ></button>
    </div>
  );
};

export default PopInLaunchingConfirmation;
