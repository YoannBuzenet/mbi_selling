import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import config from "../../services/config";
import { useIntl, FormattedMessage } from "react-intl";

const InvoiceTemplatePDF = ({ shopData, invoiceData }) => {
  // Intl hook
  const intl = useIntl();

  return <Document></Document>;
};

export default InvoiceTemplatePDF;
