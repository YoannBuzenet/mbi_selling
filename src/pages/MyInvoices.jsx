import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import authContext from "../context/authContext";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import InvoiceLine from "../components/InvoiceLine";
import userAPI from "../services/userAPI";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  //Hook Intl to translate an attribute
  const intl = useIntl();

  /* ************************ */
  /* ***** TRANSLATIONS ***** */
  /* ************************ */

  const translatedSubscribe = intl.formatMessage({
    id: "app.invoicePage.invoice.subscribeCTA",
    defaultMessage: "Subscribe",
  });

  return (
    <div className="container all-my-invoices">
      <h2>
        <FormattedMessage
          id="app.invoicePage.title"
          defaultMessage="Invoices"
        />
      </h2>
      {authenticationInfos &&
        userAPI.hasGivenMandatoryInformationForInvoices(
          authenticationInfos
        ) && (
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
                  <Th>PDF</Th>
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
        )}
      {/* If user has no invoices */}
      {authenticationInfos &&
        userAPI.hasGivenMandatoryInformationForInvoices(authenticationInfos) &&
        listOfInvoices.length === 0 && (
          <>
            <p>
              <FormattedMessage
                id="app.invoicePage.invoice.noInvoiceYet"
                defaultMessage="You have no invoice at the time. You can subscribe anytime !"
              />
            </p>
            <div className={classes.root}>
              <Link to="/subscribe">
                <Button variant="contained" color="primary" size="large">
                  {translatedSubscribe}
                </Button>
              </Link>
            </div>
          </>
        )}
      {/* If user sid not fill his mandatory info for invoice creation */}
      {authenticationInfos &&
        !userAPI.hasGivenMandatoryInformationForInvoices(
          authenticationInfos
        ) && <p>Merci de remplir tous les infos CONNARD</p>}
    </div>
  );
};

export default MyInvoices;
