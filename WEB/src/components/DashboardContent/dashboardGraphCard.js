import React, { Component } from "react";
import moment from "moment";
import CardComponent from "../Card/cardComponent";
import { connect } from "react-redux";
import { XAxis, BarChart, ResponsiveContainer } from "recharts";
import PeriodStepper from "../PeriodStepper/periodStepper";
import periodFromView from "../../Utils/periodFromView";
import aggregateData from "../../Utils/aggregateData";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import getFormat from "../../Utils/getFormat";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../../dataTypes";
import { getAggregatedDataForDataType } from "../../Utils/aggregatedDataForDataType";
import DashboardGraph from "./dashboardGraph";
import InsightButton from "../InsightButton/insightButton";

class DashboardGraphCard extends Component {
  makeGraph = dataType => {
    const aggregatedData = getAggregatedDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      dataType,
      "dashboard"
    );
    console.log(aggregatedData);
    return (
      <DashboardGraph
        aggregatedData={aggregatedData}
        dataType={this.props.dataType}
        patient={this.props.patient}
      />
    );
  };

  makeContent = link => {
    return (
      <div>
        <div style={{ marginBottom: "12px" }}>
          {this.makeGraph(this.props.dataType)}
        </div>
        <InsightButton linkTo={link} />
      </div>
    );
  };

  render() {
    const { link, title } = cardInfoByDataType[this.props.dataType];
    return <CardComponent title={title} content={this.makeContent(link)} />;
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(DashboardGraphCard);
const cardInfoByDataType = {
  [BLOODSUGAR]: {
    link: "/bloodsugar",
    title: "Blodsukker"
  },
  [INSULIN]: { link: "/insulin", title: "Insulin" },
  [STEPS]: {
    link: "/steps",
    title: "Skritt"
  },
  [WEIGHT]: {
    link: "/weight",
    title: "Vekt"
  },
  [PHYSICAL_ACTIVITY]: {
    link: "/physicalActivity",
    title: "Fysisk aktivitet"
  },
  [CARBOHYDRATES]: {
    link: "/carbohydrates",
    title: "Karbohydrater"
  }
};
