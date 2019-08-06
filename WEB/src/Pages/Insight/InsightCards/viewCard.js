import React, { Component } from "react";
import CardComponent from "../../../components/Card/cardComponent";
import DateDropdown from "../../../components/DateDropdown/dateDropdown";
import "./insightCards.css";

class ViewCard extends Component {
  state = { view: "To uker" };

  makeContent = () => {
    return (
      <div className="view-parent">
        <div className="view-div subheader">Viser siste</div>
        <div className="view-child">
          <DateDropdown name={this.state.view} />
        </div>
      </div>
    );
  };

  render() {
    return <CardComponent content={this.makeContent()} />;
  }
}

export default ViewCard;
