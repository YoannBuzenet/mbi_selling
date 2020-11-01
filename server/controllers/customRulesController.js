// Taking sorted array of custom rules an transforming them to be passed in the log(n) price search algorithm
function transformCustomRulesIntoBrowsableArray(arrayOfCustomRules) {
  // Example of Custom Rule
  // {
  //       idScript: 3,
  //       ruleTypeId: 1,
  //       priceRangeFrom: 1,
  //       priceRangeTo: 2,
  //       priceRangeValueToSet: 2,
  //       behaviourId: 1,
  //       mkmPriceGuideReference: 1,
  //       isForFoils: 0,
  //       isForSigned: 0,
  //       isForPlaysets: 0,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },

  let processedArray = [];

  for (let i = 0; i < arrayOfCustomRules.length; i++) {
    processedArray = [
      ...processedArray,
      [
        arrayOfCustomRules[i].priceRangeFrom,
        arrayOfCustomRules[i],
        arrayOfCustomRules[i].priceRangeTo,
      ],
    ];
  }

  return processedArray;
}

module.exports = {
  transformCustomRulesIntoBrowsableArray,
};
