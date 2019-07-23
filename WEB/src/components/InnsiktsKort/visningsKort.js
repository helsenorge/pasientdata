import React, { Component } from "react";
import { Dropdown } from "@helsenorge/toolkit/components/atoms/dropdown";
import CardComponent from "../Card/cardComponent";

class VisningsKort extends Component {
  render() {
    return <CardComponent content={"Viser siste"} />;
  }
}

export default VisningsKort;
