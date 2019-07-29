import React, { Component } from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { LightBox } from "@helsenorge/toolkit/components/molecules/lightbox";
import BloodSugarPopupContent from "../GoalPopupContents/bloodSugarPopupContent";
import BloodSugarMeanPopupContent from "../GoalPopupContents/bloodSugarMeanPopupContent";
import CarbsPopupContent from "../GoalPopupContents/carbsPopupContent";
import PhysicalActivityPopupContent from "../GoalPopupContents/physicalActivityPopupContent";
import StepsPopupContent from "../GoalPopupContents/stepsPopupContent";
import WeightPopupContent from "../GoalPopupContents/weightPopupContent";
import bloodPressurePopupContent from "../GoalPopupContents/bloodPressurePopupContent";
import "./changeGoalButton.css";

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
        break;
      case "BlodsukkerAvg":
        return (
          <BloodSugarMeanPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
        break;
      case "Skritt":
        return (
          <StepsPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
        break;
      case "Vekt":
        return (
          <WeightPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
        break;
      case "FysiskAktivitet":
        return (
          <PhysicalActivityPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
        break;
      case "Karbohydrater":
        return (
          <CarbsPopupContent
            onSave={event => {
              this.handleClick(event);
            }}
          />
        );
        break;
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
