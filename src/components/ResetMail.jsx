/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import LangContext from "../context/selectedAppLang";
import Field from "./forms/Field";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { toast } from "react-toastify";

const ResetMail = () => {
  const [userInfos, setUserInfos] = useState({ mail: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { currentLang } = useContext(LangContext);

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
    grecaptcha.ready(function () {
      grecaptcha
        .execute(process.env.REACT_APP_CLIENTSIDE_RECAPTCHA_KEY, {
          action: "form_submission",
        })
        .then(function (token) {
          // console.log(token);
          //Adding token to state
          userInfos["token"] = token;
          userInfos["langID"] = currentLang.langID;
          axios
            .post("/api/usermail/reset", userInfos)
            .then((respServer) =>
              toast.success(
                <FormattedMessage
                  id="app.ResetMail.success"
                  defaultMessage={`An email has been sent to your mailbox.`}
                />
              )
            )
            .catch((error) =>
              toast.error(
                <FormattedMessage
                  id="app.ResetMail.failure"
                  defaultMessage={`There has been error. Please try again later.`}
                />
              )
            );
        });
    });
  };

  const handleChange = (e) => {
    setUserInfos({ mail: e.target.value });
  };

  return (
    <div className="reset-password">
      <h1>
        <FormattedMessage
          id="app.ResetMail.title"
          defaultMessage={`Forgot your password ?`}
        />
      </h1>
      <form
        className="login-form reset-password-form"
        onSubmit={(e) => checkCaptcha(e)}
      >
        <Field
          name="emailToReset"
          label={
            <FormattedMessage
              id="app.ResetMail.label.email"
              defaultMessage={`Please indicate your mail :`}
            />
          }
          value={userInfos.mail}
          onChange={handleChange}
          placeholder={
            <FormattedMessage
              id="app.LoginPage.placeholder.email"
              defaultMessage={`Mail`}
            />
          }
          className="form-group"
          type="email"
          required
        />
        {!isLoading && (
          <button type="submit" className="connecting-button">
            <FormattedMessage
              id="app.ResetMail.button.submit"
              defaultMessage={`Send me an email to reset my password`}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetMail;
