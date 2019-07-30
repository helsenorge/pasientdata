import React, { Component } from "react";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import "./dashboardContent.css";
import { Link } from "react-router-dom";
import FakeGlucoseData from "../../Utils/fakeGlucose";
import Trends from "../../Utils/trends";
import getStartEndTimes from "../../Utils/getStartEndTimes";
import { connect } from "react-redux";
import "./blodsukkerContent.css";
import { Line } from "rc-progress";
import aggregateData from "../../Utils/aggregateData";

import BarPlotter from "../Barplotter/barPlotter";

class BlodsukkerContent extends Component {
  render() {
    let data = FakeGlucoseData();
    let { start, end } = getStartEndTimes("week", 0);
    let goalValue = this.props.patient.goals.BloodSugarWithinRangePercentageGoal
      .value;
    let lowerLimit = this.props.patient.goals.BloodSugarRangeGoal.lower;
    let upperLimit = this.props.patient.goals.BloodSugarRangeGoal.upper;
    let trends = Trends(data, upperLimit, lowerLimit);
    let currentValue =
      (trends.timeWithin * 100) /
      (trends.timeAbove + trends.timeWithin + trends.timeBelow);
    let { start: startPrev, end: endPrev } = getStartEndTimes(
      this.props.baseInfo.view,
      parseInt(this.props.baseInfo.nrOfIntervalsBack, 10) + 1
    );
    let prevAggregated = aggregateData(data, "day", startPrev, endPrev, "ddd");
    let prevTrends = Trends(prevAggregated, upperLimit, lowerLimit);
    let prevValue =
      prevTrends.timeWithin /
      (prevTrends.timeAbove + prevTrends.timeWithin + prevTrends.timeBelow);
    let trendValue = currentValue - prevValue;
    const upTrianglePic = require("../../Images/greenUpTriangle.svg");
    const downTrianglePic = require("../../Images/yellowDownTriangle.svg");
    return (
      <React.Fragment>
        <div className="flex-container glucose-main">
          <div className="flex-children average-glucose-parent left-glucose-div">
            <div className="upper-left-glucose-div">
              <div
                className="average-glucose-child caption"
                id="left-glucose-text"
              >
                Gj.snittligt:
              </div>
              <div
                className="average-glucose-child caption"
                id="right-glucose-text"
              >
                {Math.floor(trends.mean)} mmol/l
              </div>
              {/* <div className="glucose-plot">
              <BarPlotter
                start={start}
                end={end}
                interval={"day"}
                outputFormat={"ddd"}
                data={data}
                legend="off"
                page="Dashboard"
                color={"rgba(89, 195, 255, 0.8)"}
              />
            </div> */}
            </div>
            <div className="lower-left-glucose-div">
              <img
                src={trendValue > 0 ? upTrianglePic : downTrianglePic}
                alt={"logo"}
                className="glucose-trend-children"
              />
              <div className="glucose-trend-children">
                {Math.floor(trendValue)} mmol/l
              </div>
            </div>
          </div>
          <div className="flex-children caption">
            <div>Tid innenfor grenseverdien:</div>
            <div>
              {/* <br /> */}
              <div className="large-numerical-value glucose-time-within">
                {Math.floor(currentValue)} %
              </div>{" "}
              <Line
                strokeWidth="4"
                strokeColor="#85c99e"
                percent={currentValue}
                trailWidth="4"
              />
              {/* <br /> */}
            </div>
          </div>
        </div>

        <div>
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

export default connect(mapStateToProps)(BlodsukkerContent);
