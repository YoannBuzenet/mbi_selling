const BehaviourDictionnary = {
  ["en-US"]: {
    roundUp5percents: "Round Up 5%",
    roundUp10percents: "Round Up 10%",
    roundUp15percents: "Round Up 15%",
    roundUp20percents: "Round Up 20%",
    roundUp30percents: "Round Up 30%",
    roundUp50percents: "Round Up 50%",
    roundDown5percents: "Round Down 5%",
    roundDown10percents: "Round Down 10%",
    roundDown15percents: "Round Down 15%",
    roundDown20percents: "Round Down 20%",
    roundDown30percents: "Round Down 30%",
    roundDown50percents: "Round Down 50%",
    ["roundUp0.5"]: "Round Up 50 cents",
    roundUp1: "Round Up 1 euro",
    roundUp2: "Round Up 2 euros",
    roundUp5: "Round Up 5 euros",
    roundUp10: "Round Up 10 euros",
    roundUp15: "Round Up 15 euros",
    roundUp20: "Round Up 20 euros",
    roundUp50: "Round Up 50 euros",
    roundUp100: "Round Up 100 euros",
    ["roundDown0.5"]: "Round Down 50 cents",
    roundDown1: "Round Down 1 euro",
    roundDown2: "Round Down 2 euros",
    roundDown5: "Round Down 5 euros",
    roundDown10: "Round Down 10 euros",
    roundDown15: "Round Down 15 euros",
    roundDown20: "Round Down 20 euros",
    roundDown50: "Round Down 50 euros",
    roundDown100: "Round Down 100 euros",
  },
  ["fr-FR"]: {
    roundUp5percents: "Arrondir à la hausse de 5%",
    roundUp10percents: "Arrondir à la hausse de 10%",
    roundUp15percents: "Arrondir à la hausse de 15%",
    roundUp20percents: "Arrondir à la hausse de 20%",
    roundUp30percents: "Arrondir à la hausse de 30%",
    roundUp50percents: "Arrondir à la hausse de 50%",
    roundDown5percents: "Arrondir à la baisse de 5%",
    roundDown10percents: "Arrondir à la baisse de 10%",
    roundDown15percents: "Arrondir à la baisse de 15%",
    roundDown20percents: "Arrondir à la baisse de 20%",
    roundDown30percents: "Arrondir à la baisse de 30%",
    roundDown50percents: "Arrondir à la baisse de 50%",
    ["roundUp0.5"]: "Arrondir à la hausse de 50 centimes",
    roundUp1: "Arrondir à l'euro du dessus",
    roundUp2: "Arrondir à 2 euros au dessus",
    roundUp5: "Arrondir à 5 euros au dessus",
    roundUp10: "Arrondir à 10 euros au dessus",
    roundUp15: "Arrondir à 15 euros au dessus",
    roundUp20: "Arrondir à 20 euros au dessus",
    roundUp50: "Arrondir à 50 euros au dessus",
    roundUp100: "Arrondir à 100 euros au dessus",
    ["roundDown0.5"]: "Arrondir à 50 centimes en dessous",
    roundDown1: "Arrondir à l'euro en dessous",
    roundDown2: "Arrondir à 2 euros en dessous",
    roundDown5: "Arrondir à 5 euros en dessous",
    roundDown10: "Arrondir à 10 euros en dessous",
    roundDown15: "Arrondir à 15 euros en dessous",
    roundDown20: "Arrondir à 20 euros en dessous",
    roundDown50: "Arrondir à 50 euros en dessous",
    roundDown100: "Arrondir à 100 euros en dessous",
  },
};

const ruleTypesDictionnary = {
  ["en-US"]: {
    setValue: "Set Value",
    basedOnMKM: "Based on MKM",
    exclude: "Exclude",
  },
  ["fr-FR"]: {
    setValue: "Prix fixé",
    basedOnMKM: "Se baser sur MKM",
    exclude: "Exclure",
  },
};

