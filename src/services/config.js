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
  ["en-US"]: {},
  ["fr-FR"]: {},
};

const BehaviourDictionnary = {
  ["en-US"]: {},
  ["fr-FR"]: {},
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
};
