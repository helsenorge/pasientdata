import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { connect } from "react-redux";
import { changeGoal } from "../../../Redux/actions";
import addGoal from "../../../Utils/addGoal";

class BloodSugarMeanPopupContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: ""
    };
  }
  handleSave = () => {
    if (this.state.goal !== "") {
      let goal = { type: "upper", value: this.state.goal };
      // console.log("goal: ", goal);
      this.props.changeGoal("MeanGlucoseGoal", goal);
      addGoal(
        "MeanGlucoseGoal",
        goal,
        "Desired upper limit of the mean blood glucose",
        "mmol/l",
        "mmol/l",
        this.props.patient.googleId
      ); // range goal
    }
  };

  handleChange = event => {
    this.setState({ goal: event.target.value });
  };

  render = () => {
    return (
      <React.Fragment>
        <h2> Blodsukker</h2> Gjennomsnittlig nivå
        <div className="popup-content-center-text">
          <br />
          Jeg ønsker å ha mindre enn
          <input
            type="number"
            className="goal-input"
            id="single-input"
            value={this.state.value}
            onChange={this.handleChange}
          />
          mml/l i gjennomsnittlig glukoseverdi
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
)(BloodSugarMeanPopupContent);
