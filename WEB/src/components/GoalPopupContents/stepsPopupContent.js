import React from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

export default function stepsPopupContent() {
  return (
    <React.Fragment>
      <h2> Skritt</h2>
      <div className="popup-content-center-text">
        <br />
        Jeg ønsker å gå
        <input type="number" className="goal-input" id="single-input" />
        skritt per dag
        <br />
        <br />
        <DisplayButton className="goal-save-button" secondary>
          Lagre
        </DisplayButton>
      </div>
    </React.Fragment>
  );
}
