const revertedDictionnaryConditionDefinition = {
  MT: 1,
  NM: 2,
  EX: 3,
  GD: 4,
  LP: 5,
  PL: 6,
  PO: 7,
};
const DictionnaryConditionShortNameDefinition = {
  1: "MT",
  2: "NM",
  3: "EX",
  4: "GD",
  5: "LP",
  6: "PL",
  7: "PO",
};

// Transforming condition as string into an integer that we know.
function transformConditionStringIntoInteger(condition) {
  if (typeof condition === "number") {
    return condition;
  }

  if (typeof condition !== "string" && condition.length !== 2) {
    throw new Error(
      "condition expected to be a string of length 2 (MT, NM, EX...)"
    );
  }

  return revertedDictionnaryConditionDefinition[condition];
}

module.exports = {
  transformConditionStringIntoInteger,
  DictionnaryConditionShortNameDefinition,
  revertedDictionnaryConditionDefinition,
};
