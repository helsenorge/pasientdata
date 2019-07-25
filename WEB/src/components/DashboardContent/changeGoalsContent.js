import React from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { Link } from "react-router-dom";

const changeGoalsContent = () => {
  return (
    <div>
      <div>
        Opplever du at du överträffar målene dine eller trenger å justere dem?
        Prøv å endre målene.
      </div>
      <br />
      <div className="dashboard-button">
        <Link to={"/mygoals"} style={{ "borderBottom": "none" }}>
          <DisplayButton secondary>
            <div className={"dashboard-button-sizing"}>Gå til Mine mål </div>
          </DisplayButton>
        </Link>
      </div>
    </div>
  );
};
export default changeGoalsContent;
