//This function search in an array of array in log(n) (recursion)

function findTheRightPriceRange(arrayOfPriceRanges, priceInput, counter = 0) {
  // console.log("beginning of function", arrayOfPriceRanges);
  let newArray = [...arrayOfPriceRanges];
  if (
    !Array.isArray(newArray) ||
    (Array.isArray(newArray) && newArray.length === 0)
  ) {
    return -2;
  }
  // console.log("price input", priceInput);
  counter++;
  let middleArrayIndex = Math.floor(newArray.length / 2);
  let currentPointer = newArray[middleArrayIndex];
  // console.log("current pointer", currentPointer);

  if (priceInput >= currentPointer[0] && priceInput <= currentPointer[1]) {
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
  const conditionId = parseInt(cardCondition);
  //yooy
  // Tu dois modifier le priceshield pour qu'il laisse passer les cartes trop abimées qui seront décotées
  // indice : si condition < X telle suite de check
  // si condition > X autre suite de check
  // parse int la condition
  // ajouter les nouvelles raisons dans le dico en fullstack après

  const variationRate = Math.abs(((newPrice - oldPrice) / oldPrice) * 100);
  const variationRateTrend = Math.abs(
    ((newPrice - priceTrend) / priceTrend) * 100
  );
  // console.log("variation rate", variationRate);
  // console.log("oldPrice", oldPrice);
  // console.log("newPrice", newPrice);
  // console.log("priceTrend", priceTrend);
  // console.log(
  //   "Math.abs(((newPrice - oldPrice) / oldPrice) * 100)",
  //   Math.abs(((newPrice - oldPrice) / oldPrice) * 100)
  // );
  // console.log(
  //   "ABS (newPrice - oldPrice / oldPrice) * 100",
  //   Math.abs(((newPrice - oldPrice) / oldPrice) * 100)
  // );

  /* ***************************** */
  // Mint, Near Mint, Excellent
  /* ***************************** */

  if (conditionId <= 3) {
    if (oldPrice < 20 && newPrice < priceTrend && variationRateTrend > 40) {
      //If card is under 20€ and new price is more than 40% under the trend
      return { result: false, reason: 1 };
    }
    //If card is under 50€ and new price is more than 30% under the trend
    else if (
      oldPrice < 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 30
    ) {
      return { result: false, reason: 2 };
    }
    //If card is above 50€ and new price is more than 20% under the trend
    else if (
      oldPrice > 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 20
    ) {
      return { result: false, reason: 3 };
    }
    //If the card is worth more than 10 euros and variation rate is more than 40%
    else if (newPrice < oldPrice && oldPrice >= 10 && variationRate > 40) {
      return { result: false, reason: 4 };
    }
    //If the variation rate is more than 60%
    else if (newPrice < oldPrice && variationRate > 60) {
      return { result: false, reason: 5 };
    } else {
      return { result: true };
    }
  }
  /* ***************************** */
  // Good, Light Played, Played, Good
  /* ***************************** */
  else if (conditionId > 3 && conditionId <= 7) {
    if (oldPrice < 20 && newPrice < priceTrend && variationRateTrend > 80) {
      //If card is under 20€ and new price is more than 80% under the trend
      return { result: false, reason: 6 };
    }
    //If card is between 20 and 50€ and new price is more than 50% under the trend
    else if (
      oldPrice < 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 60
    ) {
      return { result: false, reason: 7 };
    }
    //If card is above 50€ and new price is more than 40% under the trend
    else if (
      oldPrice > 50 &&
      newPrice < priceTrend &&
      variationRateTrend > 40
    ) {
      return { result: false, reason: 8 };
    }
    //If the variation rate is more than 60%
    else if (newPrice < oldPrice && variationRate > 60) {
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
  const multiplier = math.ceil(number / coefficient);
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
  const {
    langDefinition,
    conditionDefinition,
  } = require("../services/genericInfosAPI");

  const langName = langDefinition[cardLanguageId];
  const langCoefficient = shopParams["percentPerLang" + langName];
  const conditionName = conditionDefinition[cardConditionId].trim();
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
