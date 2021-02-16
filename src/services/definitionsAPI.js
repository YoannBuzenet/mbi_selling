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
  return axios.get("/api/formats/getDefinitions").then((resp) => resp.data);
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

function getFormatsAndReturnHashtable() {
  // console.log("is this function being called ?");
  return axios
    .get("/api/formats/getDefinitions")
    .then((resp) => {
      // console.log("formats def resp", resp);
      let hashmapToreturn = {};
      for (let i = 0; i < resp.data.length; i++) {
        hashmapToreturn[resp.data[i].id] = utils.capitalizeFirstLetter(
          resp.data[i].name
        );
      }
      // console.log("hashtable to return", hashmapToreturn);
      return hashmapToreturn;
    })
    .catch((err) =>
      console.log("error when trying to access formats from this api", err)
    );
}

module.exports = {
  getCustomRuleRuleTypeDefinitions,
  getCustomRuleRuleBehaviourDefinitions,
  getPriceGuideDefinitions,
  getFormatsDefinitions,
  getFormatsAndReturnHashtable,
  getMKMSets,
};
