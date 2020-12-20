const returnProductNameSubscription = (duration) => {
  let productNameToReturn;

  switch (duration) {
    case 1: {
      productNameToReturn = "OneMonthSubscription";
      break;
    }
    case 3: {
      productNameToReturn = "ThreeMonthSubscription";
      break;
    }
    default: {
      console.error("couldnot find a name for this product. Input :", duration);
      break;
    }
  }
  return productNameToReturn;
};

const getProductDurationWithProductName = (productName) => {
  let productDurationToReturn;

  switch (productName) {
    case "OneMonthSubscription": {
      productDurationToReturn = 1;
      break;
    }
    case "ThreeMonthSubscription": {
      productDurationToReturn = 3;
      break;
    }
    default: {
      console.error(
        "couldnot find a duration for this product. Input :",
        productName
      );
      break;
    }
  }
  return productDurationToReturn;
};

module.exports = {
  returnProductNameSubscription,
  getProductDurationWithProductName,
};
