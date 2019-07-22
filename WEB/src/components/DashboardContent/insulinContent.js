import React, { Component } from "react";
import "./dashboardContent.css";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";

const insulinContent = () => {
  return (
    <div>
      <div>Her skal det stå noe om insulin</div>
      <button className="shape">
        <ChevronRightRounded className="chevronStyle" />
      </button>
    </div>
  );
};

export default insulinContent;
