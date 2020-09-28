import React, { useState, useCallback, useEffect } from "react";

import "./App.css";

import { ToastContainer } from "react-toastify";

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

//CONTEXTS
import AuthContext from "./context/authContext";
import LoginRenewOrLogOutContext from "./context/logAutoRenewOrLogout";

//PAGES
import LoginPage from "./pages/LoginPage";

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

  //STATE - Auto Renew LogIn or Auto Log Out
  const [timers, setTimers] = useState({ autoRenew: "", autoLogOut: "" });

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
  return (
    <div
      className="App"
      onMouseMove={() => delayedQuery()}
      onTouchMove={() => delayedQuery()}
    >
      <AuthContext.Provider value={contextValue}>
        <Router>
          <ToastContainer
            autoClose={3000}
            position="bottom-left"
            hideProgressBar={true}
          />
          <Switch>
            <Route
              path="/login"
              render={({ match, history }) => (
                <LoginRenewOrLogOutContext.Provider value={ContextloginLogOut}>
                  <LoginPage
                    match={match}
                    history={history}
                    eraseAuthContext={eraseAuthContext}
                    renewJWTToken={renewJWTToken}
                  />
                </LoginRenewOrLogOutContext.Provider>
              )}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
