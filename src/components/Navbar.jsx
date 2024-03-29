import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import BurgerMenu from "./BurgerMenu";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "./AppLangChoice";
import { makeStyles } from "@material-ui/core/styles";
import MKMConnexionIndicator from "./MKMConnexionIndicator";

const Navbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //MKM Context
  const { isMKMModalDisplayed, setIsMKMModalDisplayed } = useContext(
    MKM_ModalContext
  );

  //Current toggle menu state.
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    //getting out of react app on purpose to go on the ejs homepage
    window.location.href = "/";

    authAPI.logout();
    setAuthenticationInfos({
      isAuthenticated: false,
      user: {
        id: "",
        email: "",
        roles: [],
      },
      customer: {
        id: "",
        prenom: "",
        nom: "",
        tel: "",
        adress: "",
        postalCode: "",
        town: "",
        SellRequests: [],
      },
    });

    toast.success(
      <FormattedMessage
        id="app.navbar.logOut.toast.success"
        defaultMessage={`You logged out succesfully.`}
      />
    );
  };

  const useStyles = makeStyles((theme) => ({
    mkmConnected: {
      color: "green",
    },
    mkmNONConnected: {
      color: "red",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {toggleMenu && (
        <div
          className="unclick"
          onClick={() => setToggleMenu(!toggleMenu)}
        ></div>
      )}
      <nav className="navbar">
        <div className="container">
          {!authenticationInfos.isAuthenticated && (
            <div className="menu-links-left">
              <a href="/" className="logo-shop-link">
                <img src="/pictures/logoMPU.svg" width="60px" />
              </a>
              <p>
                <a href="/" className="logo-shop-link">
                  <FormattedMessage
                    id="app.navbar.byMTGInterface"
                    defaultMessage="by MTG Interface"
                  />
                </a>
              </p>
            </div>
          )}
          {authenticationInfos.isAuthenticated && (
            <div className="menu-links-left">
              <Link to="/my-scripts/">
                <img src="/pictures/logoMPU.svg" width="60px" />
              </Link>
              <p>
                <Link to="/my-scripts/" className="logo-shop-link">
                  <FormattedMessage
                    id="app.navbar.byMTGInterface"
                    defaultMessage="by MTG Interface"
                  />
                </Link>
              </p>
            </div>
          )}
          {authenticationInfos.isAuthenticated ? (
            /////////////////////////
            // Authenticated Menu
            /////////////////////////
            <div className="my_options">
              <BurgerMenu history={history} />
              <div className="desktop_menu_options">
                {/* <Link className="classic-links nav-element" to="/stats">
                  <FormattedMessage
                    id="app.navbar.stats"
                    defaultMessage={`Stats`}
                  />
                </Link> */}
                <MKMConnexionIndicator />
                <div className="toggle-menu-container">
                  <p
                    className="unselectable display-inline-block nav-element pointer"
                    onClick={() => setToggleMenu(!toggleMenu)}
                  >
                    {authenticationInfos.customer.prenom}
                    <span
                      className="arrow-menu unselectable"
                      onClick={() => setToggleMenu(!toggleMenu)}
                    ></span>
                  </p>
                  {toggleMenu && (
                    <ul className="toggle-menu">
                      <Link
                        to="/create-script"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.create-script"
                            defaultMessage={`Create a script`}
                          />
                        </li>
                      </Link>
                      <Link
                        to="/my-scripts"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.my-scripts"
                            defaultMessage={`My Scripts`}
                          />
                        </li>
                      </Link>
                      {/* <Link
                        to="/stats"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.stats"
                            defaultMessage={`Stats`}
                          />
                        </li>
                      </Link> */}
                      <Link
                        className="toggle-menu-links"
                        to="/subscribe"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.subscribe"
                            defaultMessage={`Subscribe`}
                          />
                        </li>
                      </Link>
                      <Link
                        className="toggle-menu-links"
                        to="/my-invoices"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.invoices"
                            defaultMessage={`My invoices`}
                          />
                        </li>
                      </Link>
                      <Link
                        to="/settings"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.settings"
                            defaultMessage={`Settings`}
                          />
                        </li>
                      </Link>

                      <li onClick={handleLogout}>
                        <FormattedMessage
                          id="app.navbar.logOut"
                          defaultMessage={`Log out`}
                        />
                      </li>
                    </ul>
                  )}
                </div>

                <AppLangChoice
                  top="-30"
                  topArrowMenu="30"
                  marginLeft="10"
                  lineHeightSelectAppLang="25"
                  topSelectAppLangFlags="42"
                  isAuthenticated={true}
                />
              </div>
            </div>
          ) : (
            /////////////////////////
            // Not Authenticated Menu
            /////////////////////////
            <div className="not-connected-options">
              <BurgerMenu history={history} />

              <div className="connect">
                {/* We WILL let this link to show to free users what can be done with this amazing software */}
                {/* <Link className="classic-links nav-element" to="/stats">
                  <FormattedMessage
                    id="app.navbar.stats"
                    defaultMessage={`Stats`}
                  />
                </Link> */}
                <Link className="classic-links" to="/subscribe">
                  <FormattedMessage
                    id="app.navbar.subscribe"
                    defaultMessage={`Subscribe`}
                  />
                </Link>
                <Link className="classic-links" to="/register">
                  <FormattedMessage
                    id="app.navbar.register"
                    defaultMessage={`Register`}
                  />
                </Link>
                <Link className="classic-links" to="/login">
                  <FormattedMessage
                    id="app.navbar.connect"
                    defaultMessage={`Connect`}
                  />
                </Link>

                <AppLangChoice isAuthenticated={false} />
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="margin-bottom"></div>
    </>
  );
};

export default Navbar;
