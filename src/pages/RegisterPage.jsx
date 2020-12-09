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

//TODO : ADD CAPTCHA ON REGISTER THROUGH EXPRESS

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
  });

  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const jsonToSend = {
        email: credentials.mail,
        password: credentials.password,
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

      history.replace("/");
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
        <h1>
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
