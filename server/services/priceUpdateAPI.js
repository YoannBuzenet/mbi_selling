//This function search in an array of array in log(n) (recursion)

const {
  revertedDictionnaryConditionDefinition,
} = require("../controllers/genericDataController");

function findTheRightPriceRange(arrayOfPriceRanges, priceInput, counter = 0) {
  // currentPointer[0] -> FROM;
  // currentPointer[1] -> TO;
  // currentPointer[2] -> RULE NUMBER;

  // console.log("beginning of function", arrayOfPriceRanges);
  let newArray = [...arrayOfPriceRanges];
  if (
    !Array.isArray(newArray) ||
    (Array.isArray(newArray) && newArray.length === 0)
  ) {
    return -2;
  } else if (priceInput === undefined) {
    return "price undefined";
  }
  // console.log("price input", priceInput);
  counter++;
  let middleArrayIndex = Math.floor(newArray.length / 2);
  let currentPointer = newArray[middleArrayIndex];
  // console.log("current pointer", currentPointer);

  if (priceInput >= currentPointer[0] && priceInput < currentPointer[1]) {
    return currentPointer[2];
  }

  if (priceInput <= currentPointer[0]) {
    return findTheRightPriceRange(
      newArray.splice(0, middleArrayIndex),
      priceInput,
      counter
    );
  }
  if (priceInput >= currentPointer[0]) {
    return findTheRightPriceRange(
      newArray.splice(middleArrayIndex, newArray.length - 1),
      priceInput,
      counter
    );
  }

  return -1;
}

// Translation of the behaviours are in the src folder, /services/fullStacktranslations/priceshield
function priceShieldAllows(oldPrice, newPrice, priceTrend, cardCondition) {
  // CardCondition is arriving in this form : MT, NM, EX.
  // We translate it into an id.
  let conditionId = parseInt(cardCondition);
  if (isNaN(conditionId)) {
    conditionId = parseInt(
      revertedDictionnaryConditionDefinition[cardCondition]
    );
  }

  const variationRate = Math.abs(((newPrice - oldPrice) / oldPrice) * 100);
  const variationRateTrend = Math.abs(
    ((newPrice - priceTrend) / priceTrend) * 100
  );

  /* ***************************** */
  // Mint, Near Mint, Excellent
  /* ***************************** */

  if (conditionId <= 3) {
    ///////////////////////////
    // MKM TRENDS CHECK
    ///////////////////////////
    if (oldPrice < 10 && newPrice < priceTrend && variationRateTrend >= 30) {
      //If card is under 10€ and new price is more than 30% under the trend
      return { result: false, reason: 0 };
    } else if (
      oldPrice >= 10 &&
      oldPrice < 20 &&
      newPrice < priceTrend &&
      variationRateTrend > 20
    ) {
      //If card is under 20€ and new price is more than 20% under the trend
      return { result: false, reason: 1 };
    }
    //If card is between 20 and 50€ and new price is more than 15% under the trend
    else if (
      oldPrice >= 20 &&
      oldPrice < 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 15
    ) {
      return { result: false, reason: 2 };
    }
    //If card is above 50€ and new price is more than 10% under the trend
    else if (
      oldPrice > 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 10
    ) {
      return { result: false, reason: 3 };
    }
    ///////////////////////////
    // ABSOLUTE VARIATION CHECK
    ///////////////////////////

    // Under 10 euros, variation Rate can't be higher than 60%.
    else if (oldPrice <= 10 && newPrice < oldPrice && variationRate > 60) {
      return { result: false, reason: 3.5 };
    }

    //If the card is worth more than 10 euros and less than 20 euros and variation rate is more than 40%
    else if (
      newPrice < oldPrice &&
      oldPrice >= 10 &&
      oldPrice <= 20 &&
      variationRate > 40
    ) {
      return { result: false, reason: 4 };
    }
    //If the card is worth more than 20 euros and the variation rate is more than 30%
    else if (oldPrice >= 20 && newPrice < oldPrice && variationRate > 30) {
      return { result: false, reason: 5 };
    } else {
      return { result: true };
    }
  }
  /* ***************************** */
  // Good, Light Played, Played, Poor
  /* ***************************** */
  else if (conditionId > 3 && conditionId <= 7) {
    ///////////////////////////
    // MKM TRENDS CHECK
    ///////////////////////////
    if (oldPrice < 10 && newPrice < priceTrend && variationRateTrend > 80) {
      // à faire + motif en translation
      //If card is under 10€ and new price is more than 80% under the trend
      return { result: false, reason: 5.5 };
    } else if (
      oldPrice >= 10 &&
      oldPrice < 20 &&
      newPrice < priceTrend &&
      variationRateTrend > 60
    ) {
      //If card is between 10 and 20€ and new price is more than 60% under the trend
      return { result: false, reason: 5.75 };
    } else if (
      oldPrice < 30 &&
      newPrice < priceTrend &&
      variationRateTrend > 50
    ) {
      //If card is under 30€ and new price is more than 50% under the trend
      return { result: false, reason: 6 };
    }
    //If card is under 50€ and new price is more than 40% under the trend
    else if (
      oldPrice < 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 40
    ) {
      return { result: false, reason: 7 };
    }
    //If card is above 50€ and new price is more than 30% under the trend
    else if (
      oldPrice > 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 30
    ) {
      return { result: false, reason: 8 };
    }
    ///////////////////////////
    // ABSOLUTE VARIATION CHECK
    ///////////////////////////
    //If the card is worth more than 10 euros and the variation rate is more than 60%
    else if (oldPrice >= 10 && newPrice < oldPrice && variationRate > 60) {
      return { result: false, reason: 9 };
    } else {
      return { result: true };
    }
  } else {
    throw new Error(
      "conditionId couldnt be found. ConditionId :" + conditionId
    );
  }
}

