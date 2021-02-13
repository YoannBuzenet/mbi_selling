import React from "react";

export default React.createContext({
  popInTestScriptInformations: { isDisplayed: false },
  setPopInTestScriptInformations: (value) => {},
});
