import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import { connect } from "react-redux";

class MultipleGraphCard extends Component {
  make;
  makeContent = () => {
    let dataTypes = this.props.baseInfo;
    let bloodSugar = dataTypes.bloodSugarChecked;
    let insulin = dataTypes.insulinChecked;
    let steps = dataTypes.stepsChecked;
    let weight = dataTypes.weightChecked;
    let physicalActivity = dataTypes.physicalActivityChecked;
    let carbohydrates = dataTypes.carbohydratesChecked;

    return <div>masse grafer</div>;
  };
  render() {
    return <CardComponent title={"Over tid"} content={this.makeContent()} />;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(MultipleGraphCard);
