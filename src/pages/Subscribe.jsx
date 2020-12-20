import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useIntl, FormattedMessage } from "react-intl";
import { returnProductNameSubscription } from "../services/productAPI";
import { toast } from "react-toastify";

import blackDivContext from "../context/blackDivModalContext";
import paymentModalContext from "../context/paymentModalContext";
import AuthContext from "../context/authContext";

const Subscribe = () => {
  const { setIsBlackDivModalDisplayed } = useContext(blackDivContext);
  const { paymentModalInformation, setPaymentModalInformation } = useContext(
    paymentModalContext
  );
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  //Hook Intl to translate an attribute
  const intl = useIntl();

  /* ************************ */
  /* ***** TRANSLATIONS ***** */
  /* ************************ */
  const translatedSubscribe = intl.formatMessage({
    id: "app.subscribePage.button.subscribe",
    defaultMessage: "Subscribe",
  });

  const oneMonthSubscribeTranslated = intl.formatMessage({
    id: "app.subscribePage.button.duration.oneMonth",
    defaultMessage: "One Month",
  });

  const threeMonthSubscribeTranslated = intl.formatMessage({
    id: "app.subscribePage.button.duration.threeMonth",
    defaultMessage: "Three Months",
  });

  const pleaseLoginOrregister = intl.formatMessage({
    id: "app.subscribePage.toast.pleaseLoginOrRegister",
    defaultMessage: "Please login to purchase a subscription !",
  });

  const handleSubscribe = (e, duration) => {
    //check if user is authenticated. if not, toast
    if (!authenticationInfos.isAuthenticated) {
      toast.info(pleaseLoginOrregister);
      return;
    }

    const messageToDisplayOnModal =
      duration === 1
        ? oneMonthSubscribeTranslated
        : threeMonthSubscribeTranslated;

    setIsBlackDivModalDisplayed("activated");
    setPaymentModalInformation({
      isDisplayed: true,
      amount: 50,
      title: messageToDisplayOnModal,
      articleName: returnProductNameSubscription(duration),
    });
  };

  return (
    <>
      <div>
        <h1 className="front-title">
          <FormattedMessage
            id="app.subscribePage.chooseYourPlan"
            defaultMessage="Choose the best plan for your business"
          />
        </h1>
        <div className="planContainer">
          <div className="planSubscribing">
            <p className="price">
              <span className="number">49</span>
              <span className="currency">€</span>
            </p>
            <p className="explaination">
              <FormattedMessage
                id="app.subscribePage.oneMonth"
                defaultMessage="One Month"
              />
            </p>
            <ul>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.UnlimitedPriceUpdates"
                    defaultMessage="Unlimited price updates"
                  />
                </p>
              </li>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.CustomizeYourOwnScripts"
                    defaultMessage="Customize your own scripts"
                  />
                </p>
              </li>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.PDFSummaryOfEachModification"
                    defaultMessage="PDF summary of each modification"
                  />
                </p>
              </li>
            </ul>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={(e) => handleSubscribe(e, 1)}
              >
                {translatedSubscribe}
              </Button>
            </div>
          </div>
          <div className="planSubscribing">
            <p className="price">
              <span className="number">29</span>
              <span className="currency">€</span>
            </p>
            <p className="explaination">
              <FormattedMessage
                id="app.subscribePage.threeMonths"
                defaultMessage="Three Month"
              />
            </p>
            <ul>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.UnlimitedPriceUpdates"
                    defaultMessage="Unlimited price updates"
                  />
                </p>
              </li>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.CustomizeYourOwnScripts"
                    defaultMessage="Customize your own scripts"
                  />
                </p>
              </li>
              <li>
                <p>
                  <FormattedMessage
                    id="app.subscribePage.PDFSummaryOfEachModification"
                    defaultMessage="PDF summary of each modification"
                  />
                </p>
              </li>
            </ul>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={(e) => handleSubscribe(e, 3)}
              >
                {translatedSubscribe}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
