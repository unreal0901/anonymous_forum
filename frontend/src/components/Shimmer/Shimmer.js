import React from "react";
import styles from "./Shimmer.module.css"; // Import the CSS module

const Shimmer = ({ w, h, br }) => {
  const givenWidth = w || "10rem";
  const givenHeight = h || "10rem";
  const givenBorderRadius = br || "10px";
  return (
    <div
      className={`${styles.shimmer}`} // Use the CSS module class here
      style={{
        width: givenWidth,
        height: givenHeight,
        borderRadius: givenBorderRadius,
      }}
    ></div>
  );
};

export default Shimmer;
