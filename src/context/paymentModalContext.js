import React from "react";

export default React.createContext({
  isPaymentModalDisplayed: false,
  setIsPaymentModalDisplayed: (value) => {},
});
