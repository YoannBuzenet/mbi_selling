import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/authContext";
import { withRouter } from "react-router-dom";
import AuthAPI from "../services/authAPI";
import { toast } from "react-toastify";

const LoggedShopRouteComponent = ({ path, component }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const hasTheRightToLog = AuthAPI.setup();

  if (!hasTheRightToLog) {
    setAuthenticationInfos({
      ...authenticationInfos,
      isAuthenticated: false,
      user: { ...authenticationInfos.user, roles: [] },
    });
    toast.error("Vous n'êtes plus connecté. Merci de vous reconnecter.", {
      toastId: 13,
    });
  }

  component = withRouter(component);

  return authenticationInfos.user.roles.includes("ROLE_SHOP") ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default LoggedShopRouteComponent;
