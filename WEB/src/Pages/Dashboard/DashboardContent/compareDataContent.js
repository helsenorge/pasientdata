import React from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { Link } from "react-router-dom";
import "./dashboardContent.css";

const compareDataContent = () => {
  return (
    <div>
      <div style={{ color: "black" }}>
        Forstå dine resultater bedre ved å sammenligne data.
      </div>
      <br />
      <div className="dashboard-button">
        <Link to={"/comparedata"} style={{ borderBottom: "none" }}>
          <DisplayButton secondary>
            <div className={"dashboard-button-sizing"}>
              Gå til Sammenlign data{" "}
            </div>
          </DisplayButton>
        </Link>
      </div>
    </div>
  );
};

export default compareDataContent;
