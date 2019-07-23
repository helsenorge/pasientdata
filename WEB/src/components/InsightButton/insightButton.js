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
          "justify-content": "flex-end",
          "align-items": "flex-end",
          "align-self": "flex-end",
          position: "absolute",
          bottom: "8px",
          right: "8px"
        }}
      >
        <Link to={this.props.linkTo} style={{ "border-bottom": "none" }}>
          <button onClick={this.onClick} className="shape">
            <ChevronRightRounded className="chevronStyle" />
          </button>
        </Link>
      </div>
    );
  }
}

export default InsightButton;
