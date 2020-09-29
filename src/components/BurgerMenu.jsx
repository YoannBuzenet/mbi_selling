import React, { useContext } from "react";
import isResponsiveMenuDisplayedContext from "../context/menuDisplayedContext";
import BlackDivModalContext from "../context/blackDivModalContext";

const BurgerMenu = () => {
  //Black Div control
  const { setIsBlackDivModalDisplayed } = useContext(BlackDivModalContext);

  //Is Menu Responsive Displayed
  const {
    isResponsiveMenuDisplayed,
    setIsResponsiveMenuDisplayed,
  } = useContext(isResponsiveMenuDisplayedContext);

  const handleClick = (event) => {
    if (isResponsiveMenuDisplayed === "deactivated") {
      setIsResponsiveMenuDisplayed("activated");
      setIsBlackDivModalDisplayed("activated");
    } else {
      setIsResponsiveMenuDisplayed("deactivated");
      setIsBlackDivModalDisplayed("deactivated");
    }
  };

  return (
    <div className="burger-menu" onClick={(event) => handleClick(event)}>
      <img src="/pictures/burger-menu.png" alt="" />
    </div>
  );
};

export default BurgerMenu;
