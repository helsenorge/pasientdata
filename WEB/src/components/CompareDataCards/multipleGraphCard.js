import React, { Component } from "react";
import moment from 'moment';
import CardComponent from "../Card/cardComponent";
import { connect } from "react-redux";
import {
  XAxis,
  BarChart,
  ResponsiveContainer
} from "recharts";
import PeriodStepper from "../PeriodStepper/periodStepper";
import BloodSugarGraph from "./GraphContent/bloodSugarGraph";
import InsulinGraph from "./GraphContent/insulinGraph";
import StepsGraph from "./GraphContent/stepsGraph";
import WeightGraph from "./GraphContent/weightGraph";
import PhysicalActivityGraph from "./GraphContent/physicalActivityGraph";
import CarbohydratesGraph from "./GraphContent/carbohydratesGraph";
import periodFromView from '../../Utils/periodFromView';
import formatInterval from '../../Utils/formatInterval';
import aggregateData from "../../Utils/aggregateData";
import getStartEndTimes from "../../Utils/getStartEndTimes";

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
          <WeightGraph data={this.props.patient.datasets[1].measurements} baseInfo={this.props.baseInfo} />
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
          <CarbohydratesGraph baseInfo={this.props.baseInfo} />
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

    let {periodName, periodNumber, intervalName} = periodFromView(this.props.baseInfo.view);
    let startEndTimes = getStartEndTimes(
        this.props.baseInfo.view,
        this.props.baseInfo.nrOfIntervalsBack
    );
    let start = startEndTimes.start;
    let end = startEndTimes.end;
    let xAxisTicks = aggregateData(
        [{value: 0, start: moment().subtract(periodNumber, periodName).format('YYYY-MM-DDTHH:mm:ss')}],
        intervalName,
        start,
        end,
        formatInterval(intervalName)
    );
    const noDataTypesChecked = (bloodSugar || insulin || steps || weight || physicalActivity || carbohydrates) == false;

    if(noDataTypesChecked) {
      return (
        <span>Valg de datatyper som du vill se sammelign mellan i listan nedan.</span>
      );
    } else {
        return (
        <div>
          <div className="flex-container-multiple-graph">
            {this.makeBloodSugarGraph(bloodSugar)}
            {this.makeInsulinGraph(insulin)}
            {this.makeStepsGraph(steps)}
            {this.makeWeightGraph(weight)}
            {this.makePhysicalActivityGraph(physicalActivity)}
            {this.makeCarbohydratesGraph(carbohydrates)}
            <ResponsiveContainer width="100%" height={30}>
              <BarChart width={350} height={30} data={xAxisTicks}
                  margin={{top:0, right: 30, left: 40, bottom: 0}}>
                  <XAxis dataKey="x" tick={{fontSize: '12px'}}/>
              </BarChart>
            </ResponsiveContainer>
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
    } 
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
