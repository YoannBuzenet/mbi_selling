import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./style.css";
import blackDivContext from "../../context/blackDivModalContext";
import paymentModalContext from "../../context/paymentModalContext";
import AuthContext from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import CSSLoaderDualRing from "../loaders/CSSLoaderDualRing";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = () => {
  const { setIsBlackDivModalDisplayed } = useContext(blackDivContext);
  const { paymentModalInformation, setPaymentModalInformation } = useContext(
    paymentModalContext
  );

  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const [
    hasReadGeneralSalesConditions,
    setHasReadGeneralSalesConditions,
  ] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    //Get client secret on our server, then go on
    const apiData = await axios
      .post(`/payment/process/`, {
        productData: paymentModalInformation.articleName,
        idShop: authenticationInfos.shop.id,
      })
      .catch((error) => {
        console.error("error while creating payment", error);
        toast.error(
          <FormattedMessage
            id="app.modal.payment.failure"
            defaultMessage="Payment could not be proceeded. Please try later."
          />
        );
      });

    const clientSecret = apiData.data.client_secret;

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: authenticationInfos.shop.legalName,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result?.error?.message);
      toast.error(result?.error?.message);
      setIsLoading(false);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const apiSubscriptionData = await axios
          .post(`/payment/process/subscribe`, {
            token: clientSecret,
            idShop: authenticationInfos.shop.id,
          })
          .then((resp) => {
            toast.success(
              <FormattedMessage
                id="app.modal.payment.success"
                defaultMessage="Your paiment has been received. Your are now subscribed."
              />
            );
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("error while creating payment", error);
            toast.error(
              <FormattedMessage
                id="app.modal.payment.failureAfterSuccess"
                defaultMessage="There has been an error after the payment did proceed. Please contact us."
              />
            );
          });
      }
    }
  };

  const handleChange = (event) => {
    setHasReadGeneralSalesConditions(!hasReadGeneralSalesConditions);
  };

  return (
    <div className="absolutePopIn">
      <h2>{paymentModalInformation.title}</h2>

      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <div className="generalSalesConditions">
          <Checkbox
            checked={hasReadGeneralSalesConditions}
            onChange={handleChange}
            size="medium"
            color="primary"
          />
          <FormattedMessage
            id="app.modal.generalConditions.checkIn.firstPart"
            defaultMessage="I have read and accepted the "
          />
          <a href="/general-sales-conditions" target="_blank">
            <FormattedMessage
              id="app.modal.generalConditions.checkIn.SecondPartLink"
              defaultMessage="Conditions of Sales."
            />
          </a>
        </div>
        <div class="paymentPopInButtons">
          <button
            type="submit"
            disabled={!stripe || isLoading || !hasReadGeneralSalesConditions}
          >
            <FormattedMessage
              id="app.modal.payment.button.pay"
              defaultMessage="Pay"
            />
          </button>
          {isLoading && (
            <CSSLoaderDualRing position="absolute" top="5px" left="230px" />
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
