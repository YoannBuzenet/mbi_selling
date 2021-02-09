function calculateAmount(productName) {
  let amountToReturn;

  switch (productName) {
    case "OneMonthSubscription": {
      // amount is in cents
      // amountToReturn = 3900;
      amountToReturn = 2900;
      break;
    }
    case "ThreeMonthSubscription": {
      amountToReturn = 7000;
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
