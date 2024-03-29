const axios = require("axios");
const utils = require("./utils");

function getCustomRuleRuleTypeDefinitions() {
  return axios
    .get("/api/customrule_ruletype_definition/getDefinitions")
    .then((resp) => resp.data);
}

function getCustomRuleRuleBehaviourDefinitions() {
  return axios
    .get("/api/customrule_behaviour_definition/getDefinitions")
    .then((resp) => resp.data);
}

function getPriceGuideDefinitions() {
  return axios
    .get("/api/priceguideDefinition/getDefinitions")
    .then((resp) => resp.data);
}
function getFormatsDefinitions() {
  return axios.get("/api/formats/getDefinitions").then((resp) =>
    resp.data.map((format) => {
      return { ...format, name: utils.capitalizeFirstLetter(format.name) };
    })
  );
}

function getMKMSets() {
  return axios.get(`${process.env.REACT_APP_MTGAPI_URL}/sets`).then((resp) => {
    const sets = resp.data["hydra:member"].filter(
      (set) =>
        set.mcmname !== null &&
        set.mcmname.match(/promo/) === null &&
        set.mcmname.match(/Promo/) === null
    );

    const sortedMCMSets = sets.sort(utils.compareBySetName);

    return sortedMCMSets;
  });
}

export default {
  getCustomRuleRuleTypeDefinitions,
  getCustomRuleRuleBehaviourDefinitions,
  getPriceGuideDefinitions,
  getFormatsDefinitions,
  getMKMSets,
};
