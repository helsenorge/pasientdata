import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";

const karbohydraterContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om karbohydrater
      </div>
      <InsightButton linkTo={"/karbohydrater"} />
    </div>
  );
};

export default karbohydraterContent;
