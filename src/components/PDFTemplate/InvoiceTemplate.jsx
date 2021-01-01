import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import config from "../../services/config";
import { useIntl, FormattedMessage } from "react-intl";

const InvoiceTemplatePDF = ({ shopData, invoice }) => {
  // Intl hook
  const intl = useIntl();

  // Create styles
  const styles = StyleSheet.create({
    body: {
      padding: 10,
    },
    topSection: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: "100px",
    },
    leftArea: {
      backgroundColor: "red",
    },
    rightArea: {
      backgroundColor: "blue",
    },
    summarySection: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    summaryLeft: { width: "50%" },
    summaryRight: { width: "50%" },
    table: {
      width: "80%",
      margin: "auto",
      display: "table",
      marginTop: "100px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeaderProduct: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    tableColRight: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    tableColRightHeader: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderBottomColor: "#000",
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    tableColLeft: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColProduct: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: "auto",
      margin: 5,
      fontSize: 10,
      fontWeight: 500,
    },
    tableCell: {
      margin: "auto",
      margin: 5,
      fontSize: 8,
      textAlign: "center",
    },
    tableColTotalProducts: {
      width: "87.5%",
      textAlign: "right",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderTopWidth: 0,
      paddingRight: "20px",
      paddingTop: "5px",
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    tableColTotal: {
      width: "12.5%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    regularText: {
      fontSize: 10,
    },
    footer: {
      textAlign: "center",
      marginTop: "100px",
    },
  });

  return (
    <Document>
      <Page style={styles.body} size="A4">
        {/* Top div : my infos + customer info */}
        <View style={styles.topSection}>
          <View style={styles.leftArea}>
            <Text>{config.ourCompanyName}</Text>
            <Text>{config.ourCompanyAddress}</Text>
            <Text>
              {config.ourCompanyPostalCode} {config.ourCompanyTown}
            </Text>
            <Text>{config.ourWebSite}</Text>
            <Text>{config.ourCompanySIREN}</Text>
          </View>
          <View style={styles.rightArea}>
            <Text>Lui</Text>
            <Text>Nom</Text>
            <Text>Adresse</Text>
          </View>
        </View>

        {/* Summary of main info : reference invoice + date */}
        <View style={styles.summarySection}>
          <View style={styles.summaryLeft}>
            <Text>Invoice n °{invoice.idInvoice}</Text>
          </View>
          <View style={styles.summaryRight}>
            <Text>{invoice.createdAt}</Text>
          </View>
        </View>

        {/* Summary of bought products */}
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderProduct}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.products"
                  defaultMessage={`Products`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.amount"
                  defaultMessage={`Amount Tax EX.`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.vat"
                  defaultMessage={`VAT`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.quantity"
                  defaultMessage={`Quantity`}
                />
              </Text>
            </View>
            <View style={styles.tableColRightHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.total"
                  defaultMessage={`Total`}
                />
              </Text>
            </View>
          </View>
          {/* Table Body */}
          {["e"].map((card) => {
            return (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColProduct}>
                    <Text style={styles.tableCell}>{invoice.idInvoice}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {invoice.amountTaxExcluded}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{invoice.VATSum}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>1</Text>
                  </View>
                  <View style={styles.tableColRight}>
                    <Text style={styles.tableCell}>{invoice.VATSum * 1}</Text>
                  </View>
                </View>
              </>
            );
          })}

          {/* Table Bottom */}

          <View style={styles.tableRow}>
            <View style={styles.tableColTotalProducts}>
              <Text style={styles.regularText}>
                <FormattedMessage
                  id="app.invoice.PDF.table.total"
                  defaultMessage={`Total`}
                />
              </Text>
            </View>
            <View style={styles.tableColTotal}>
              <Text style={styles.tableCell}>
                {[].reduce(
                  (total, card) => total + card.quantity * card.price,
                  0
                )}
                €
              </Text>
            </View>
          </View>
        </View>

        {/* infos légales */}
        <View style={styles.footer}>
          <Text>TVA non applicable, art. 293 B du CGI</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplatePDF;
