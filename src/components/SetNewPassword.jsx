import React, { useEffect, useState } from "react";
import Field from "./forms/Field";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { toast } from "react-toastify";

const SetNewPassword = ({ match, history }) => {
  const [userInfos, setUserInfos] = useState({
    password: "",
    passwordCheck: "",
    mail: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://www.google.com/recaptcha/api.js?render=" +
      process.env.REACT_APP_CLIENTSIDE_RECAPTCHA_KEY;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const checkCaptcha = (e) => {
    e.preventDefault();
    if (match?.params?.challenge && match?.params?.challenge?.length > 0) {
      /*eslint-disable */
      grecaptcha.ready(function () {
        grecaptcha
          .execute(process.env.REACT_APP_CLIENTSIDE_RECAPTCHA_KEY, {
            action: "form_submission",
          })
          .then(function (token) {
            // console.log(token);
            //Adding token to state
            userInfos["token"] = token;
            userInfos["challenge"] = match.params?.challenge;
            axios
              .post("/api/usermail/setNewPassword", userInfos)
              .then((respServer) =>
                toast.success(
                  <FormattedMessage
                    id="app.setNewPassword.success"
                    defaultMessage={`Your password has been updated.`}
                  />
                )
              )
              .catch((error) =>
                toast.error(
                  <FormattedMessage
                    id="app.setNewPassword.failSubmit.serverError"
                    defaultMessage={`There has been an error. Please try again later.`}
                  />
                )
              );
          });
      });
      /*eslint-enable */
    } else {
      toast.error(
        <FormattedMessage
          id="app.setNewPassword.failSubmit.challengeMissing"
          defaultMessage={`There has been an error. Please try again from the link in your email.`}
        />
      );
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "passwordToSet": {
        setUserInfos({ ...userInfos, password: value });
        break;
      }
      case "passwordToCheck": {
        setUserInfos({ ...userInfos, passwordCheck: value });
        break;
      }
      case "mail": {
        setUserInfos({ ...userInfos, mail: value });
        break;
      }
    }
  };

  return (
    <>
      <h1>
        <FormattedMessage
          id="app.setNewPassword.title"
          defaultMessage={`Set your new password`}
        />
      </h1>

      <form
        className="login-form reset-password-form"
        onSubmit={(e) => {
          if (userInfos.password === userInfos.passwordCheck) {
            checkCaptcha(e);
          } else {
            e.preventDefault();
            toast.error(
              <FormattedMessage
                id="app.setNewPassword.failure.passwordDontMatch"
                defaultMessage={`Passwords don't match. Please try again.`}
              />
            );
            return;
          }
        }}
      >
        <Field
          name="mail"
          label={
            <FormattedMessage
              id="app.setNewPassword.mailLabel"
              defaultMessage={`Please type your mail adress`}
            />
          }
          value={userInfos.mail}
          onChange={handleChange}
          placeholder={
            <FormattedMessage
              id="app.setNewPassword.mailPlaceholder"
              defaultMessage={`Your mail`}
            />
          }
          className="form-group"
          type="email"
          required
        />
        <Field
          name="passwordToSet"
          label={
            <FormattedMessage
              id="app.setNewPassword.firstLabel"
              defaultMessage={`Please type your new password`}
            />
          }
          value={userInfos.password}
          onChange={handleChange}
          placeholder={
            <FormattedMessage
              id="app.setNewPassword.firstPlaceholder"
              defaultMessage={`Your new password`}
            />
          }
          className="form-group"
          type="password"
          required
        />

        <Field
          name="passwordToCheck"
          label={
            <FormattedMessage
              id="app.setNewPassword.SecondLabel"
              defaultMessage={`Type the same password`}
            />
          }
          value={userInfos.passwordCheck}
          onChange={handleChange}
          placeholder={
            <FormattedMessage
              id="app.setNewPassword.secondPlaceholder"
              defaultMessage={`Type the same password`}
            />
          }
          className="form-group"
          type="password"
          required
        />
        {!isLoading && (
          <button type="submit" className="connecting-button">
            <FormattedMessage
              id="app.setNewPassword.button.submit"
              defaultMessage={`Set new password`}
            />
          </button>
        )}
      </form>
    </>
  );
};

export default SetNewPassword;
