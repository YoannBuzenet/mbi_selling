import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";
import English from "../translations/English.json";

const AppWrapper = (props) => {
  //STATE - App Lang
  //Test that : : fr-FR, en-US, en-GB
  // Finding in the all lang available which has an ID equal to what's in .env

  const langFromLocalStorage = config.websiteDefaultLanguageArrayLangAvailables.filter(
    (langData) => langData.locale === window.localStorage.getItem("appLang")
  )?.[0];

  const defaultLanguage = {
    locale: "en-US",
    translationsForUsersLocale: English,
    picture: "EN",
    langID: 9,
  };

  const [currentLang, setCurrentLang] = useState(
    langFromLocalStorage || defaultLanguage
  );

  //CONTEXT CREATION
  const AppLangContext = {
    currentLang: currentLang,
    setCurrentLang: setCurrentLang,
  };

  return (
    <SelectAppLangContext.Provider value={AppLangContext}>
      <IntlProvider
        locale={currentLang.locale}
        messages={currentLang.translationsForUsersLocale}
      >
        {props.children}
      </IntlProvider>
    </SelectAppLangContext.Provider>
  );
};

export default AppWrapper;
