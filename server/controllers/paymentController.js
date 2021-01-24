function calculateAmount(productName) {
  let amountToReturn;

  switch (productName) {
    case "OneMonthSubscription": {
      // amountToReturn = 4900;
      amountToReturn = 100;
      break;
    }
    case "ThreeMonthSubscription": {
      amountToReturn = 2900;
      break;
    }
    default: {
      console.error("couldnt find a corresponding product");
      break;
    }
  }

  return amountToReturn;
}

module.exports = {
  calculateAmount,
};
