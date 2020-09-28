import React from "react";
import ContentLoader from "react-content-loader";

const OneLineLoader = () => (
  <ContentLoader
    speed={2}
    width={80}
    height={25}
    viewBox="0 0 140 25"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="one-line-loader"
  >
    <rect x="1" y="2" rx="0" ry="0" width="144" height="21" />
  </ContentLoader>
);

export default OneLineLoader;
