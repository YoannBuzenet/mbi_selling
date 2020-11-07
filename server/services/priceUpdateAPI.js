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

function priceShieldAllows(oldPrice, newPrice, priceTrend) {
  const variationRate = Math.floor((newPrice - oldPrice / oldPrice) * 100);
  const variationRateTrend = Math.floor(
    (newPrice - priceTrend / priceTrend) * 100
  );

  //If card is under 20€ and new price is more than 40% under the trend
  if (oldPrice < 20 && newPrice < priceTrend && variationRateTrend > 40) {
    return false;
  }
  //If card is under 50€ and new price is more than 30% under the trend
  else if (oldPrice < 50 && newPrice < priceTrend && variationRateTrend > 30) {
    return false;
  }
  //If card is above 50€ and new price is more than 20% under the trend
  else if (oldPrice > 50 && newPrice < priceTrend && variationRateTrend > 20) {
    return false;
  }
  //If the card is worth more than 10 euros and variation rate is more than 50%
  else if (oldPrce < newPrice && oldPrice >= 10 && variationRate > 50) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  findTheRightPriceRange,
  priceShieldAllows,
};
