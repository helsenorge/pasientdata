import React, { Component } from "react";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import "../../Pages/Dashboard/DashboardContent/dashboardContent.css";
import { Link } from "react-router-dom";

/*
 * Button used to link to Insight pages of each dataset from the dashboard.
 * Must have a linkTo prop that is the /name_of_desired_insight_page, for
 * example "/bloodsugar". The used linkTo values are specified in cardInfoByDataType
 * found in /Pages/Dashboard/DashboardContent/dashboardGraphCard.js
 */

class InsightButton extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          alignSelf: "flex-end"
        }}
      >
        <Link to={this.props.linkTo} style={{ borderBottom: "none" }}>
          <button className="shape">
            <ChevronRightRounded className="chevronStyle" />
          </button>
        </Link>
      </div>
    );
  }
}

export default InsightButton;