const db = require("../../models/index");

//Returns an object ready to be passed in state
function prepareStateFromArrayOfRules(arrayOfCustomRules) {
  //Separing foil rules from regular rules
  let arrayOfRegularCustomRules = arrayOfCustomRules.filter(
    (rule) => rule.isForFoils === 0
  );
  let arrayOfFoilCustomRules = arrayOfCustomRules.filter(
    (rule) => rule.isForFoils === 1
  );

  function compare(a, b) {
    if (a.priceRangeTo < b.priceRangeTo) {
      return -1;
    }
    if (a.priceRangeTo > b.priceRangeTo) {
      return 1;
    }
    return 0;
  }

  arrayOfRegularCustomRules.sort(compare);
  arrayOfFoilCustomRules.sort(compare);

  const objectToReturn = {
    regular: arrayOfRegularCustomRules,
    foil: arrayOfFoilCustomRules,
  };

  // console.log("here is the result", objectToReturn);
  return objectToReturn;
}

async function snapshotShopParams(idShop) {
  currentShopParams = await db.shop_params.findOne({
    where: {
      idShop: idShop,
    },
  });
  console.log("les shops params : ", currentShopParams);
  return currentShopParams;
}

module.exports = { prepareStateFromArrayOfRules, snapshotShopParams };
