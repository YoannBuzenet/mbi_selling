import React from "react";

export default React.createContext({
  isResponsiveMenuDisplayed: "deactivated",
  setIsResponsiveMenuDisplayed: (value) => {},
});
