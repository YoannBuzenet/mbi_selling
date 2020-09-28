import React from "react";

export default React.createContext({
  currentLang: {
    picture: "",
    locale: "",
    translationsForUsersLocale: "",
    langID: 0,
  },
  setCurrentLang: (value) => {},
});
