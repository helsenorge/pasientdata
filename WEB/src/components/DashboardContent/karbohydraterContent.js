import React from "react";
import "./dashboardContent.css";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const karbohydraterContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om karbohydrater
      </div>
      <InnsiktButton linkTo={"/karbohydrater"} />
    </div>
  );
};

export default karbohydraterContent;
