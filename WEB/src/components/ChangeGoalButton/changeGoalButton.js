import React, { Component } from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { LightBox } from "@helsenorge/toolkit/components/molecules/lightbox";
import BloodSugarPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/bloodSugarPopupContent";
import BloodSugarMeanPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/bloodSugarMeanPopupContent";
import CarbsPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/carbsPopupContent";
import PhysicalActivityPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/physicalActivityPopupContent";
import StepsPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/stepsPopupContent";
import WeightPopupContent from "../../Pages/MyGoalsPage/GoalPopupContents/weightPopupContent";
import "./changeGoalButton.css";

/*
 * When ChangeGoalButton is clicked a lightbox pops up that gives the option of changing the relevant goal.
 * Which goal is relevant is chosen base on this.props.datatype that needs to be sent in to the component.
 * The different goal contents are all in the folder /Pages/MyGoalsPage/GoalPopupContents. When a new goal
 * is selected and the save button is pressed, the goal is added to redux store and sent to the fhir server.
 */

class ChangeGoalButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      open: false
    };
  }

  handleClick(event) {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
    if (event) {
      event.preventDefault();
    }
  }

  popupContent() {
    switch (this.props.datatype) {
      case "Blodsukker":
        return (
          <BloodSugarPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      case "BlodsukkerAvg":
        return (
          <BloodSugarMeanPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      case "Skritt":
        return (
          <StepsPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      case "Vekt":
        return (
          <WeightPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      case "FysiskAktivitet":
        return (
          <PhysicalActivityPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      case "Karbohydrater":
        return (
          <CarbsPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
      default:
        return;
    }
  }
  render() {
    const button = (
      <DisplayButton onClick={this.handleClick} secondary>
        <div className="flex-container-button">
          <EditOutlined className="flex-children-button-icon editOutlinedStyle" />
          <div className="flex-children-button editText">Rediger</div>
        </div>
      </DisplayButton>
    );
    let lightbox = (
      <LightBox
        isVisible={this.state.open}
        onClose={this.handleClick}
        noAbort={false}
        noCloseButton={true}
        noPadding={false}
        small={false}
        medium={false}
        large={false}
      >
        {"Rediger mål for:"}
        {this.popupContent()}
      </LightBox>
    );

    return (
      <div>
        {button}
        {lightbox}
      </div>
    );
  }
}

export default ChangeGoalButton;
