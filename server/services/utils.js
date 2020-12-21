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

async function snapshotShopParams(idShop, idPutRequest) {
  const currentShopParams = await db.shop_params.findOne({
    where: {
      idShop: idShop,
    },
  });
  //save current shop param in snapshot

  return db.snapshot_params.create({
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
    PUT_Request_id: idPutRequest,
  });
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

function getRelevantDateForUpdateSubscribe(date) {
  let processedDate;
  // -> si la date est null ou inférieure à aujourd'hui, on la met à aujourd'hui. Sinon on prends celle de la DB
  if (date === null || date < new Date()) {
    console.log("date is inferior to today or was null :", date);
    processedDate = new Date();
  } else {
    processedDate = date;
  }
  return processedDate;
}

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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createADateFromTodayAndAddMonths(numberOfMonths) {
  var CurrentDate = new Date();
  return new Date(
    CurrentDate.setMonth(CurrentDate.getMonth() + numberOfMonths)
  );
}

function addMonthsToADate(date, numberOfMonths) {
  return new Date(date.setMonth(CurrentDate.getMonth() + numberOfMonths));
}

module.exports = {
  prepareStateFromArrayOfRules,
  snapshotShopParams,
  transformArrayIntoDictionnaryWithKey,
  langDefinition,
  conditionDefinition,
  sleep,
  createADateFromTodayAndAddMonths,
  getRelevantDateForUpdateSubscribe,
  addMonthsToADate,
};
