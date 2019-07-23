import React from "react";
import "./dashboardContent.css";
import InnsiktButton from "../InnsiktButton/innsiktButton";

const insulinContent = () => {
  return (
    <div>
      <div style={{ "margin-right": "40px" }}>
        Her skal det stå noe om insulin
      </div>
      <InnsiktButton linkTo={"/insulin"} />
    </div>
  );
};

export default insulinContent;
