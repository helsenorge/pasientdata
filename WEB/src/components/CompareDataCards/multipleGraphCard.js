import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import { connect } from "react-redux";
import PeriodStepper from "../PeriodStepper/periodStepper";
import weightContent from "../DashboardContent/weightContent";
import BloodSugarGraph from "./GraphContent/bloodSugarGraph";
import InsulinGraph from "./GraphContent/insulinGraph";
import StepsGraph from "./GraphContent/stepsGraph";
import WeightGraph from "./GraphContent/weightGraph";
import PhysicalActivityGraph from "./GraphContent/physicalActivityGraph";
import CarbohydratesGraph from "./GraphContent/carbohydratesGraph";

class MultipleGraphCard extends Component {
  makeBloodSugarGraph = bloodSugar => {
    if (bloodSugar) {
      return (
        <div className="flex-children-multiple-graph">
          <BloodSugarGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makeInsulinGraph = insulin => {
    if (insulin) {
      return (
        <div className="flex-children-multiple-graph">
          <InsulinGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makeStepsGraph = steps => {
    if (steps) {
      return (
        <div className="flex-children-multiple-graph">
          <StepsGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makeWeightGraph = weight => {
    if (weight) {
      return (
        <div className="flex-children-multiple-graph">
          <WeightGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makePhysicalActivityGraph = physicalActivity => {
    if (physicalActivity) {
      return (
        <div className="flex-children-multiple-graph">
          <PhysicalActivityGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makeCarbohydratesGraph = carbohydrates => {
    if (carbohydrates) {
      return (
        <div className="flex-children-multiple-graph">
          <CarbohydratesGraph />
        </div>
      );
    } else {
      return <div />;
    }
  };

  makePeriodStepper = data => {
    if (data) {
      return (
        <PeriodStepper
          start={this.props.baseInfo.start}
          end={this.props.baseInfo.end}
          periodName={this.props.baseInfo.view.periodName}
        />
      );
    }
  };

  makeContent = () => {
    let dataTypes = this.props.baseInfo;
    let bloodSugar = dataTypes.bloodSugarChecked;
    let insulin = dataTypes.insulinChecked;
    let steps = dataTypes.stepsChecked;
    let weight = dataTypes.weightChecked;
    let physicalActivity = dataTypes.physicalActivityChecked;
    let carbohydrates = dataTypes.carbohydratesChecked;

    return (
      <div>
        <div className="flex-container-multiple-graph">
          {this.makeBloodSugarGraph(bloodSugar)}
          {this.makeInsulinGraph(insulin)}
          {this.makeStepsGraph(steps)}
          {this.makeWeightGraph(weight)}
          {this.makePhysicalActivityGraph(physicalActivity)}
          {this.makeCarbohydratesGraph(carbohydrates)}
        </div>
        {this.makePeriodStepper(
          bloodSugar ||
            insulin ||
            steps ||
            weight ||
            physicalActivity ||
            carbohydrates
        )}
      </div>
    );
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
