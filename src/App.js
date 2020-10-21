import React, { useState, useCallback, useEffect } from "react";

import "./App.css";

//API
import AuthAPI from "./services/authAPI";
import config from "./services/config";

//DEPENDANCIES
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//CONTEXTS
import AuthContext from "./context/authContext";
import LoginRenewOrLogOutContext from "./context/logAutoRenewOrLogout";
import DefinitionsContext from "./context/definitionsContext";
import MKMModalContext from "./context/mkmModalConnectionContext";

//PAGES
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

//Components
import LoggedRouteRender from "./components/LoggedRouteRender";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ResetMail from "./components/ResetMail";
import SetNewPassword from "./components/SetNewPassword";
import MKMConnectModal from "./components/MKMConnectModal";

import CreateMyScript from "./components/userCoreComponents/CreateMyScript/CreateMyScript";
import definitionsAPI from "./services/definitionsAPI";
import AllMyScripts from "./pages/AllMyScripts";
import Settings from "./components/userCoreComponents/Settings/Settings";

function App() {
  // STATE Creating the Authentication state
  const [authenticationInfos, setAuthenticationInfos] = useState(
    AuthAPI.userInfos()
  );

  //Checking is the JWT token is still good, if yes, Keep it in Axios + Launch JWT Renew setTimeout
  //If not, log out
  useEffect(() => {
    const didLogBack = AuthAPI.setup();

    if (!didLogBack) {
      //Log out if token is not up to date
      setAuthenticationInfos({
        ...authenticationInfos,
        isAuthenticated: false,
        user: { ...authenticationInfos.user, roles: [] },
      });
    } else {
      //Renew JWT token + setTimeout
      renewJWTToken();
    }
  }, []);

  //APP INITIALIZATION USE EFFECT
  useEffect(() => {
    const allRuleTypes = definitionsAPI.getCustomRuleRuleTypeDefinitions();
    const allRuleBehaviours = definitionsAPI.getCustomRuleRuleBehaviourDefinitions();
    const allPriceGuidePossibilities = definitionsAPI.getPriceGuideDefinitions();
    const allFormats = definitionsAPI.getFormatsDefinitions();
    Promise.all([
      allRuleTypes,
      allRuleBehaviours,
      allPriceGuidePossibilities,
      allFormats,
    ]).then(
      ([
        allRuleTypes,
        allRuleBehaviours,
        allPriceGuidePossibilities,
        allFormats,
      ]) => {
        setAllDefinitions({
          ruleTypes: allRuleTypes,
          ruleBehaviours: allRuleBehaviours,
          priceGuidePossibilities: allPriceGuidePossibilities,
          allFormats: allFormats,
        });
      }
    );
  }, []);

  //STATE - Auto Renew LogIn or Auto Log Out
  const [timers, setTimers] = useState({ autoRenew: "", autoLogOut: "" });

  //STATE - Definitions
  const [allDefinitions, setAllDefinitions] = useState({
    allRuleTypes: [],
    allRuleBehaviours: [],
    allPriceGuidePossibilities: [],
    allFormats: [],
  });

  //STATE - is MKM Connection Modal Displayed ?
  const [isMKMModalDisplayed, setIsMKMModalDisplayed] = useState();

  //CONTEXT - Auto login/LogOut
  const ContextloginLogOut = {
    timers: timers,
    setTimers: setTimers,
  };

  // CONTEXT CREATION Passing Authentication state in Context
  const contextValue = {
    authenticationInfos: authenticationInfos,
    setAuthenticationInfos: setAuthenticationInfos,
  };

  //CONTEXT CREATION Passing Definitions
  const contextDefinitions = {
    allDefinitions: allDefinitions,
    setAllDefinitions: setAllDefinitions,
  };

  //CONTEXT - MKM Connection Modal
  const contextMKMConnectionModal = {
    isMKMModalDisplayed: isMKMModalDisplayed,
    setIsMKMModalDisplayed: setIsMKMModalDisplayed,
  };

  /******************************************/
  /*******AUTH HANDLING & AUTO LOG OUT*******/
  /******************************************/

  const restartLogOutCountDown = () => {
    clearTimeout(timers.autoLogOut);
    // console.log("actually restarting timer");
    setTimers({
      ...timers,
      autoLogOut: setTimeout(eraseAuthContext, config.TIME_TO_LOG_OUT),
    });
  };

  /*
   * We keep track of the timer reference through renders thanks to useCallback
   * https://medium.com/@rajeshnaroth/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
   * See the answer with useCallback exemple
   */
  const delayedQuery = useCallback(
    throttle(() => restartLogOutCountDown(), config.TIME_THROTTLE),
    []
  );

  const renewJWTToken = () => {
    if (authenticationInfos.isAuthenticated) {
      AuthAPI.refreshTokenAndInfos(authenticationInfos.refresh_token)
        .then((data) => {
          //TO DO Transform data to make it app friendly
          // console.log(data);
          return AuthAPI.transformAPIdataIntoAppData(data.data);
        })
        .then((data) => setAuthenticationInfos(data))
        .catch((error) => console.log(error.response));

      setTimers({
        ...timers,
        autoRenew: setTimeout(renewJWTToken, config.TIME_JWT_RENEW),
      });
    } else {
      return;
    }
  };

  function throttle(callback, wait, immediate = false) {
    // console.log("throttling");
    let timeout = null;
    let initialCall = true;

    return function () {
      const callNow = immediate && initialCall;
      const next = () => {
        callback.apply(this, arguments);
        timeout = null;
      };

      if (callNow) {
        initialCall = false;
        next();
      }

      if (!timeout) {
        timeout = setTimeout(next, wait);
      }
    };
  }

  const eraseAuthContext = () => {
    setAuthenticationInfos({
      ...authenticationInfos,
      isAuthenticated: false,
      user: { ...authenticationInfos.user, roles: [] },
    });
    AuthAPI.logout();
  };
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <div
      className="App"
      onMouseMove={() => delayedQuery()}
      onTouchMove={() => delayedQuery()}
    >
      <AuthContext.Provider value={contextValue}>
        <DefinitionsContext.Provider value={contextDefinitions}>
          <MKMModalContext.Provider value={contextMKMConnectionModal}>
            <Router>
              <ToastContainer
                autoClose={3000}
                position="bottom-left"
                hideProgressBar={true}
              />
              <NavbarWithRouter />
              <Footer />
              <Switch>
                <Route
                  path="/login"
                  render={({ match, history }) => (
                    <LoginRenewOrLogOutContext.Provider
                      value={ContextloginLogOut}
                    >
                      <LoginPage
                        match={match}
                        history={history}
                        eraseAuthContext={eraseAuthContext}
                        renewJWTToken={renewJWTToken}
                      />
                    </LoginRenewOrLogOutContext.Provider>
                  )}
                />

                <Route path="/register" component={RegisterPage} />

                <Route path="/usermail/reset" component={ResetMail} />
                <Route
                  path="/usermail/setNewPassword/:challenge?"
                  render={({ match, history }) => (
                    <SetNewPassword match={match} history={history} />
                  )}
                />

                <LoggedRouteRender
                  path="/my-scripts/"
                  component={AllMyScripts}
                />
                <LoggedRouteRender
                  path="/edit-script/:id"
                  component={CreateMyScript}
                />
                <LoggedRouteRender
                  path="/create-script"
                  component={CreateMyScript}
                />
                <LoggedRouteRender path="/settings" component={Settings} />
              </Switch>
            </Router>
          </MKMModalContext.Provider>
        </DefinitionsContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
