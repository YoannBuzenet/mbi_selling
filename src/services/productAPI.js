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

module.exports = {
  returnProductNameSubscription,
};
