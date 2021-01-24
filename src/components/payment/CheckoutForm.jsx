import React, { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./style.css";
import blackDivContext from "../../context/blackDivModalContext";
import paymentModalContext from "../../context/paymentModalContext";
import AuthContext from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

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

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    //TO DO : add a catch with error
    //Get client secret on our server, then go on
    const apiData = await axios
      .post(`/payment/processPayment`, {
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
          name: "test string",
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        const apiSubscriptionData = await axios
          .post(`/payment/subscribe`, {
            token: clientSecret,
            idShop: authenticationInfos.shop.id,
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

  //TODO add a loader and disable the button while loading

  return (
    <div className="absolutePopIn">
      <h2>{paymentModalInformation.title}</h2>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button type="submit" disabled={!stripe}>
          <FormattedMessage
            id="app.modal.payment.button.pay"
            defaultMessage="Pay"
          />
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
