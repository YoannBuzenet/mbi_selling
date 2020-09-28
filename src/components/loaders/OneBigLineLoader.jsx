import React from "react";
import ContentLoader from "react-content-loader";

const OneBigLineLoader = () => (
  <ContentLoader
    speed={2}
    width={150}
    height={30}
    viewBox="0 0 150 30"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="downsize-icon"
  >
    <rect x="1" y="2" rx="0" ry="0" width="144" height="29" />
  </ContentLoader>
);

export default OneBigLineLoader;
