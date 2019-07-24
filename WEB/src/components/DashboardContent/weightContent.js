import React from "react";
import InsightButton from "../InsightButton/insightButton";

const weightContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>Her skal det stå noe om vekt</div>
      <InsightButton linkTo={"/weight"} />
    </div>
  );
};

export default weightContent;
