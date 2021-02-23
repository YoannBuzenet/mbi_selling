import React from "react";
import { FormattedMessage } from "react-intl";

const PriceShield = () => {
  return (
    <div className="container priceShield">
      <img src="/pictures/priceshield.png" className="priceShieldPicture" />
      <div className="explainations">
        <h1>
          <FormattedMessage
            id="app.page.priceShield.title"
            defaultMessage="Price Shield"
          />
        </h1>
        <p>
          <FormattedMessage
            id="app.page.priceShield.FirstExplaination"
            defaultMessage="Each time a new price is to be set by your script, we check it through the Price Shield."
          />
        </p>
        <p>
          <FormattedMessage
            id="app.page.priceShield.firstUlTitle"
            defaultMessage="The Price Shield looks at :"
          />
        </p>
        <ul>
          <li>
            <FormattedMessage
              id="app.page.priceShield.firstUlFirstLi"
              defaultMessage="The current trend of the product on MKM (foil or regular)"
            />
          </li>
          <li>
            <FormattedMessage
              id="app.page.priceShield.firstUlSecondLi"
              defaultMessage="Your current price"
            />
          </li>
          <li>
            <FormattedMessage
              id="app.page.priceShield.firstUlThirdLi"
              defaultMessage="The new price that is going to be set"
            />
          </li>
        </ul>
        <p>
          <FormattedMessage
            id="app.page.priceShield.secondUl"
            defaultMessage="The Price Shield then blocks :"
          />
        </p>
        <ul>
          <li>
            <FormattedMessage
              id="app.page.priceShield.secondUlFirstLi"
              defaultMessage="If the new price is too low below the market trend"
            />
          </li>
          <li>
            <FormattedMessage
              id="app.page.priceShield.secondUlSecondLi"
              defaultMessage="If the price is too far from your former price"
            />
          </li>
        </ul>
        <p>
          <FormattedMessage
            id="app.page.afterUlFirstP"
            defaultMessage="The Price Shield is the way to protect specific prices on exotic cards and staples. It cannot be deactivated."
          />
        </p>
        <p>
          <FormattedMessage
            id="app.page.afterUlSecondP"
            defaultMessage="Each price blocked by the Price Shield will be explained in the summary you receive at the end of your script. This way, you can still update it yourself if you want to."
          />
        </p>
      </div>
    </div>
  );
};

export default PriceShield;
