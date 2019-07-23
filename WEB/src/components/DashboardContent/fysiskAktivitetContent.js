import React from "react";
import InsightButton from "../InsightButton/insightButton";

const fysiskAktivitetContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om fysisk aktivitet
      </div>
      <InsightButton linkTo={"/fysiskAktivitet"} />
    </div>
  );
};

export default fysiskAktivitetContent;
