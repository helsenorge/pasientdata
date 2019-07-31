import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { connect } from "react-redux";
import { changeGoal } from "../../../Redux/actions";
import addGoal from "../../../Utils/addGoal";

class CarbsPopupContent extends Component {
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
      this.props.changeGoal("CarbsGoal", goal);
      addGoal(
        "CarbsGoal",
        goal,
        "Max grams of carbohydrates per day",
        "g",
        "g",
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
        <h2> Fysisk aktivitet</h2>
        <div className="popup-content-center-text">
          <br />
          Jeg ønsker å spise mindre enn
          <input
            type="number"
            className="goal-input"
            id="single-input"
            value={this.state.value}
            onChange={this.handleChange}
          />
          gram karbohydrater per dag
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
)(CarbsPopupContent);