function roundDownNumber(number, coefficient) {
  return number - (number % coefficient);
}
function roundUpNumber(number, coefficient) {
  const multiplier = Math.ceil(number / coefficient);
  return coefficient * multiplier;
}

function roundUpPercent(number, coefficient) {
  return smoothFloatKeepEntireComplete(number * coefficient);
}

function roundDownPercent(number, coefficient) {
  return smoothFloatKeepEntireComplete(number / coefficient);
}

function smoothFloatKeepEntireComplete(number) {
  if (number % 1 !== 0) {
    return parseFloat(number.toFixed(2));
  } else {
    return number;
  }
}

function calculatePriceWithLanguageAndConditionSpecifics(
  initialPrice,
  cardLanguageId,
  cardConditionId,
  isFoil,
  shopParams
) {
  // console.log(
  //   "les params :",
  //   initialPrice,
  //   cardLanguageId,
  //   cardConditionId,
  //   isFoil,
  //   shopParams
  // );

  const {
    langDefinition,
    conditionDefinition,
  } = require("../services/genericInfosAPI");

  const langName = langDefinition[cardLanguageId];
  const langNameWithoutSpace = langName.replace(/\s/g, "");
  const langCoefficient = shopParams["percentPerLang" + langNameWithoutSpace];

  let conditionName = conditionDefinition[
    revertedDictionnaryConditionDefinition[cardConditionId]
  ].trim();
  // removing eventual hidden white spaces
  conditionName = conditionName.replace(/\s/g, "");

  const foilOrRegular = isFoil === 0 ? "Regular" : "Foil";
  const conditionCoefficient =
    shopParams["percentPer" + conditionName + foilOrRegular];
  const newPrice = (
    (((initialPrice * langCoefficient) / 100) * conditionCoefficient) /
    100
  ).toFixed(2);

  return parseFloat(newPrice);
}

module.exports = {
  findTheRightPriceRange,
  priceShieldAllows,
  roundDownNumber,
  roundUpNumber,
  roundUpPercent,
  roundDownPercent,
  smoothFloatKeepEntireComplete,
  calculatePriceWithLanguageAndConditionSpecifics,
};
