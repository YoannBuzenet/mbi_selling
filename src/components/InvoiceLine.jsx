import React, { useContext } from "react";
import { Tr, Td } from "react-super-responsive-table";
import {
  FormattedDate,
  FormattedMessage,
  IntlProvider,
  useIntl,
} from "react-intl";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SelectAppLangContext from "../context/selectedAppLang";
import AuthContext from "../context/authContext";
import InvoiceTemplate from "../components/PDFTemplate/InvoiceTemplate";

const InvoiceLine = ({ invoice }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const intl = useIntl();

  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  return (
    <Tr>
      <Td>
        <FormattedDate
          value={invoice.createdAt.substring(0, invoice.createdAt.length - 14)}
        />
      </Td>
      <Td>
        <FormattedDate value={invoice.subscribingStartDate} />
      </Td>
      <Td>
        <FormattedDate value={invoice.subscribingEndDate} />
      </Td>
      <Td>{invoice.amountTaxIncluded}</Td>
      <Td>
        <PDFDownloadLink
          document={
            <IntlProvider
              locale={currentLang.locale}
              messages={currentLang.translationsForUsersLocale}
            >
              <InvoiceTemplate shopData={authenticationInfos.shop} />
            </IntlProvider>
          }
          fileName={"Invoice n°" + invoice.id + ".pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading
              ? ""
              : intl.formatMessage({
                  id: "app.invoicePage.InvoiceLinegeneratePDF",
                  defaultMessage: "Download PDF",
                })
          }
        </PDFDownloadLink>
      </Td>
    </Tr>
  );
};

export default InvoiceLine;
