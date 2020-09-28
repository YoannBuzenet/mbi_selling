import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";

const AppWrapper = (props) => {
  //STATE - App Lang
  //Test that : : fr-FR, en-US, en-GB
  // Finding in the all lang available which has an ID equal to what's in .env
  const [currentLang, setCurrentLang] = useState(
    ...config.websiteDefaultLanguageArrayLangAvailables.filter(
      (langData) =>
        langData.langID === parseInt(process.env.REACT_APP_APP_LANG_ID_DEFAULT)
    )
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
