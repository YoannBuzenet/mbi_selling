import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import authContext from "../context/authContext";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import InvoiceLine from "../components/InvoiceLine";

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
              <Th>
                <FormattedMessage
                  id="app.invoicePage.invoice.thead.creationDate"
                  defaultMessage="Created On"
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.invoicePage.invoice.thead.beginningDate"
                  defaultMessage="Starts on"
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.invoicePage.invoice.thead.endingDate"
                  defaultMessage="Ends On"
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="app.invoicePage.invoice.thead.amount"
                  defaultMessage="Amount"
                />
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {listOfInvoices.map((invoice, index) => {
              return (
                <>
                  <InvoiceLine invoice={invoice} />
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
