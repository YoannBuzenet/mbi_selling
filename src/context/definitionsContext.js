import React from "react";

export default React.createContext({
  allDefinitions: {
    allRuleTypes: [],
    allRuleBehaviours: [],
    allPriceGuidePossibilities: [],
    allFormats: [],
    allMKMSets: [],
  },
  setAllDefinitions: (value) => {},
});
