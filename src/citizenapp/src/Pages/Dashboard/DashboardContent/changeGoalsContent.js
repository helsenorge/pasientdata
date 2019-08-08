import React from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { Link } from "react-router-dom";

const changeGoalsContent = () => {
  return (
    <div>
      <div style={{ color: "black" }}>
        Om du har behov for å justere målene dine kan du endre på dem.
      </div>
      <br />
      <div className="dashboard-button">
        <Link to={"/mygoals"} style={{ borderBottom: "none" }}>
          <DisplayButton secondary>
            <div className={"dashboard-button-sizing"}>Gå til Mine mål </div>
          </DisplayButton>
        </Link>
      </div>
    </div>
  );
};
export default changeGoalsContent;
