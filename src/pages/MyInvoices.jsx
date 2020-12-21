import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import authContext from "../context/authContext";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const MyInvoices = () => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    authContext
  );

  const [listOfInvoices, setListOfInvoices] = useState([]);

  useEffect(() => {
    axios
      .get(`api/invoices/getForShop?idShop=${authenticationInfos.shop.id}`)
      .then((resp) => setListOfInvoices(resp.data))
      .catch((error) => {
        console.log("error while getting invoices", error);
        toast.error(
          <FormattedMessage
            id="app.invoicePage.getInvoices.failure"
            defaultMessage="Invoices could not be loaded. Please try later."
          />
        );
      });
  }, []);

  return <div>My Invoices</div>;
};

export default MyInvoices;
