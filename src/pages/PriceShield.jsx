import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FormattedMessage } from "react-intl";

const PriceShield = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(25),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
    },
    explaination: {
      fontSize: theme.typography.pxToRem(25),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
    },
  }));

  const classes = useStyles();

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
        <h2>
          <FormattedMessage
            id="app.page.priceShield.h2Title"
            defaultMessage="How does it work ?"
          />
        </h2>
        <p>
          <FormattedMessage
            id="app.page.priceShield.secondUl"
            defaultMessage="The Price Shield blocks each card where the price could be judged as too low."
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

        {/* Price Shield Details */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <FormattedMessage
                id="app.page.priceShield.SeeDetails"
                defaultMessage="See calculation details"
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.explaination}>
              <h3>
                <FormattedMessage
                  id="app.page.priceShield.details"
                  defaultMessage="Details"
                />
              </h3>
              <p>
                <FormattedMessage
                  id="app.page.priceShield.details.FirstParagraph"
                  defaultMessage="Two comparisons take place for each card: one with the MKM trend (foil or not depending on the card), and finally one between the current price of the card and its potential new price. We thus measure the rate of change between the new price and the trend, and the rate of change between the old price and the new price."
                />
              </p>
              <p className="priceShieldDetailsIntroduction">
                <FormattedMessage
                  id="app.page.priceShield.details.secondParagraph"
                  defaultMessage="The Price Shield first checks the condition of the card. If it is Mint, it will not be treated the same as a played card."
                />
              </p>
              <h4>
                <FormattedMessage
                  id="app.page.priceShield.details.MintNearMintExcTitle"
                  defaultMessage="Mint/Near Mint/Excellent :"
                />
              </h4>
              <p className="categorySubtitle">
                <FormattedMessage
                  id="app.page.priceShield.details.comparisonWithTrend"
                  defaultMessage="Comparison with trend"
                />
              </p>
              <ul>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.trend.rule1"
                    defaultMessage="A card whose sale price is less than 5 euros cannot be may have a sale price 50% below trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.trend.rule2"
                    defaultMessage="A card whose sale price is between 5 and 10 euros cannot have a sale price 30% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.trend.rule3"
                    defaultMessage="A card whose sale price is between 5 and 10 euros cannot have a sale price 30% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.trend.rule4"
                    defaultMessage="A card whose sale price is between 20 and 50 euros cannot have a sale price 15% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.trend.rule5"
                    defaultMessage="A card whose sale price is greater than 50 euros cannot be may have a sale price 10% lower than the trend."
                  />
                </li>
              </ul>
              <p className="categorySubtitle">
                <FormattedMessage
                  id="app.page.priceShield.details.comparisonWithOldPrice"
                  defaultMessage="Comparison with the old price"
                />
              </p>
              <ul>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.oldPrice.rule1"
                    defaultMessage="A card whose sale price is less than 10 euros cannot have a sale price 60% lower than its old sale price."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.oldPrice.rule2"
                    defaultMessage="A card whose sale price is between 10 and 20 euros cannot have a sale price 40% lower than its old sale price."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.Mint.oldPrice.rule3"
                    defaultMessage="A card whose sale price is greater than 20 euros cannot be may have a sale price 30% lower than its old price of sale."
                  />
                </li>
              </ul>
              <h4>
                <FormattedMessage
                  id="app.page.priceShield.details.GoodLightPlayedPlayedPoorTitle"
                  defaultMessage="Good/Light Played /Played /Poor :"
                />
              </h4>
              <p className="categorySubtitle">
                <FormattedMessage
                  id="app.page.priceShield.details.comparisonWithTrend"
                  defaultMessage="Comparison with trend"
                />
              </p>
              <ul>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.trend.rule1"
                    defaultMessage="A 'used' card whose selling price is less than 10 euros cannot have a sale price 80% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.trend.rule2"
                    defaultMessage="A 'used' card whose sale price is between 10 and 20 euros cannot have a sale price 60% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.trend.rule3"
                    defaultMessage="A 'used' card whose sale price is between 10 and 20 euros cannot have a sale price 50% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.trend.rule4"
                    defaultMessage="A 'used' card whose sale price is between 20 and 30 euros cannot have a sale price 50% lower than the trend."
                  />
                </li>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.trend.rule5"
                    defaultMessage="A 'used' card whose sale price is greater than 50 euros cannot have a sale price 30% lower than the trend."
                  />
                </li>
              </ul>
              <p className="categorySubtitle">
                <FormattedMessage
                  id="app.page.priceShield.details.comparisonWithOldPrice"
                  defaultMessage="Comparison with the old price"
                />
              </p>
              <ul>
                <li>
                  <FormattedMessage
                    id="app.page.priceShield.details.used.oldPrice.rule1"
                    defaultMessage="A 'used' card whose sale price is greater than 10 euros cannot have a sale price 60% lower than its old sale price."
                  />
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

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
      <div>
        <h3>
          <FormattedMessage
            id="app.page.summaryExample"
            defaultMessage="Example of summary received by mail"
          />
        </h3>
      </div>
      <img src="/pictures/pdfSummary.png" width="400px" />
    </div>
  );
};

export default PriceShield;
