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
              <h3>Détails</h3>
              <p>
                Deux comparaisons ont lieu pour chaque carte : une avec la
                tendance MKM (foil ou non en fonction de la carte), et enfin une
                entre le prix actuel de la carte et son nouveau prix potentiel.
                Nous mesurons ainsi le taux de variation entre le nouveau prix
                et la tendance, et le taux de variation entre l'ancien prix et
                le nouveau prix.
              </p>
              <p className="priceShieldDetailsIntroduction">
                Le Price Shield vérifie d'abord la{" "}
                <strong>condition de la carte avant tout</strong>. Si elle est
                Mint, elle ne sera pas traitée de la même façon qu'une carte
                played.
              </p>
              <h4>Mint/Near Mint/Excellent : </h4>
              <p className="categorySubtitle">Comparaison avec la tendance</p>
              <ul>
                <li>
                  Une carte dont le prix de vente est inférieur à 5 euros ne
                  peut avoir un prix de vente 50% inférieur à la tendance.
                </li>
                <li>
                  Une carte dont le prix de vente est compris entre 5 et 10
                  euros ne peut avoir un prix de vente 30% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte dont le prix de vente est compris entre 10 et 20
                  euros ne peut avoir un prix de vente 20% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte dont le prix de vente est compris entre 20 et 50
                  euros ne peut avoir un prix de vente 15% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte dont le prix de vente est supérieur à 50 euros ne
                  peut avoir un prix de vente 10% inférieur à la tendance.
                </li>
              </ul>
              <p className="categorySubtitle">Comparaison avec l'ancien prix</p>
              <ul>
                <li>
                  Une carte dont le prix de vente est inférieur à 10 euros ne
                  peut avoir un prix de vente 60% inférieur à son ancien prix de
                  vente.
                </li>
                <li>
                  Une carte dont le prix de vente est compris entre 10 et 20
                  euros ne peut avoir un prix de vente 40% inférieur à son
                  ancien prix de vente.
                </li>
                <li>
                  Une carte dont le prix de vente est supérieur à 20 euros ne
                  peut avoir un prix de vente 30% inférieur à son ancien prix de
                  vente.
                </li>
              </ul>
              <h4>Good/Light Played /Played /Poor : </h4>
              <p className="categorySubtitle">Comparaison avec la tendance</p>
              <ul>
                <li>
                  Une carte "usée" dont le prix de vente est inférieur à 10
                  euros ne peut avoir un prix de vente 80% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte "usée" dont le prix de vente est compris entre 10 et
                  20 euros ne peut avoir un prix de vente 60% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte "usée" dont le prix de vente est compris entre 20 et
                  30 euros ne peut avoir un prix de vente 50% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte "usée" dont le prix de vente est compris entre 30 et
                  50 euros ne peut avoir un prix de vente 40% inférieur à la
                  tendance.
                </li>
                <li>
                  Une carte "usée" dont le prix de vente est supérieur à 50
                  euros ne peut avoir un prix de vente 30% inférieur à la
                  tendance.
                </li>
              </ul>
              <p className="categorySubtitle">Comparaison avec l'ancien prix</p>
              <ul>
                <li>
                  Une carte "usée" dont le prix de vente est supérieur à 20
                  euros ne peut avoir un prix de vente 60% inférieur à son
                  ancien prix de vente.
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
