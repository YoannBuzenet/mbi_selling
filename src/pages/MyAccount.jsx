import React, { useContext } from "react";
import authContext from "../context/authContext";
import axios from "axios";
import { FormattedMessage } from "react-intl";

const MyAccountPage = () => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    authContext
  );
  return <>My Account</>;
};

export default MyAccountPage;
