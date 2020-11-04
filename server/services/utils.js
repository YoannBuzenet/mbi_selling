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
  const currentShopParams = await db.shop_params.findOne({
    where: {
      idShop: idShop,
    },
  });
  //save current shop param in snapshot

  const snaphotShopParams = await db.snapshot_params.create({
    shopId: currentShopParams.dataValues.idShop,
    percentPerSigned: currentShopParams.dataValues.percentPerSigned,
    percentPerMintRegular: currentShopParams.dataValues.percentPerMintRegular,
    percentPerNearMintRegular:
      currentShopParams.dataValues.percentPerNearMintRegular,
    percentPerExcellentRegular:
      currentShopParams.dataValues.percentPerExcellentRegular,
    percentPerGoodRegular: currentShopParams.dataValues.percentPerGoodRegular,
    percentPerLightPlayedRegular:
      currentShopParams.dataValues.percentPerLightPlayedRegular,
    percentPerPlayedRegular:
      currentShopParams.dataValues.percentPerPlayedRegular,
    percentPerPoorRegular: currentShopParams.dataValues.percentPerPoorRegular,
    percentPerMintFoil: currentShopParams.dataValues.percentPerMintFoil,
    percentPerNearMintFoil: currentShopParams.dataValues.percentPerNearMintFoil,
    percentPerExcellentFoil:
      currentShopParams.dataValues.percentPerExcellentFoil,
    percentPerGoodFoil: currentShopParams.dataValues.percentPerGoodFoil,
    percentPerLightPlayedFoil:
      currentShopParams.dataValues.percentPerLightPlayedFoil,
    percentPerPlayedFoil: currentShopParams.dataValues.percentPerPlayedFoil,
    percentPerPoorFoil: currentShopParams.dataValues.percentPerPoorFoil,
    percentPerLangGerman: currentShopParams.dataValues.percentPerLangGerman,
    percentPerLangSpanish: currentShopParams.dataValues.percentPerLangSpanish,
    percentPerLangFrench: currentShopParams.dataValues.percentPerLangFrench,
    percentPerLangItalian: currentShopParams.dataValues.percentPerLangItalian,
    percentPerLangJapanese: currentShopParams.dataValues.percentPerLangJapanese,
    percentPerLangPortuguese:
      currentShopParams.dataValues.percentPerLangPortuguese,
    percentPerLangRussian: currentShopParams.dataValues.percentPerLangRussian,
    percentPerLangSimplifiedChinese:
      currentShopParams.dataValues.percentPerLangSimplifiedChinese,
    percentPerLangEnglish: currentShopParams.dataValues.percentPerLangEnglish,
    percentPerLangKorean: currentShopParams.dataValues.percentPerLangKorean,
    percentPerLangTraditionalChinese:
      currentShopParams.dataValues.percentPerLangTraditionalChinese,
  });

  return snaphotShopParams;
}

function transformArrayIntoDictionnaryWithKey(array, key = "id") {
  var dictionnaryToReturn = {};

  if (array) {
    for (let i = 0; i < array.length; i++) {
      dictionnaryToReturn[array[i][key]] = array[i];
    }
  }

  return dictionnaryToReturn;
}

module.exports = {
  prepareStateFromArrayOfRules,
  snapshotShopParams,
  transformArrayIntoDictionnaryWithKey,
};