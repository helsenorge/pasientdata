import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";

const insulinContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om insulin
      </div>
      <InsightButton linkTo={"/insulin"} />
    </div>
  );
};

export default insulinContent;
