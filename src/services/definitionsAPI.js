const axios = require("axios");
const utils = require("./utils");

function getCustomRuleRuleTypeDefinitions() {
  return axios
    .get(
      process.env.REACT_APP_THIS_WEBSITE_URL +
        "/api/customrule_ruletype_definition/getDefinitions"
    )
    .then((resp) => resp.data);
}

function getCustomRuleRuleBehaviourDefinitions() {
  return axios
    .get(
      process.env.REACT_APP_THIS_WEBSITE_URL +
        "/api/customrule_behaviour_definition/getDefinitions"
    )
    .then((resp) => resp.data);
}

function getPriceGuideDefinitions() {
  return axios
    .get(
      process.env.REACT_APP_THIS_WEBSITE_URL +
        "/api/priceguideDefinition/getDefinitions"
    )
    .then((resp) => resp.data);
}
function getFormatsDefinitions() {
  return axios
    .get(process.env.REACT_APP_THIS_WEBSITE_URL + "/api/formats/getDefinitions")
    .then((resp) => resp.data);
}

function getFormatsAndReturnHashtable() {
  console.log("is this function being called ?");
  return axios
    .get(process.env.REACT_APP_THIS_WEBSITE_URL + "/api/formats/getDefinitions")
    .then((resp) => {
      console.log("formats def resp", resp);
      let hashmapToreturn = {};
      for (let i = 0; i < resp.data.length; i++) {
        hashmapToreturn[resp.data[i].id] = utils.capitalizeFirstLetter(
          resp.data[i].name
        );
      }
      console.log("hashtable to return", hashmapToreturn);
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
};
