import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container container">
          <div>
            <p>
              <Link to="/terms-of-use">
                <FormattedMessage
                  id="app.footer.legalClauses"
                  defaultMessage={`Legal Clauses`}
                />
              </Link>
            </p>
          </div>
          <div>
            <p className="small-text"></p>
          </div>
          <div>
            <p>
              <Link to="/priceShield">
                <FormattedMessage
                  id="app.footer.priceShield"
                  defaultMessage={`Price Shield`}
                />
              </Link>
            </p>
            <p>{/* <a href={`mailto:`}>{shopInfos.email}</a> */}</p>
          </div>
        </div>
        <p className="footerBottom">
          <FormattedMessage
            id="app.footer.ByMTGInterface"
            defaultMessage="MTG-Interface © 2021 All rights reserved."
          />
        </p>
      </footer>
    </>
  );
};

export default Footer;
