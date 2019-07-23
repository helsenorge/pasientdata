import React, { Component } from "react";
import { Dropdown } from "@helsenorge/toolkit/components/atoms/dropdown";
import CardComponent from "../Card/cardComponent";
import "./visningsKort.css";

class VisningsKort extends Component {
  render() {
    return (
      <CardComponent
        content={<div className="visnings-div">Viser siste</div>}
      />
    );
  }
}

export default VisningsKort;
