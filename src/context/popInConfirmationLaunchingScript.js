import React from "react";

export default React.createContext({
  popInLaunchingScriptInformations: { isDisplayed: false },
  setPopInLaunchingScriptInformations: (value) => {},
});
