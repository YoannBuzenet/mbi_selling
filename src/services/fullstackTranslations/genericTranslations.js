const French = require("../../translations/French.json");
const English = require("../../translations/English.json");

const BehaviourDictionnary = {
  ["en-US"]: {
    roundUp5percents: "Increase 5%",
    roundUp10percents: "Increase 10%",
    roundUp15percents: "Increase 15%",
    roundUp20percents: "Increase 20%",
    roundUp30percents: "Increase 30%",
    roundUp50percents: "Increase 50%",
    roundDown5percents: "Decrease 5%",
    roundDown10percents: "Decrease 10%",
    roundDown15percents: "Decrease 15%",
    roundDown20percents: "Decrease 20%",
    roundDown30percents: "Decrease 30%",
    roundDown50percents: "Decrease 50%",
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
    roundUp5percents: "Augmenter de 5%",
    roundUp10percents: "Augmenter de 10%",
    roundUp15percents: "Augmenter de 15%",
    roundUp20percents: "Augmenter de 20%",
    roundUp30percents: "Augmenter de 30%",
    roundUp50percents: "Augmenter de 50%",
    roundDown5percents: "Baisser de 5%",
    roundDown10percents: "Baisser de 10%",
    roundDown15percents: "Baisser de 15%",
    roundDown20percents: "Baisser de 20%",
    roundDown30percents: "Baisser de 30%",
    roundDown50percents: "Baisser de 50%",
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

const algoDictionnary = {
  ["en-US"]: {
    AvgSellPrice: "Average Selling Price",
    lowPrice: "Regular Low Price",
    trendPrice: "Trend Price",
    germanProLow: "German Pro Low",
    suggestedPrice: "MKM Suggested Price",
    foilSell: "Foil Selling Price",
    foilLow: "Foil Low",
    foilTrend: "Foil trend Price",
    lowPriceEx: "Foil Low Ex",
    avg1: "Average Price 1 day",
    avg7: "Average Price 7 days",
    avg30: "Average Price 30 days",
    foilAvg1: "Foil Average Price 1 day",
    foilAvg7: "Foil Average Price 7 days",
    foilAvg30: "Foil Average Price 30 days",
  },
  ["fr-FR"]: {
    AvgSellPrice: "Prix de vente moyen",
    lowPrice: "Prix bas",
    trendPrice: "Prix Tendance",
    germanProLow: "Prix bas Allemand Pro",
    suggestedPrice: "Prix suggéré par MKM",
    foilSell: "Prix de vente Foil",
    foilLow: "Prix bas Foil",
    foilTrend: "Tendance Foil",
    lowPriceEx: "Prix bas Regular Exc",
    avg1: "Prix de vente moyen sur 1 jour",
    avg7: "Prix de vente moyen sur 7 jours",
    avg30: "Prix de vente moyen sur 30 jours",
    foilAvg1: "Prix de vente Foil moyen sur 1 jour",
    foilAvg7: "Prix de vente Foil moyen sur 7 jours",
    foilAvg30: "Prix de vente Foil moyen sur 30 jours",
  },
};

const ruleTypesDictionnary = {
  ["en-US"]: {
    setValue: "Set Value",
    operationsApplying: "Apply an operation",
    exclude: "Exclude",
  },
  ["fr-FR"]: {
    setValue: "Prix fixé",
    operationsApplying: "Appliquer une opération",
    exclude: "Exclure",
  },
};

const pdfStructure = {
  pdfTitle: {
    ["en-US"]: "Script n° ",
    ["fr-FR"]: "Script n° ",
  },
  page: {
    ["en-US"]: "Page ",
    ["fr-FR"]: "Page ",
  },
  testProcedure: {
    ["en-US"]: "Test procedure",
    ["fr-FR"]: "Procédure de test",
  },
  hasPriceBasedOn: {
    ["en-US"]: "Prices based on",
    ["fr-FR"]: "Prix basés sur",
  },
  MKMTrends: {
    ["en-US"]: "MKM Trends",
    ["fr-FR"]: "Tendances MKM",
  },
  oldPrices: {
    ["en-US"]: "Current shop prices",
    ["fr-FR"]: "Prix boutique actuels",
  },
  hasPriceBasedOnMKMTrends: {
    ["en-US"]: "Prices based on : MKM Trends",
    ["fr-FR"]: "Prix basés sur : Tendances MKM",
  },
  hasPriceBasedOnOldPrices: {
    ["en-US"]: "Prices based on : Current shop prices",
    ["fr-FR"]: "Prix basés sur :  Prix boutique actuels",
  },
  keywordTitle: {
    ["en-US"]: "Keywords used ",
    "fr-FR": "Mot clefs utilisés ",
  },
  keywordBehaviourTitle: {
    ["en-US"]: "Keyword use ",
    "fr-FR": "Utilisation des mots clefs ",
  },
  keywordBehaviour: {
    targetsSpecifically: {
      ["en-US"]: "Targets specifically",
      "fr-FR": "Cible uniquement",
    },
    avoidsSpecifically: {
      ["en-US"]: "Avoids specifically",
      "fr-FR": "Evite ces mots clefs",
    },
    ignoresEverything: {
      ["en-US"]: "Ignore if here or not",
      "fr-FR": "Ignore si le mot clef est présent ou non",
    },
  },
  reference: {
    ["en-US"]: "Reference ",
    ["fr-FR"]: "Référence ",
  },
  date: {
    ["en-US"]: "Date ",
    ["fr-FR"]: "Date ",
  },
  usedFormats: {
    ["en-US"]: "Affected formats",
    ["fr-FR"]: "Formats concernés",
  },
  targetedFormatsNone: {
    ["en-US"]: "None in particular",
    ["fr-FR"]: "Aucun en particulier",
  },
  rarityUsed: {
    ["en-US"]: "Rarity targeted",
    ["fr-FR"]: "Raretés ciblées",
  },
  mythic: {
    ["en-US"]: "Mythic",
    ["fr-FR"]: "Mythique",
  },
  rare: {
    ["en-US"]: "Rare",
    ["fr-FR"]: "Rare",
  },
  uncommon: {
    ["en-US"]: "Uncommon",
    ["fr-FR"]: "Peu Commune",
  },
  common: {
    ["en-US"]: "Common",
    ["fr-FR"]: "Commune",
  },
  targetedExpansions: {
    ["en-US"]: "Targeted Expansions",
    ["fr-FR"]: "Editions visées",
  },
  targetedExpansionsNone: {
    ["en-US"]: "None in particular",
    ["fr-FR"]: "Aucune en particulier",
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
  noRegularRules: {
    ["en-US"]: "No rules were planned for Regular cards.",
    ["fr-FR"]: "Il n'y a pas de règles pour les cartes Regular.",
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
    ["en-US"]: "Action",
    ["fr-FR"]: "Action",
  },
  basedOn: {
    ["en-US"]: "Based on",
    ["fr-FR"]: "Basé sur",
  },
  foilCards: {
    ["en-US"]: "Foil cards",
    ["fr-FR"]: "Cartes Foil",
  },
  noFoilRules: {
    ["en-US"]: "No rules were planned for Foil cards.",
    ["fr-FR"]: "Il n'y a pas de règles pour les cartes Foils.",
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
  german: { ["en-US"]: "German", ["fr-FR"]: "Allemand" },
  spanish: { ["en-US"]: "Spanish", ["fr-FR"]: "Espagnol" },
  french: { ["en-US"]: "French", ["fr-FR"]: "Français" },
  italian: { ["en-US"]: "Italian", ["fr-FR"]: "Italien" },
  japanese: { ["en-US"]: "Japanese", ["fr-FR"]: "Japonais" },
  portuguese: { ["en-US"]: "Portuguese", ["fr-FR"]: "Portugais" },
  russian: { ["en-US"]: "Russian", ["fr-FR"]: "Russe" },
  simplifiedChinese: { ["en-US"]: "S. Chinese", ["fr-FR"]: "Chinois S." },
  english: { ["en-US"]: "English", ["fr-FR"]: "Anglais" },
  korean: { ["en-US"]: "Korean", ["fr-FR"]: "Coréen" },
  traditionalChinese: { ["en-US"]: "T. Chinese", ["fr-FR"]: "Chinois T." },

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
    ["en-US"]: "Foil Trend",
    ["fr-FR"]: "Tendance Foil",
  },
  yes: {
    ["en-US"]: "Yes",
    ["fr-FR"]: "Oui",
  },
  no: { ["en-US"]: "No", ["fr-FR"]: "Non" },
};

const translatedMessagesWithLocaleKey = {
  "en-US": English,
  "fr-FR": French,
};

const langIDLocaleDictionnary = {
  3: "fr-FR",
  9: "en-US",
};

const localeLangIDDictionnary = {
  "fr-FR": 3,
  "en-US": 9,
};

const premadeScriptTitles = {
  createPreMadeScripts10PercentsFoilStandard: {
    "en-US": "-10% on Foil Standard cards for cards above 20 euros",
    "fr-FR": "-10% sur les cartes Foil Standard au dessus de 20 euros",
  },
  createPreMadeScriptsIncrease10PercentsFoilStandard: {
    "en-US": "+10% on Foil Standard cards for cards above 20 euros",
    "fr-FR": "+10% sur les cartes Foil Standard au dessus de 20 euros",
  },
  createPreMadeScripts10PercentsUPONMKMALLStandard: {
    "en-US":
      "+10% higher than MKM Trend on all standard, and minimum selling price 50 cents",
    "fr-FR":
      "+10% par rapport à la tendance MKM sur le standard, et prix minimum 50 centimes",
  },
  createPreMadeScriptsMinus5PercentOnKeywordsCards: {
    "en-US": "-5% on all the cards with a MKM comment 'Demo Update'",
    "fr-FR": "-5% sur toutes les cartes avec le commentaire MKM 'Demo update'",
  },
  createPreMadeScriptsMinus5PercentOnModernAbove30euros: {
    "en-US": "-5% on Modern for all cards above 30 euros",
    "fr-FR": "-5% sur toutes les cartes du Modern au dessus de 30 euros",
  },
  createPreMadeScriptsIncrease5PercentOnModernAbove30euros: {
    "en-US": "+5% on Modern for all cards above 30 euros",
    "fr-FR": "+5% sur toutes les cartes du Modern au dessus de 30 euros",
  },
  customRulesPlus10percentsBeyondToDeathBetween50centsAnd20euros: {
    "en-US":
      "+10% above Trend on Theros Beyond To Death for cards between 50 cents and 20 euros",
    "fr-FR":
      "+10% par rapport à la trend sur Theros Beyond To Death pour les cartes entre 50 centimes et 20 euros",
  },
  customRulesDecrease10PercentsOnBTD: {
    "en-US":
      "-10% on current price Theros Beyond To Death for cards between 50 cents and 20 euros",
    "fr-FR":
      "-10% par rapport à nos prix actuels sur Theros Beyond To Death pour les cartes entre 50 centimes et 20 euros",
  },
};

module.exports = {
  BehaviourDictionnary,
  ruleTypesDictionnary,
  pdfStructure,
  translatedMessagesWithLocaleKey,
  langIDLocaleDictionnary,
  localeLangIDDictionnary,
  premadeScriptTitles,
  algoDictionnary,
};
