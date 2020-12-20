const returnProductNameSubscription = (duration) => {
  switch (duration) {
    case "1": {
      return "OneMonthSubscription";
    }
    case "3": {
      return "ThreeMonthSubscription";
    }
  }
};

module.exports = {
  returnProductNameSubscription,
};
