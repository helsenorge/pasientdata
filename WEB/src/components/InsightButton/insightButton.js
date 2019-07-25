import React, { Component } from "react";
import ChevronRightRounded from "@helsenorge/toolkit/components/icons/ChevronRightRounded";
import "../DashboardContent/dashboardContent.css";
import { Link } from "react-router-dom";

class InsightButton extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          "justifyContent": "flex-end",
          "alignItems": "flex-end",
          "alignSelf": "flex-end",
          position: "absolute",
          bottom: "8px",
          right: "8px"
        }}
      >
        <Link to={this.props.linkTo} style={{ "borderBottom": "none" }}>
          <button className="shape">
            <ChevronRightRounded className="chevronStyle" />
          </button>
        </Link>
      </div>
    );
  }
}

export default InsightButton;
