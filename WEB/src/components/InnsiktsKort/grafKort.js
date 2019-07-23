import React, { Component } from "react";
import CardComponent from "../Card/cardComponent";
import BarPlotterV2 from "../Barplotter/barPlotterV2";
import FakeGlucoseData from "../../Utils/fakeGlucose";

class Oversiktkort extends Component {
  grafContent = () => {
    if (this.props.datatype === "Blodsukker") {
      const data = FakeGlucoseData();
      return (
        <BarPlotterV2
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
