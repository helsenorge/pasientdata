import React, { Component } from "react";
import { Dropdown } from "@helsenorge/toolkit/components/atoms/dropdown";
import CardComponent from "../Card/cardComponent";
import "./insightCards.css";

class ViewCard extends Component {
  render() {
    return (
      <CardComponent content={<div className="view-div">Viser siste</div>} />
    );
  }
}

export default ViewCard;
