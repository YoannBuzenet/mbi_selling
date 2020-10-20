import React, { useContext } from "react";
import "status-indicator/styles.css";
import AuthContext from "../context/authContext";
import { FormattedMessage } from "react-intl";

const MKMConnexionIndicator = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log("auth context in mkm connexion indicator", authenticationInfos);

  return (
    <span>
      MKM Connection
      <status-indicator positive pulse></status-indicator>
    </span>
  );
};

export default MKMConnexionIndicator;
