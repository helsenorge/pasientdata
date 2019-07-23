import React from "react";
import InsightButton from "../InsightButton/insightButton";

const skrittContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om antall skritt
      </div>
      <InsightButton linkTo={"/skritt"} />
    </div>
  );
};

export default skrittContent;