const pdfStructure = {
  pdfTitle: {
    ["en-US"]: "Script n°",
    ["fr-FR"]: "Script n°",
  },
  page: {
    ["en-US"]: "Page",
    ["fr-FR"]: "Page",
  },
  testProcedure: {
    ["en-US"]: "Test procedure",
    ["fr-FR"]: "Procédure de test",
  },
  reference: {
    ["en-US"]: "Reference",
    ["fr-FR"]: "Référence",
  },
  usedFormats: {
    ["en-US"]: "Affected formats : ",
    ["fr-FR"]: "Formats concernés : ",
  },
  cardsConcernedByScript: {
    ["en-US"]: "Cards affected by the script",
    ["fr-FR"]: "Cartes concernées par le script ",
  },
  summary: {
    ["en-US"]: "Summary",
    ["fr-FR"]: "Récapitulatif",
  },
  cardsSetAtHigherPrice: {
    ["en-US"]: "Prices changed upwards",
    ["fr-FR"]: "Cartes modifiées à la hausse",
  },
  cardsSetAtLowerPrice: {
    ["en-US"]: "Prices modified downwards",
    ["fr-FR"]: "Cartes modifiées à la baisse",
  },
  cardsBlockedByPriceShield: {
    ["en-US"]: "Cards blocked by PriceShield",
    ["fr-FR"]: "Cartes bloquées par le PriceShield",
  },
  cardsExcluded: {
    ["en-US"]: "Cards excluded by the script",
    ["fr-FR"]: "Cartes exclues par le script",
  },
  summaryOfUsedRules: {
    ["en-US"]: "Summary of the rules used",
    ["fr-FR"]: "Récapitulatif des règles utilisées",
  },
  regularCards: {
    ["en-US"]: "Regular Cards",
    ["fr-FR"]: "Cartes Regular",
  },
  from: {
    ["en-US"]: "From",
    ["fr-FR"]: "De",
  },
  to: {
    ["en-US"]: "To",
    ["fr-FR"]: "A",
  },
  action: {
    ["en-US"]: "Action",
    ["fr-FR"]: "Action",
  },
  valueSet: {
    ["en-US"]: "Value Set",
    ["fr-FR"]: "Prix fixé",
  },
  mkmAction: {
    ["en-US"]: "Action on MKM Price",
    ["fr-FR"]: "Action sur prix MKM",
  },
  basedOn: {
    ["en-US"]: "Based on",
    ["fr-FR"]: "Basé sur",
  },
  foilCards: {
    ["en-US"]: "Foil cards",
    ["fr-FR"]: "Cartes Foil",
  },
  parameters: {
    ["en-US"]: "Parameters",
    ["fr-FR"]: "Paramètres",
  },
  percentPerConditionRegular: {
    ["en-US"]: "Coefficient by Condition - Regular Cards",
    ["fr-FR"]: "Coefficient par état - Cartes Regular",
  },
  percentPerConditionFoil: {
    ["en-US"]: "Coefficient by Condition - Foil Cards",
    ["fr-FR"]: "Coefficient par état - Cartes Foils",
  },
  percentPerLanguage: {
    ["en-US"]: "Coefficient by Language",
    ["fr-FR"]: "Coefficient par Langue",
  },
  cardName: {
    ["en-US"]: "Card Name",
    ["fr-FR"]: "Nom",
  },
  foil: {
    ["en-US"]: "Foil",
    ["fr-FR"]: "Foil",
  },
  condition: {
    ["en-US"]: "Condition",
    ["fr-FR"]: "État",
  },
  language: {
    ["en-US"]: "Language",
    ["fr-FR"]: "Langue",
  },
  oldPrice: {
    ["en-US"]: "Old Price",
    ["fr-FR"]: "Ancien prix",
  },
  newPrice: {
    ["en-US"]: "New Price",
    ["fr-FR"]: "Nouveau prix",
  },
  priceTrend: {
    ["en-US"]: "Price Trend",
    ["fr-FR"]: "Prix Tendance",
  },
  foilPriceTrend: {
    ["en-US"]: "Foil Price Trend",
    ["fr-FR"]: "Prix Tendance Foil",
  },
};

module.exports = {
  BehaviourDictionnary,
  ruleTypesDictionnary,
  pdfStructure,
};
