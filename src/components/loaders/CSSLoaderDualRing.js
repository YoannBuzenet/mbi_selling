import React from "react";

const CSSLoaderDualRing = ({
  position = "static",
  top = "0px",
  left = "0px",
}) => {
  return <div class="lds-dual-ring" style={{ position, top, left }}></div>;
};

export default CSSLoaderDualRing;
