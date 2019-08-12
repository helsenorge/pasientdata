import React, { Component } from "react";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import "./dashboardContent.css";
import { Link } from "react-router-dom";
// import FakeGlucoseData from "../../Utils/fakeGlucose";
// import Trends from "../../Utils/trends";
// import getStartEndTimes from "../../Utils/getStartEndTimes";
import { connect } from "react-redux";
import "./bloodSugarContent.css";
import { Line } from "rc-progress";
// import aggregateData from "../../Utils/aggregateData";
import { BLOODSUGAR } from "../../../dataTypes";
import { getAggregatedDataForDataType } from "../../../Utils/aggregatedDataForDataType";
import DashboardGraph from "./dashboardGraph";

class BloodSugarContent extends Component {
  render() {
    const aggregatedData = getAggregatedDataForDataType(
      this.props.baseInfo,
      this.props.patient.datasets,
      BLOODSUGAR,
      "dashboard"
    );
    /*
     * All of the following ended up not working right before the deadline
     * but it almost works, so didn't want to throw out.
     */

    // // Get fake glucosedata and aggregate for this week.
    // let data = FakeGlucoseData();
    // let { start, end } = getStartEndTimes("week", 0);
    // let aggregated = aggregateData(data, "day", start, end, "ddd");
    // // Get goal limits from redux store.
    // let lowerLimit = this.props.patient.goals.BloodSugarRangeGoal.lower;
    // let upperLimit = this.props.patient.goals.BloodSugarRangeGoal.upper;
    // // Calculate trends for this week.
    // let trends = Trends(data, upperLimit, lowerLimit);
    // let currentValue =
    //   (trends.timeWithin * 100) /
    //   (trends.timeAbove + trends.timeWithin + trends.timeBelow);
    // // Aggregate the fake data for previous week.
    // let { start: startPrev, end: endPrev } = getStartEndTimes(
    //   this.props.baseInfo.view,
    //   parseInt(this.props.baseInfo.nrOfIntervalsBack, 10) + 1
    // );
    // let prevAggregated = aggregateData(data, "day", startPrev, endPrev, "ddd");
    // // Caclulate trends for previous week.
    // let prevTrends = Trends(prevAggregated, upperLimit, lowerLimit);
    // let prevValue =
    //   prevTrends.timeWithin /
    //   (prevTrends.timeAbove + prevTrends.timeWithin + prevTrends.timeBelow);
    // // Calculate the two changes in trends.
    // let percentageChange = currentValue - prevValue;
    // let meanChange = trends.mean - prevTrends.mean;
    // // Get arrow imgs for use with trend values.
    const upTrianglePic = require("../../../Images/greenUpTriangle.svg");
    const downTrianglePic = require("../../../Images/greenDownTriangle.svg");
    return (
      <React.Fragment>
        <div className="main">
          <div className="left">
            <div className="average-div">
              <div className="average-left caption">Gj.snittlig:</div>
              <div className="average-right caption">
                {10} mmol/l
                {/* {Math.floor(trends.mean)} mmol/l */}
              </div>
            </div>
            <DashboardGraph
              aggregatedData={aggregatedData}
              dataType={BLOODSUGAR}
              patient={this.props.patient}
            />
          </div>
          <div className="right">
            <div className="caption">
              <div style={{ color: "black" }}>Tid innenfor grenseverdien:</div>
              <div>
                <div className="large-numerical-value time-within">
                  {74} %{/* {Math.floor(currentValue)} % */}
                </div>{" "}
                <Line
                  strokeWidth="5"
                  strokeColor="#85c99e"
                  // percent={currentValue}
                  percent={74}
                  trailWidth="5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="trend-div">
          <div className="left-trend">
            <img
              // src={meanChange > 0 ? upTrianglePic : downTrianglePic}
              src={downTrianglePic}
              alt={"logo"}
              className="trend-triangle"
            />
            <div>
              {/* {Math.floor(meanChange)} mmol/l */}
              -1 mmol/l
            </div>
          </div>
          <div className="right-trend">
            <img
              // src={percentageChange > 0 ? upTrianglePic : downTrianglePic}
              src={upTrianglePic}
              alt={"logo"}
              className="trend-triangle"
            />
            <div>2 %{/* {Math.floor(percentageChange)} % */}</div>
          </div>
          <div className="button-style">
            <Link to={"/bloodsugar"} style={{ borderBottom: "none" }}>
              <DisplayButton secondary>
                <div className="flex-container-button">
                  <div className="flex-children-button">Utforsk</div>
                  <ChevronRightRounded className="flex-children-button-icon chevronStyle" />
                </div>
              </DisplayButton>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(BloodSugarContent);
