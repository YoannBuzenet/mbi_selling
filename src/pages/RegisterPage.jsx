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
    firstName: "",
    lastName: "",
    tel: "",
    adress: "",
    postalCode: "",
    town: "",
  });

  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  console.log(currentLang);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const jsonToSend = {
        email: credentials.mail,
        pass: credentials.password,
        client: {
          nom: credentials.lastName,
          prenom: credentials.firstName,
          adress: credentials.adress,
          postalCode: credentials.postalCode,
          town: credentials.town,
          tel: credentials.tel,
          shop: "/shops/" + process.env.REACT_APP_SHOP_ID,
        },
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

          <Field
            type="text"
            id="firstName"
            name="firstName"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.firstName"
                defaultMessage={`First Name`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.firstName"
                defaultMessage={`First Name`}
              />
            }
          />

          <Field
            type="text"
            id="lastName"
            name="lastName"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.lastName"
                defaultMessage={`Last Name`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.lastName"
                defaultMessage={`Last Name`}
              />
            }
          />

          <Field
            type="tel"
            id="tel"
            name="tel"
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.telephone"
                defaultMessage={`Telephone`}
              />
            }
            required
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.telephone"
                defaultMessage={`Telephone`}
              />
            }
          />

          <label htmlFor="adress">
            <FormattedMessage
              id="app.RegisterPage.label.adress"
              defaultMessage={`Adress`}
            />
          </label>
          <textarea
            className="my-account"
            name="adress"
            id="adress"
            placeholder={intl.formatMessage({
              id: "app.RegisterPage.placeholder.adress",
              defaultMessage: `Your adress...`,
            })}
            cols="22"
            rows="3"
            required
            onChange={(event) => handleChange(event)}
          ></textarea>

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
                defaultMessage={`Postal Code`}
              />
            }
          />

          <Field
            name="town"
            type="text"
            id="town"
            required
            placeholder={
              <FormattedMessage
                id="app.RegisterPage.placeholder.town"
                defaultMessage={`Town`}
              />
            }
            onChange={(event) => handleChange(event)}
            label={
              <FormattedMessage
                id="app.RegisterPage.label.town"
                defaultMessage={`Town`}
              />
            }
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
