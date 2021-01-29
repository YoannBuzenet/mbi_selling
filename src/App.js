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
import { useIntl } from "react-intl";

//CONTEXTS
import AuthContext from "./context/authContext";
import LoginRenewOrLogOutContext from "./context/logAutoRenewOrLogout";
import DefinitionsContext from "./context/definitionsContext";
import MKMModalContext from "./context/mkmModalConnectionContext";
import TransparentDivContext from "./context/transparentDivContext";
import TimerScriptStatusCheck from "./context/timerScriptStatusCheck";
import isResponsiveMenuDisplayedContext from "./context/menuDisplayedContext";
import BlackDivContext from "./context/blackDivModalContext";
import PaymentDivContext from "./context/paymentModalContext";
import PopInConfirmationLaunchScriptContext from "./context/popInConfirmationLaunchingScript";

//PAGES
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Subscribe from "./pages/Subscribe";
import TermsOfUse from "./pages/TermsOfUse";

//Components
import LoggedRouteRender from "./components/LoggedRouteRender";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ResetMail from "./components/ResetMail";
import SetNewPassword from "./components/SetNewPassword";
import TransparentDiv from "./components/TransparentDiv";
import BurgerMenuCustomerComponents from "./components/BurgerMenuCustomerComponents";

import CreateMyScript from "./components/userCoreComponents/CreateMyScript/CreateMyScript";
import definitionsAPI from "./services/definitionsAPI";
import AllMyScripts from "./pages/AllMyScripts";
import Settings from "./components/userCoreComponents/Settings/Settings";
import Axios from "axios";
import utils from "./services/utils";
import BlackDiv from "./components/BlackDiv";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/payment/CheckoutForm";
import MyInvoices from "./pages/MyInvoices";
import MyAccountPage from "./pages/MyAccount";

