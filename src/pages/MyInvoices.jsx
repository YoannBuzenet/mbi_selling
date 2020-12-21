import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import authContext from "../context/authContext";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";

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

  return (
    <div className="container all-my-invoices">
      <h2>
        <FormattedMessage
          id="app.invoicePage.title"
          defaultMessage="Invoices"
        />
      </h2>
      <div>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th>
                <FormattedMessage
                  id="app.invoicePage.invoice.thead.name"
                  defaultMessage="Invoice"
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {listOfInvoices.map((invoice, index) => {
              return (
                <>
                  <p>Invoice</p>
                </>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyInvoices;
