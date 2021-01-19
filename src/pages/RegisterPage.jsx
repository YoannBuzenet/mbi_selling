import React, { useState, useContext } from "react";
import userAPI from "../services/userAPI";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import config from "../services/config";
import CSSLoaderWaitingSpiral from "../components/loaders/CSSLoaderWaitingSpiral";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import mailAPI from "../services/mailAPI";
import SelectAppLangContext from "../context/selectedAppLang";
import LoginLogOutContext from "../context/logAutoRenewOrLogout";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";

//TODO : ADD CAPTCHA ON REGISTER THROUGH EXPRESS

const RegisterPage = ({
  history,
  renewJWTToken,
  eraseAuthContext,
  launchcheckStatusTimer,
}) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Timers control for auto login renew or auto logout
  const { timers, setTimers } = useContext(LoginLogOutContext);

  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
    passwordCheck: "",
  });

  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Checking the 2 password do match : if not, error & return
    if (credentials.password !== credentials.passwordCheck) {
      toast.error(
        <FormattedMessage
          id="app.RegisterPage.accountCreation.passwordCheck.failure"
          defaultMessage={`Password don't match. Please type them again.`}
        />
      );
      return;
    }

    setIsLoading(true);

    const languageInLocalStorage = window.localStorage.getItem("appLang");

    try {
      const jsonToSend = {
        email: credentials.mail,
        password: credentials.password,
        legalName: credentials.legalName,
        addressStreet: credentials.addressStreet,
        postalCode: credentials.postalCode,
        town: credentials.town,
        vat: credentials.vat,
        languageUsed: languageInLocalStorage ? languageInLocalStorage : null,
      };
      //Sending the register demand, sending a welcome email if registering was successful
      const serverResponse = await userAPI.register(jsonToSend);
      try {
        await mailAPI.sendMail({
          mailRequest: {
            action: "welcomeEmail",
            user: serverResponse,
            langID: currentLang.langID,
          },
        });
      } catch (e) {
        console.log("Mail couln't be sent, but registration happened.");
      }

      toast.success(
        <FormattedMessage
          id="app.RegisterPage.accountCreation.toast.success"
          defaultMessage={`Your account has been created.`}
        />
      );

      // console.log(jsonToSend);
      setIsLoading(false);

      //Getting user back to the top page
      window.scrollTo(0, 0);

      /////////////////////////
      // TRYING TO LOG USER AFTER REGISTER
      /////////////////////////

      const userData = await authAPI.authenticate(jsonToSend);
      // console.log(userData);
      setAuthenticationInfos(userData);
      setIsLoading(false);

      clearTimeout(timers.autoRenew);
      clearTimeout(timers.autoLogOut);

      setTimers({
        autoRenew: setTimeout(renewJWTToken, config.TIME_JWT_RENEW),
        autoLogOut: setTimeout(eraseAuthContext, config.TIME_TO_LOG_OUT),
      });

      //launch the check status setInterval that will poke API
      launchcheckStatusTimer();

      if (userData.user.roles.includes("ROLE_SHOP")) {
        history.replace("/my-scripts");
      } else {
        history.goBack();
      }
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        // console.log(error.response.data["hydra:description"]);
        if (
          error.response.data["hydra:description"] ===
          "email: This value is already used."
        ) {
          toast.error(
            <FormattedMessage
              id="app.RegisterPage.accountCreation.mailAlreadyTaken.toast.failure"
              defaultMessage={`This email is already taken. Please choose another one.`}
            />
          );
        } else {
          console.log(error.response.data);
          toast.error(
            <FormattedMessage
              id="app.RegisterPage.accountCreation.toast.failure"
              defaultMessage={`An error has occured. Please try again.`}
            />
          );
        }
      }
    }
  };

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  //Hook Intl to translate an attribute
  const intl = useIntl();

  return (
    <>
      <div className="container my-account">
        <h1 className="front-title">
          <FormattedMessage
            id="app.RegisterPage.title"
            defaultMessage={`Register`}
          />
        </h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Field
            name="mail"
            type="email"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.mail"
                defaultMessage={`Mail Adress...`}
              />
            }
            id="mail"
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.mail"
                defaultMessage={`Email`}
              />
            }
          />

          <Field
            name="password"
            type="password"
            id="password"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.password"
                defaultMessage={`Your Password`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.password"
                defaultMessage={`Password`}
              />
            }
            minlength={6}
          />

          <Field
            name="passwordCheck"
            type="password"
            id="passwordCheck"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.passwordCheck"
                defaultMessage={`Please type your password again`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.passwordCheck"
                defaultMessage={`Password Verification`}
              />
            }
            minlength={6}
          />

          <Field
            name="legalName"
            type="text"
            id="legalName"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.legalName"
                defaultMessage={`Company Name, or Business Owner Name`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.legalName"
                defaultMessage={`Company Name, or Business Owner Name`}
              />
            }
          />

          <Field
            name="addressStreet"
            type="text"
            id="addressStreet"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.addressStreet"
                defaultMessage={`Address`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.address"
                defaultMessage={`Address`}
              />
            }
            minlength={6}
          />
          <Field
            name="postalCode"
            type="text"
            id="postalCode"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.postalCode"
                defaultMessage={`Postal Code`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.postalCode"
                defaultMessage={`Password Verification`}
              />
            }
            minlength={3}
          />

          <Field
            name="town"
            type="text"
            id="town"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.town"
                defaultMessage={`Town`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.town"
                defaultMessage={`Town`}
              />
            }
            minlength={6}
          />

          <Field
            name="vat"
            type="text"
            id="vat"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.VAT"
                defaultMessage={`VAT (if applicable)`}
              />
            }
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.VAT"
                defaultMessage={`VAT (if applicable)`}
              />
            }
            minlength={6}
          />

          {isLoading && (
            <div className="RegisterLoader">
              <CSSLoaderWaitingSpiral />
            </div>
          )}
          {!isLoading && (
            <button type="submit" className="connecting-button">
              <FormattedMessage
                id="app.RegisterPage.button.register"
                defaultMessage={`Create Account`}
              />
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
