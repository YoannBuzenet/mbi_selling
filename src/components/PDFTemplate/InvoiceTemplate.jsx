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
    },
    leftArea: {
      backgroundColor: "red",
    },
    rightArea: {
      backgroundColor: "blue",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeader: {
      width: "11.11%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "11.11%",
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
    tableColTotalProducts: {
      width: "77.77%",
    },
  });

  return (
    <Document>
      <Page style={styles.body} size="A4">
        {/* Top div : my infos + customer info */}
        <View style={styles.topSection}>
          <View style={styles.leftArea}>
            <Text>Nom</Text>
            <Text>SIRET</Text>
            <Text>Adresse</Text>
            <Text>Site Internet</Text>
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
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.card"
                  defaultMessage={`Card`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.set"
                  defaultMessage={`Set`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.language"
                  defaultMessage={`Language`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.condition"
                  defaultMessage={`Condition`}
                />
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                <FormattedMessage
                  id="app.shop.OneSellRequestPDF.foil"
                  defaultMessage={`Foil`}
                />
              </Text>
            </View>
          </View>
        </View>
        {/* Table Body */}
        {[].map((card) => {
          return (
            <>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{card.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{card.set}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {config.langDefinition[card.lang]}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {config.conditionDefinition[parseInt(card.condition)]}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {card.isFoil ? "Yes" : "No"}
                  </Text>
                </View>
              </View>
            </>
          );
        })}

        {/* infos légales */}
        <View>
          <Text>TVA non applicable, art. 293 B du CGI</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceTemplatePDF;
