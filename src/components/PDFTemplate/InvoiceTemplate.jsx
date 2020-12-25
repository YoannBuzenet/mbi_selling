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
    table: {
      display: "table",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginTop: "100px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
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
        {/* Facture n° + date */}
        <View></View>

        {/* Tableau produits */}
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderProduct}>
              <Text style={styles.tableColHeaderProduct}>
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
                  defaultMessage={`Amount`}
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
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.invoice.PDF.table.total"
                  defaultMessage={`Total`}
                />
              </Text>
            </View>
          </View>
        </View>
        {/* Table Body */}
        {["e"].map((card) => {
          return (
            <>
              <View style={styles.tableRow}>
                <View style={styles.tableColProduct}>
                  <Text style={styles.tableCell}>product</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>e</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>e</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>e</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>e</Text>
                </View>
              </View>
            </>
          );
        })}

        {/* Table Bottom */}

        <View style={styles.tableRow}>
          <View style={styles.tableColTotalProducts}>
            <Text style={styles.regularText}>
              {[].reduce((total, card) => total + card.quantity, 0)}{" "}
              <FormattedMessage
                id="app.shop.OneSellRequestPDF.products"
                defaultMessage={`products`}
              />
            </Text>
          </View>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {[].reduce((total, card) => total + card.quantity, 0)}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {[].reduce(
                (total, card) => total + card.quantity * card.price,
                0
              )}
              €
            </Text>
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
