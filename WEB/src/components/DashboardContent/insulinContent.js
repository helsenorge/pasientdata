import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import InsulinGraph from "./DashboardGraphs/insulinGraph";
import DashboardGraph from "./dashboardGraph";
import { getAggregatedDataForDataType } from "../../Utils/aggregatedDataForDataType";
import {
  BLOODSUGAR,
  INSULIN,
  STEPS,
  WEIGHT,
  PHYSICAL_ACTIVITY,
  CARBOHYDRATES
} from "../../dataTypes";

const insulinContent = () => {
  let startString = moment()
    .startOf("day")
    .subtract(1, "week")
    .add(1, "day");
  let endString = moment();
  const aggregatedData = getAggregatedDataForDataType(
    this.props.baseInfo,
    this.props.patient.datasets,
    INSULIN,
    "dashboard"
  );
  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        {this.DashboardGraph(aggregatedData, INSULIN)}
      </div>
      <InsightButton linkTo={"/insulin"} />
    </div>
  );
};

export default insulinContent;
