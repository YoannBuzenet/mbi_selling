import React, { useContext } from "react";
import BlackDivContext from "../context/blackDivModalContext";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";
import MKM_ModalContext from "../context/mkmModalConnectionContext";
import PaymentModalContext from "../context/paymentModalContext";

// The black Div is the modal we display behind each 'absolute positionned' elements on the window.
// We give it the general ability to deactivate any absolute display by clicking on it.

const BlackDiv = () => {
  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivContext);

  //MKM Modal Control
  const { setIsMKMModalDisplayed } = useContext(MKM_ModalContext);

  // Payment Modal
  const { setPaymentModalInformation } = useContext(PaymentModalContext);

  //Responsive Menu control
  const { setIsResponsiveMenuDisplayed } = useContext(
    isResponsiveMenuDisplayedContext
  );

  const handleClick = (event) => {
    setIsResponsiveMenuDisplayed("deactivated");
    setIsBlackDivModalDisplayed("deactivated");
    setIsMKMModalDisplayed(false);
    setPaymentModalInformation({
      isDisplayed: false,
      amount: 0,
    });
  };

  return (
    <div className="blackDiv" onClick={(event) => handleClick(event)}></div>
  );
};

export default BlackDiv;
