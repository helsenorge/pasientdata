import React, { Component } from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { LightBox } from "@helsenorge/toolkit/components/molecules/lightbox";
import BloodSugarPopupContent from "../GoalPopupContents/bloodSugarPopupContent";
import bloodSugarMeanPopupContent from "../GoalPopupContents/bloodSugarMeanPopupContent";
import carbsPopupContent from "../GoalPopupContents/carbsPopupContent";
import physicalActivityPopupContent from "../GoalPopupContents/physicalActivityPopupContent";
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
        return <BloodSugarPopupContent />;
        break;
      case "BlodsukkerAvg":
        return bloodSugarMeanPopupContent();
        break;
      case "Skritt":
        return <StepsPopupContent />;
        break;
      case "Vekt":
        return <WeightPopupContent />;
        break;
      case "FysiskAktivitet":
        return physicalActivityPopupContent();
        break;
      case "Karbohydrater":
        return carbsPopupContent();
        break;
      case "Blodtrykk":
        return bloodPressurePopupContent();
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
