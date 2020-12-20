function calculateAmount(productName) {
  switch (productName) {
    case "1": {
      return 4900;
    }
    case "3": {
      return 2900;
    }
  }
}

module.exports = {
  calculateAmount,
};
