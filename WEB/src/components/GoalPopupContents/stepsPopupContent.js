import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";

class StepsPopupContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }
  handleSave = () => {
    console.log(this.state.value);
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render = () => {
    return (
      <React.Fragment>
        <h2> Skritt</h2>
        <div className="popup-content-center-text">
          <br />
          Jeg ønsker å gå
          <input
            type="number"
            className="goal-input"
            id="single-input"
            value={this.state.value}
            onChange={this.handleChange}
          />
          skritt per dag
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

export default StepsPopupContent;
