import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import BlackDivContext from "../context/blackDivModalContext";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "./AppLangChoice";

const BurgerMenuCustomerComponents = ({ history }) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //Is Menu Responsive Displayed
  const { setIsResponsiveMenuDisplayed } = useContext(
    isResponsiveMenuDisplayedContext
  );

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
        id="app.burgerMenu.customer.logOut.toast.success"
        defaultMessage={`You logged out successfully.`}
      />
    );
  };

  const classMenu = authenticationInfos.isAuthenticated
    ? "responsive_menu authenticated-menu"
    : "responsive_menu";

  const closeMenu = () => {
    setIsBlackDivModalDisplayed("deactivated");
    setIsResponsiveMenuDisplayed("deactivated");
  };

  return (
    <div className={classMenu}>
      {authenticationInfos.isAuthenticated ? (
        /////////////////////
        //AUTHENTICATED
        /////////////////////
        <div className="my_options_responsive">
          <h2 className="surname_responsive">
            {authenticationInfos.customer.prenom}
          </h2>
          <span className="divider">
            <hr></hr>
          </span>
          <div className="">
            <ul className="">
              <Link
                className="classic_links_responsive"
                to="/my-scripts"
                onClick={(event) => closeMenu(event)}
              >
                <li>
                  <FormattedMessage
                    id="app.burgerMenu.allMyScripts"
                    defaultMessage={`"My Scripts"`}
                  />
                </li>
              </Link>
              <Link
                className="classic_links_responsive"
                to="/create-script"
                onClick={(event) => closeMenu(event)}
              >
                <li>
                  <FormattedMessage
                    id="app.burgerMenu.createScript"
                    defaultMessage={`Create a Script`}
                  />
                </li>
              </Link>
              <Link
                className="classic_links_responsive"
                to="/subscribe"
                onClick={(event) => closeMenu(event)}
              >
                <li>
                  <FormattedMessage
                    id="app.burgerMenu.subscribe"
                    defaultMessage={`Subscribe`}
                  />
                </li>
              </Link>

              <Link
                className="classic_links_responsive"
                to="/my-invoices"
                onClick={(event) => closeMenu(event)}
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
                className="classic_links_responsive"
                onClick={(event) => closeMenu(event)}
              >
                <li>
                  <FormattedMessage
                    id="app.navbar.settings"
                    defaultMessage={`Settings`}
                  />
                </li>
              </Link>

              <li
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="classic_links_responsive"
              >
                <FormattedMessage
                  id="app.burgerMenu.logOut"
                  defaultMessage={`Log out`}
                />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /////////////////////
        //NON AUTHENTICATED
        /////////////////////
        <div className="not_connected_options_responsive">
          <div className="connection">
            <Link
              className="classic_links_responsive"
              to="/subscribe"
              onClick={(event) => closeMenu(event)}
            >
              <FormattedMessage
                id="app.burgerMenu.subscribe"
                defaultMessage={`Subscribe`}
              />
            </Link>
            <Link
              className="classic_links_responsive"
              to="/register"
              onClick={(event) => closeMenu(event)}
            >
              <FormattedMessage
                id="app.burgerMenu.register"
                defaultMessage={`Register`}
              />
            </Link>
            <Link
              className="classic_links_responsive"
              to="/login"
              onClick={(event) => closeMenu(event)}
            >
              <FormattedMessage
                id="app.burgerMenu.login"
                defaultMessage={`Log in`}
              />
            </Link>
            <div className="burgerMenuCustomer-select-lang">
              <AppLangChoice />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenuCustomerComponents;
