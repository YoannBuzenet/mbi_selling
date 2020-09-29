import React from "react";
import shopInfoContext from "../context/publicShopInfoContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  const { shopInfos } = useContext(shopInfoContext);

  return (
    <>
      <footer className="footer">
        <div className="footer-container container">
          <div>
            <p>
              <Link to="/buyingClauses">
                <FormattedMessage
                  id="app.footer.legalBuyingClauses"
                  defaultMessage={`Buying Clauses`}
                />
              </Link>
            </p>
          </div>
          <div>
            <p>{shopInfos.legalName}</p>
            <p className="small-text">{shopInfos.adress}</p>
            <p className="small-text">
              {shopInfos.postalCode} {shopInfos.town}
            </p>
          </div>
          <div>
            <p>
              <a href={`tel:${shopInfos.tel}`}>{shopInfos.tel}</a>
            </p>
            <p>
              <a href={`mailto:${shopInfos.email}`}>{shopInfos.email}</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
