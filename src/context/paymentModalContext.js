import React from "react";

export default React.createContext({
  paymentModalInformation: { isDiplayed: false, amount: 0, title: "" },
  setPaymentModalInformation: (value) => {},
});
