import React from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

export default function bloodSugarPopupContent() {
  return (
    <React.Fragment>
      <h2> Blodsukker</h2>
      <div>Tid innenfor grenseverdier</div>
      <div className="popup-content-center-text">
        <br />
        Jeg ønsker å være
        <input type="number" className="goal-input" />
        prosent av tiden innenfor grenseverdien
        <hr />
        Jeg har oppnådd målet mellom
        <div className="sugar-input-div-parent">
          <input type="number" className="sugar-input-child goal-input" />
          <div className="sugar-input-child"> og </div>
          <input type="number" className="sugar-input-child goal-input" />
        </div>
        mmol/l
        <br />
        <br />
        <DisplayButton className="goal-save-button" secondary>
          Lagre
        </DisplayButton>
      </div>
    </React.Fragment>
  );
}
