import React, { useContext } from "react";
import TransparentDivContext from "../context/transparentDivContext";
import MKM_ModalContext from "../context/mkmModalConnectionContext";

const TransparentDiv = () => {
  //Transparent Div Context
  const {
    isTransparentDivDisplayed,
    setIsTransparentDivDisplayed,
  } = useContext(TransparentDivContext);

  //MKM Modal Control
  const { isMKMModalDisplayed, setIsMKMModalDisplayed } = useContext(
    MKM_ModalContext
  );

  const closeEverything = (event) => {
    setIsTransparentDivDisplayed(false);
    setIsMKMModalDisplayed(false);
  };

  return (
    <div className="transparentDiv" onClick={(e) => closeEverything(e)}>
      Transparent Div
    </div>
  );
};

export default TransparentDiv;
