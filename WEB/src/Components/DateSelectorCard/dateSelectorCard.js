import React, { Component } from "react";
import DateSelector from "../DateSelector/dateSelector";
import CardComponent from "../Card/cardComponent";
import "./dateSelectorCard.css";
import { connect } from "react-redux";

/*
 * Card containing the DateSelector, used to get custom start and end dates for graphing and trend calculations.
 */

class DateSelectorCard extends Component {
  makeContent = () => {
    return (
      <div className="custom-date-parent">
        <span className="custom-date-child">
          <DateSelector />
        </span>
      </div>
    );
  };

  render() {
    let className = "custom-date-card";
    if (this.props.baseInfo.view === "custom") {
      className = "custom-date-card custom-date-card-active";
    }
    return (
      <div className={className}>
        {this.props.baseInfo.view === "custom" ? (
          <CardComponent
            className="date-selector-card"
            title="Tilpasset dato"
            content={this.makeContent()}
          />
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    patient: state.patient,
    baseInfo: state.baseInfo
  };
}

export default connect(mapStateToProps)(DateSelectorCard);
