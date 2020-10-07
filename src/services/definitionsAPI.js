import axios from "axios";

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

export default {
  getCustomRuleRuleTypeDefinitions,
  getCustomRuleRuleBehaviourDefinitions,
};
