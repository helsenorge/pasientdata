import React from "react";
import InsightButton from "../InsightButton/insightButton";

const vektContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>Her skal det stå noe om vekt</div>
      <InsightButton linkTo={"/vekt"} />
    </div>
  );
};

export default vektContent;
