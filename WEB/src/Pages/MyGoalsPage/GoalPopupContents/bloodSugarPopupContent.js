import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { connect } from "react-redux";
import { changeGoal } from "../../../Redux/actions";
import addGoal from "../../../Utils/addGoal";

class BloodSugarPopupContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentGoal: "",
      lowerLimit: "",
      upperLimit: ""
    };
  }
  handleSave = () => {
    if (
      this.state.percentGoal !== "" &&
      this.state.lowerLimit !== "" &&
      this.state.upperLimit !== ""
    ) {
      let goalRange = {
        type: "range",
        lower: this.state.lowerLimit,
        upper: this.state.upperLimit
      };
      this.props.changeGoal("BloodSugarRangeGoal", goalRange);

      let percentGoal = { type: "lower", value: this.state.percentGoal };
      this.props.changeGoal("BloodSugarWithinRangePercentageGoal", percentGoal);

      addGoal(
        "BloodSugarWithinRangePercentageGoal",
        percentGoal,
        "Percentage of time within desired blood sugar range",
        "%",
        "%",
        this.props.patient.googleId
      ); // percentage goal
      addGoal(
        "BloodSugarRangeGoal",
        goalRange,
        "Desired blood sugar range",
        "mg/dL",
        "mg/dL",
        this.props.patient.googleId
      ); // range goal
    }
  };
  handlepercentGoalChange = event => {
    this.setState({ percentGoal: event.target.value });
  };

  handlelowerLimitChange = event => {
    this.setState({ lowerLimit: event.target.value });
  };

  handleupperLimitChange = event => {
    this.setState({ upperLimit: event.target.value });
  };

  render = () => {
    return (
      <React.Fragment>
        <h2> Blodsukker</h2>
        <div>Tid innenfor grenseverdier</div>
        <div className="popup-content-center-text">
          <br />
          Jeg ønsker å være mer enn
          <input
            type="number"
            className="goal-input"
            id="single-input"
            value={this.state.percentGoal}
            onChange={this.handlepercentGoalChange}
          />
          prosent av tiden innenfor grenseverdien
          <hr />
          Jeg har oppnådd målet mellom
          <div className="sugar-input-div-parent">
            <input
              type="number"
              className="sugar-input-child goal-input"
              id="double-input1"
              value={this.state.lowerLimit}
              onChange={this.handlelowerLimitChange}
            />
            <div className="sugar-input-child"> og </div>
            <input
              type="number"
              className="sugar-input-child goal-input"
              id="double-input2"
              value={this.state.upperLimit}
              onChange={this.handleupperLimitChange}
            />
          </div>
          mmol/l
          <br />
          <br />
          <DisplayButton
            className="goal-save-button"
            onClick={event => {
              this.handleSave();
              this.props.onSave(event);
            }}
            secondary
          >
            Lagre
          </DisplayButton>
        </div>
      </React.Fragment>
    );
  };
}

const mapDispatchToProps = { changeGoal };

function mapStateToProps(state) {
  return {
    patient: state.patient
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BloodSugarPopupContent);
