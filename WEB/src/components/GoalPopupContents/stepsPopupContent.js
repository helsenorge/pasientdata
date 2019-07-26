import React, { Component } from "react";
import "./popupContent.css";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import { connect } from "react-redux";
import { changeGoal } from "../../Redux/actions";

class StepsPopupContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: ""
    };
  }
  handleSave = () => {
    let goal = { type: "lower", value: this.state.percentGoal };
    this.props.changeGoal("StepsGoal", goal);
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

const mapDispatchToProps = { changeGoal };

function mapStateToProps(state) {
  return {
    pasientInfo: state.pasientInfo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsPopupContent);
