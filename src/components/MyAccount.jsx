import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import userAPI from "../services/userAPI";
import AuthAPI from "../services/authAPI";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const MyAccount = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );
  //TODO - mettre un loader pour le traitement de requete

  const [timer, setTimer] = useState(null);

  const APIupdate = async (authCopy) => {
    try {
      const response = await userAPI.update(authenticationInfos.user.id, {
        client: {
          id: authCopy.customer.id,
          prenom: authCopy.customer.prenom,
          nom: authCopy.customer.nom,
          tel: authCopy.customer.tel,
          adress: authCopy.customer.adress,
          postalCode: authCopy.customer.postalCode,
          town: authCopy.customer.town,
        },
      });

      //Preparing data format to save, to copy what's stored in local storage
      const currentDataInLocalStorage = AuthAPI.userInfos();
      const newDataInLocalStorage = {
        token: currentDataInLocalStorage.token,
        refresh_token: currentDataInLocalStorage.refresh_token,
        user: {
          ...authenticationInfos.user,
        },
        client: {
          id: response.data.client.id,
          prenom: response.data.client.prenom,
          nom: response.data.client.nom,
          tel: response.data.client.tel,
          adress: response.data.client.adress,
          postalCode: response.data.client.postalCode,
          town: response.data.client.town,
          SellRequests: response.data.client.SellRequests,
          shop: {
            ...authenticationInfos.shop,
          },
        },
        //
        shop: {
          id: "",
          legalName: "",
          SIRET: "",
          vatNumber: "",
          tel: "",
          email: "",
          adress: "",
          postalCode: "",
          town: "",
        },
      };
      AuthAPI.updateUserInfosLocalStorage(newDataInLocalStorage);

      toast.success(
        <FormattedMessage
          id="app.myAccountPage.edition.success"
          defaultMessage={`Your account has been updated.`}
        />
      );
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(
        <FormattedMessage
          id="app.myAccountPage.edition.failure"
          defaultMessage={`Your account couldn't be updated. Please try again.`}
        />
      );
    }
  };

  const handleChange = (event) => {
    setTimer(clearTimeout(timer));
    // console.log("change");

    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    const authCopy = { ...authenticationInfos };
    authCopy.customer[name] = value;

    setAuthenticationInfos({
      ...authenticationInfos,
      customer: { ...authenticationInfos.customer, [name]: value },
    });

    setTimer(setTimeout(() => APIupdate(authCopy), 1500));
  };

  return (
    <>
      <div className="container my-account">
        <h1>
          <FormattedMessage
            id="app.myAccountPage.title"
            defaultMessage={`My Account`}
          />
        </h1>
        <p>
          <FormattedMessage
            id="app.myAccountPage.myEmail"
            defaultMessage={`Email : `}
          />
          <span> {authenticationInfos.user.email}</span>
        </p>
        <form>
          <label htmlFor="prenom">
            <FormattedMessage
              id="app.myAccountPage.FirstName"
              defaultMessage={`First Name`}
            />
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.prenom}
          />

          <label htmlFor="nom">
            <FormattedMessage
              id="app.myAccountPage.LastName"
              defaultMessage={`Last Name`}
            />
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.nom}
          />

          <label htmlFor="tel">
            <FormattedMessage
              id="app.myAccountPage.Telephone"
              defaultMessage={`Telephone`}
            />
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.tel}
          />

          <label htmlFor="adress">
            <FormattedMessage
              id="app.myAccountPage.adress"
              defaultMessage={`Adress`}
            />
          </label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.adress}
          ></textarea>

          <label htmlFor="postalCode">
            <FormattedMessage
              id="app.myAccountPage.postalCode"
              defaultMessage={`Postal Code`}
            />
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.postalCode}
          />

          <label htmlFor="town">
            <FormattedMessage
              id="app.myAccountPage.town"
              defaultMessage={`Town`}
            />
          </label>
          <input
            type="text"
            id="town"
            name="town"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.town}
          />
        </form>
      </div>
    </>
  );
};

export default MyAccount;
