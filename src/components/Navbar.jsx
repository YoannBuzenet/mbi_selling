import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import BurgerMenu from "./BurgerMenu";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "./AppLangChoice";

const Navbar = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Current toggle menu state.
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    history.replace("/");
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
          <div className="menu-links-left">
            <Link to="/" className="logo-shop-link">
              <img src="/shopLogo.png" />
            </Link>
            {/* <Link to="/" className="classic-links big-screen-info">
              Fantasy Sphere
            </Link> */}
          </div>
          {authenticationInfos.isAuthenticated ? (
            /////////////////////////
            // Authenticated Menu
            /////////////////////////
            <div className="my_options">
              <BurgerMenu history={history} />
              <div className="desktop_menu_options">
                <Link
                  className="classic-links nav-element"
                  to="/my_selling_basket"
                >
                  <FormattedMessage
                    id="app.navbar.mySellRequest"
                    defaultMessage={`Sell Request`}
                  />
                </Link>
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
                        to="/my_account"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.myAccount"
                            defaultMessage={`My Account`}
                          />
                        </li>
                      </Link>

                      <Link
                        to="/my_sell_requests"
                        className="toggle-menu-links"
                        onClick={() => setToggleMenu(!toggleMenu)}
                      >
                        <li>
                          <FormattedMessage
                            id="app.navbar.mySellRequests"
                            defaultMessage={`My Sell Requests`}
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
              </div>
            </div>
          ) : (
            /////////////////////////
            // Not Authenticated Menu
            /////////////////////////
            <div className="not-connected-options">
              <BurgerMenu history={history} />

              <div className="connect">
                <Link
                  className="classic-links nav-element"
                  to="/my_selling_basket"
                >
                  <FormattedMessage
                    id="app.navbar.mySellRequest"
                    defaultMessage={`My Sell Request`}
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
                <AppLangChoice />
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