// Loading stripe outside of the component to avoid recalculation in each render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

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
      //launch the check status setInterval that will poke API
      launchcheckStatusTimer();
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

  //STATE - is Stripe Payment Modal Displayed ?
  const [paymentModalInformation, setPaymentModalInformation] = useState({
    isDisplayed: false,
    amount: 0,
    title: "",
    articleName: 0,
  });

  //STATE - is Transparent Div Displayed ?
  const [isTransparentDivDisplayed, setIsTransparentDivDisplayed] = useState(
    false
  );

  //STATE - Check if responsive Menu is displayed
  const [isResponsiveMenuDisplayed, setIsResponsiveMenuDisplayed] = useState(
    "deactivated"
  );

  //STATE - is Plain Page Black Div Displayed ?
  const [isBlackDivModalDisplayed, setIsBlackDivModalDisplayed] = useState(
    "deactivated"
  );

  //STATE - is Confirmation Launching Pop In Displayed ?
  const [
    isPopInConfirmationLaunching,
    setIsPopInConfirmationLaunchingd,
  ] = useState(false);

  //STATE - Global timer that checks script status
  const [checkStatusTimer, setCheckStatusTimer] = useState(null);

  //CONTEXT - Auto login/LogOut
  const ContextloginLogOut = {
    timers: timers,
    setTimers: setTimers,
  };

  //CONTEXT - Timer
  const ContextTimer = {
    checkStatusTimer: checkStatusTimer,
    setCheckStatusTimer: setCheckStatusTimer,
  };
  //CONTEXT - Transparent Div
  const ContextTransparentDiv = {
    isTransparentDivDisplayed: isTransparentDivDisplayed,
    setIsTransparentDivDisplayed: setIsTransparentDivDisplayed,
  };

  // CONTEXT - Black Div Modal Activation
  const contextBlackDiv = {
    isBlackDivModalDisplayed: isBlackDivModalDisplayed,
    setIsBlackDivModalDisplayed: setIsBlackDivModalDisplayed,
  };

  // CONTEXT - Stripe Payment Modal Activation
  const contextStripeModal = {
    paymentModalInformation: paymentModalInformation,
    setPaymentModalInformation: setPaymentModalInformation,
  };

  //CONTEXT CREATION - Is Responsive Menu Displayed
  const contextResponsiveMenuDisplayed = {
    isResponsiveMenuDisplayed: isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed: setIsResponsiveMenuDisplayed,
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

  //CONTEXT - Popin Launching Confirmation
  const contextPopInLaunchingConfirmation = {
    isPopInConfirmationLaunching: isPopInConfirmationLaunching,
    setIsPopInConfirmationLaunchingd: setIsPopInConfirmationLaunchingd,
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

  const launchcheckStatusTimer = () => {
    const userID = authenticationInfos?.user?.id;
    if (userID === undefined) {
      console.error("user ID is not defined in script update function");
    }

    const checkScriptStatus = async () => {
      // Getting updated script from the Express API
      const userScripts = await Axios.get(
        `/api/script/getByUserId?idUser=${userID}`
      );

      // Sorting array script in a object to access data in constant time
      const sortedScripts = utils.transformArrayIntoDictionnaryWithKey(
        userScripts.data
      );

      let authContextCopy = { ...authenticationInfos };

      // comparing our context with data from API to update or not scripts in our context
      for (const ScriptInContext of authContextCopy.userScripts) {
        if (sortedScripts.hasOwnProperty(ScriptInContext.id)) {
          ScriptInContext.isRunning =
            sortedScripts[ScriptInContext.id].isRunning;
        }
      }

      setAuthenticationInfos(authContextCopy);
    };

    //Singleton - we want only one timer to run while user is logged
    if (checkStatusTimer === null) {
      setCheckStatusTimer(
        setInterval(() => {
          checkScriptStatus();
        }, parseInt(process.env.REACT_APP_TIME_STATUS_CHECK))
      );
    }
  };

  const eraseAuthContext = () => {
    setAuthenticationInfos({
      ...authenticationInfos,
      isAuthenticated: false,
      user: { ...authenticationInfos.user, roles: [] },
    });
    AuthAPI.logout();
  };
  const NavbarWithRouter = withRouter(Navbar);
  const BurgerMenuCustomerComponentsWithRouter = withRouter(
    BurgerMenuCustomerComponents
  );

  /* ************************ */
  /* ***** TRANSLATIONS ***** */
  /* ************************ */
  const intl = useIntl();
  const translatedDOMTitle = intl.formatMessage({
    id: "document.title",
    defaultMessage: "MKM Price Updater",
  });

  // DOM Title
  window.document.title = translatedDOMTitle;

  return (
    <div
      className="App"
      onMouseMove={() => delayedQuery()}
      onTouchMove={() => delayedQuery()}
    >
      <Elements stripe={stripePromise}>
        <AuthContext.Provider value={contextValue}>
          <DefinitionsContext.Provider value={contextDefinitions}>
            <MKMModalContext.Provider value={contextMKMConnectionModal}>
              <TransparentDivContext.Provider value={ContextTransparentDiv}>
                <TimerScriptStatusCheck.Provider value={ContextTimer}>
                  <isResponsiveMenuDisplayedContext.Provider
                    value={contextResponsiveMenuDisplayed}
                  >
                    <PopInConfirmationLaunchScriptContext.Provider
                      value={contextPopInLaunchingConfirmation}
                    >
                      <BlackDivContext.Provider value={contextBlackDiv}>
                        <PaymentDivContext.Provider value={contextStripeModal}>
                          <Router>
                            {isTransparentDivDisplayed && <TransparentDiv />}

                            {/* Absolute positioned components */}
                            {isBlackDivModalDisplayed === "activated" && (
                              <BlackDiv />
                            )}

                            {/* Burger menu */}
                            {isResponsiveMenuDisplayed === "activated" && (
                              <BurgerMenuCustomerComponentsWithRouter />
                            )}

                            <ToastContainer
                              autoClose={3000}
                              position="bottom-left"
                              hideProgressBar={true}
                            />
                            <NavbarWithRouter />

                            {/* Stripe Payment Modal */}
                            {paymentModalInformation.isDisplayed && (
                              <CheckoutForm />
                            )}

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
                                      launchcheckStatusTimer={
                                        launchcheckStatusTimer
                                      }
                                    />
                                  </LoginRenewOrLogOutContext.Provider>
                                )}
                              />

                              <Route
                                path="/register"
                                render={({ match, history }) => (
                                  <LoginRenewOrLogOutContext.Provider
                                    value={ContextloginLogOut}
                                  >
                                    <RegisterPage
                                      match={match}
                                      history={history}
                                      eraseAuthContext={eraseAuthContext}
                                      renewJWTToken={renewJWTToken}
                                      launchcheckStatusTimer={
                                        launchcheckStatusTimer
                                      }
                                    />
                                  </LoginRenewOrLogOutContext.Provider>
                                )}
                              />

                              <Route path="/subscribe" component={Subscribe} />
                              <Route
                                path="/terms-of-use"
                                component={TermsOfUse}
                              />

                              <Route
                                path="/usermail/reset"
                                component={ResetMail}
                              />
                              <Route
                                path="/usermail/setNewPassword/:challenge?"
                                render={({ match, history }) => (
                                  <SetNewPassword
                                    match={match}
                                    history={history}
                                  />
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
                              <LoggedRouteRender
                                path="/settings"
                                component={Settings}
                              />
                              <LoggedRouteRender
                                path="/my-invoices"
                                component={MyInvoices}
                              />
                              <LoggedRouteRender
                                path="/myAccount"
                                component={MyAccountPage}
                              />
                            </Switch>
                          </Router>
                        </PaymentDivContext.Provider>
                      </BlackDivContext.Provider>
                    </PopInConfirmationLaunchScriptContext.Provider>
                  </isResponsiveMenuDisplayedContext.Provider>
                </TimerScriptStatusCheck.Provider>
              </TransparentDivContext.Provider>
            </MKMModalContext.Provider>
          </DefinitionsContext.Provider>
        </AuthContext.Provider>
      </Elements>
    </div>
  );
}

export default App;
