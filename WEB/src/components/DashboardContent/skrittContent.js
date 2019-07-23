import React, { Component } from "react";
import InnsiktButton from "../InnsiktButton/innsiktButton";
import { connect } from "react-redux";
import moment from "moment";
import BarPlotterV2 from "../../components/Barplotter/barPlotterV2";

const skrittContent = data => {
  return (
    <div>
      <div style={{ "margin-bottom": "40px" }}>
        <BarPlotterV2
          start={moment().subtract(1, "week")}
          end={moment()}
          interval={"day"}
          outputFormat={"ddd"}
          data={data}
          legend="off"
          page="Dashboard"
        />
      </div>
      <InnsiktButton linkTo={"/skritt"} />
    </div>
  );
};

export default skrittContent;
