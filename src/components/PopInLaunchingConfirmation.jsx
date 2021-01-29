import React from "react";
import { FormattedMessage } from "react-intl";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import AuthContext from "../context/authContext";

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

  return (
    <div className="launchingPopInConfirmation">
      u sure ?
      <button
        type="button"
        onClick={(e) => setPopInLaunchingScriptInformations("todo pass object")}
      ></button>
    </div>
  );
};

export default PopInLaunchingConfirmation;
