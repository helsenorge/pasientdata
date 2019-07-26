import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

class BloodSugarPopupContent extends Component {
  constructor(props) {
    super(props);
    this.handleSingleChange = this.handleSingleChange.bind(this);

    this.state = {
      single: "",
      double1: "",
      double2: ""
    };
  }
  handleSave = () => {
    console.log(this.state.single);
    console.log(this.state.double1);
    console.log(this.state.double2);
  };
  handleSingleChange = event => {
    this.setState({ single: event.target.value });
  };

  handleDouble1Change = event => {
    this.setState({ double1: event.target.value });
  };

  handleDouble2Change = event => {
    this.setState({ double2: event.target.value });
  };

  render = () => {
    return (
      <React.Fragment>
        <h2> Blodsukker</h2>
        <div>Tid innenfor grenseverdier</div>
        <div className="popup-content-center-text">
          <br />
          Jeg ønsker å være
          <input
            type="number"
            className="goal-input"
            id="single-input"
            value={this.state.single}
            onChange={this.handleSingleChange}
          />
          prosent av tiden innenfor grenseverdien
          <hr />
          Jeg har oppnådd målet mellom
          <div className="sugar-input-div-parent">
            <input
              type="number"
              className="sugar-input-child goal-input"
              id="double-input1"
              value={this.state.double1}
              onChange={this.handleDouble1Change}
            />
            <div className="sugar-input-child"> og </div>
            <input
              type="number"
              className="sugar-input-child goal-input"
              id="double-input2"
              value={this.state.double2}
              onChange={this.handleDouble2Change}
            />
          </div>
          mmol/l
          <br />
          <br />
          <DisplayButton
            className="goal-save-button"
            onClick={this.handleSave}
            secondary
          >
            Lagre
          </DisplayButton>
        </div>
      </React.Fragment>
    );
  };
}

export default BloodSugarPopupContent;
