import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";

const carbohydratesContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om karbohydrater
      </div>
      <InsightButton linkTo={"/carbohydrates"} />
    </div>
  );
};

export default carbohydratesContent;
