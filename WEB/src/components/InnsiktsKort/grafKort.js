import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import BarPlotter from "../Barplotter/barPlotter";
import FakeGlucoseData from "../../Utils/fakeGlucose";

class Oversiktkort extends Component {
  grafContent = () => {
    if (this.props.datatype === "Blodsukker") {
      const data = FakeGlucoseData();
      return (
        <BarPlotter
          start={data[0].start}
          end={data[data.length - 1].start}
          interval={"minute"}
          outputFormat={"HH:mm"}
          data={data}
        />
      );
    }
    return "Under construction...";
  };
  render() {
    return <CardComponent title="Graf" content={this.grafContent()} />;
  }
}

export default Oversiktkort;
