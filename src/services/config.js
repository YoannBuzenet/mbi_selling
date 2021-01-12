// import English from "../translations/English.json";
// import French from "../translations/French.json";

const French = require("../translations/French.json");
const English = require("../translations/English.json");

//DEFINED LANGUAGE ID
const langDefinition = {
  1: "German",
  2: "Spanish",
  3: "French",
  4: "Italian",
  5: "Japanese",
  6: "Portuguese",
  7: "Russian",
  8: "Simplified Chinese",
  9: "English",
  10: "Korean",
  11: "Traditional Chinese",
};

const conditionDefinition = {
  1: "Mint",
  2: "Near Mint",
  3: "Excellent",
  4: "Good",
  5: "Light Played",
  6: "Played",
  7: "Poor",
};

//TIME TO AUTO LOG OUT
//30 minutes
const TIME_TO_LOG_OUT = 30 * 60 * 1000;

//JWT TOKEN AUTO RENEW
//55 minutes
const TIME_JWT_RENEW = 55 * 60 * 1000;

//Clear setTimeout - Throttling time between autologOut timer refresh
//4 minutes
const TIME_THROTTLE = 240000;

//COOKIE - LAST MODIFIED CARDS
//30 minutes
const TIME_TO_EXPIRE_LAST_MODIFICATION = 30 * 60 * 1000;

//COOKIE - SET LIST
//2 days
const TIME_TO_EXPIRE_SET_LIST = 1000 * 60 * 60 * 24 * 2;

//flag size : 25*13px

//Icon size ADD/REMOVE from basket
const iconSizeMobile = 40;
const iconSizeDesktop = 20;

// TRANSLATIONS AVAILABLE
const websiteDefaultLanguageArrayLangAvailables = [
  {
    locale: "fr-FR",
    translationsForUsersLocale: French,
    picture: "FR",
    langID: 3,
  },
  {
    locale: "en-US",
    translationsForUsersLocale: English,
    picture: "EN",
    langID: 9,
  },
];

//Defaults Percent Selling Price Per Condition
const defaultSellingPercents = {
  1: 1,
  2: 0.9,
  3: 0.8,
  4: 0.7,
  5: 0.6,
  6: 0.5,
  7: 0.4,
};

const mkmPriceGuideDictionnary = {
  ["en-US"]: {
    AvgSellPrice: "Average Selling Price",
    lowPrice: "Low Price",
    trendPrice: "Trend Price",
    germanProLow: "German Professional Seller Lowest Price",
    suggestedPrice: "MKM Suggested Price",
    foilSell: "Average Selling Price Foil",
    foilLow: "Low Selling Price Foil",
    foilTrend: "Foil Trend Price",
    lowPriceEx: "Low Price Exc",
    avg1: "Average Regular Selling Price the last day",
    avg7: "Average Regular Selling Price the last week",
    avg30: "Average Regular Selling Price the last month",
    foilAvg1: "Average Foil Selling Price the last day",
    foilAvg7: "Average Foil Selling Price the last week",
    foilAvg30: "Average Foil Selling Price the last month",
  },
  ["fr-FR"]: {
    AvgSellPrice: "Prix de vente moyen",
    lowPrice: "Prix le plus bas",
    trendPrice: "Prix Tendance",
    germanProLow: "Prix Vendeur Pro Allemand le plus bas",
    suggestedPrice: "Prix suggéré MKM",
    foilSell: "Prix de vente moyen Foil",
    foilLow: "Prix de vente bas Foil",
    foilTrend: "Prix Tendance Foil",
    lowPriceEx: "Prix bas Exc",
    avg1: "Prix de vente Regular moyen de la veille",
    avg7: "Prix de vente Regular moyen de la semaine",
    avg30: "Prix de vente Regular moyen du mois",
    foilAvg1: "Prix de vente Foil moyen de la veille",
    foilAvg7: "Prix de vente Foil moyen de la semaine",
    foilAvg30: "Prix de vente Foil moyen du mois",
  },
};

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
    operationsApplying: "Create an operation",
    exclude: "Exclude",
  },
  ["fr-FR"]: {
    setValue: "Prix fixé",
    operationsApplying: "Créer opération",
    exclude: "Exclure",
  },
};

const ourCompanyName = "MTG Interface";
const ourCompanyAddress = "9, Rue Place Foch";
const ourCompanyPostalCode = "56700";
const ourCompanyTown = "Hennebont";
const ourCompanyCountry = "France";
const ourWebSite = "mtginterface.com";
const ourCompanySIREN = "804 965 101 00038";

export default {
  langDefinition,
  TIME_TO_LOG_OUT,
  TIME_JWT_RENEW,
  TIME_THROTTLE,
  TIME_TO_EXPIRE_LAST_MODIFICATION,
  TIME_TO_EXPIRE_SET_LIST,
  websiteDefaultLanguageArrayLangAvailables,
  iconSizeMobile,
  iconSizeDesktop,
  defaultSellingPercents,
  conditionDefinition,
  mkmPriceGuideDictionnary,
  BehaviourDictionnary,
  ruleTypesDictionnary,
  ourCompanyName,
  ourCompanyAddress,
  ourCompanyPostalCode,
  ourCompanyTown,
  ourCompanySIREN,
  ourCompanyCountry,
  ourWebSite,
};
