import React, { useState, useContext } from "react";
import authAPI from "../services/authAPI";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import LoginLogOutContext from "../context/logAutoRenewOrLogout";
import config from "../services/config";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const LoginPage = ({ history, eraseAuthContext, renewJWTToken }) => {
  const { setAuthenticationInfos } = useContext(AuthContext);
  //Timers control for auto login renew or auto logout
  const { timers, setTimers } = useContext(LoginLogOutContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // console.log(eraseAuthContext);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userData = await authAPI.authenticate(credentials);
      // console.log(userData);
      setAuthenticationInfos(userData);
      setIsLoading(false);
      toast.success(
        <FormattedMessage
          id="app.LoginPage.toast.success"
          defaultMessage={`You are connected.`}
        />
      );

      clearTimeout(timers.autoRenew);
      clearTimeout(timers.autoLogOut);

      setTimers({
        autoRenew: setTimeout(renewJWTToken, config.TIME_JWT_RENEW),
        autoLogOut: setTimeout(eraseAuthContext, config.TIME_TO_LOG_OUT),
      });

      if (userData.user.roles.includes("ROLE_SHOP")) {
        history.replace("/shopadmin/sell_requests");
      } else {
        history.goBack();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      //PARSE THE ERROR BEFORE SETTING IT
      console.log(error);
      setIsLoading(false);
      toast.error(
        <FormattedMessage
          id="app.LoginPage.toast.failure"
          defaultMessage={`Login or password incorrect. Please try again.`}
        />
      );
    }
  };

  return (
    <>
      <div className="login-page">
        <div>
          <h1>
            <FormattedMessage
              id="app.LoginPage.title"
              defaultMessage={`Connect`}
            />
          </h1>

          <form action="" onSubmit={handleSubmit} className="login-form">
            <Field
              name="email"
              label={
                <FormattedMessage
                  id="app.LoginPage.label.email"
                  defaultMessage={`Mail Adress`}
                />
              }
              value={credentials.username}
              onChange={handleChange}
              placeholder={
                <FormattedMessage
                  id="app.LoginPage.placeholder.email"
                  defaultMessage={`Mail`}
                />
              }
              className="form-group"
              required
            />

            <Field
              name="password"
              type="password"
              label={
                <FormattedMessage
                  id="app.LoginPage.label.password"
                  defaultMessage={`Password`}
                />
              }
              value={credentials.password}
              onChange={handleChange}
              placeholder={
                <FormattedMessage
                  id="app.LoginPage.placeholder.password"
                  defaultMessage={`Password...`}
                />
              }
              error=""
              required
            />
            <div className="form-group">
              {isLoading && (
                <div className="RegisterLoader">
                  <CSSLoaderWaitingSpiral />
                </div>
              )}
              {!isLoading && (
                <button type="submit" className="connecting-button">
                  <FormattedMessage
                    id="app.LoginPage.button.connect"
                    defaultMessage={`Connect`}
                  />
                </button>
              )}
            </div>
          </form>
          <div className="forgotten-password">
            <Link to="/usermail/reset">
              <div>
                <span>
                  <FormattedMessage
                    id="app.LoginPage.forgottePassword"
                    defaultMessage={`Forgot your password ?`}
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
