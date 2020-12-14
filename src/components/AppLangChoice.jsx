import React, { useContext, useState } from "react";
import SelectAppLangContext from "../context/selectedAppLang";
import config from "../services/config";

const AppLangChoice = ({
  top = "22",
  topArrowMenu = "8",
  marginLeft = "0",
  lineHeightSelectAppLang = "25",
  topSelectAppLangFlags = "22",
}) => {
  const { currentLang, setCurrentLang } = useContext(SelectAppLangContext);

  const [areFlagsDisplayed, setAreFlagsDisplayed] = useState(false);

  const handleClick = (event, lang) => {
    setCurrentLang({
      locale: lang.locale,
      translationsForUsersLocale: lang.translationsForUsersLocale,
      picture: lang.picture,
      langID: lang.langID,
    });
    window.localStorage.setItem("appLang", lang.locale);
  };

  const handleClickDisplayFlags = (event) => {
    setAreFlagsDisplayed(!areFlagsDisplayed);
  };

  return (
    <>
      {areFlagsDisplayed && (
        <div
          className="transparent-div"
          onClick={(e) => handleClickDisplayFlags(e)}
        ></div>
      )}
      <div className="current-app-lang">
        <div
          className="current-lang-flag"
          style={{ top: top + "px", marginLeft: marginLeft + "px" }}
          onClick={(e) => handleClickDisplayFlags(e)}
        >
          <img
            src={"/flags/25X13/" + currentLang.picture + ".png"}
            alt={currentLang.picture + " flag"}
          />
          <span
            className="arrow-menu arrow-app-lang"
            style={{ top: topArrowMenu + "px" }}
          ></span>

          {areFlagsDisplayed && (
            <div
              className={"set-lang-choosing lang-select-applevel"}
              style={{
                lineHeight: lineHeightSelectAppLang + "px",
                top: topSelectAppLangFlags + "px",
              }}
            >
              {config.websiteDefaultLanguageArrayLangAvailables.map(
                (lang, index) => (
                  <div
                    className="flag-drop-down"
                    key={index}
                    onClick={(event) => handleClick(event, lang)}
                  >
                    <img
                      src={"/flags/25X13/" + lang.picture + ".png"}
                      alt={lang.picture + " flag"}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppLangChoice;
