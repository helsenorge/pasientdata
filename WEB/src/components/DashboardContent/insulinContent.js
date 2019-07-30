import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import InsulinGraph from "./DashboardGraphs/insulinGraph";

const insulinContent = () => {
  let startString = moment()
    .startOf("day")
    .subtract(1, "week")
    .add(1, "day");
  let endString = moment();

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <InsulinGraph
          start={startString}
          end={endString}
          interval={"day"}
          outputFormat={"ddd"}
          legend="off"
          page="Dashboard"
          color={"rgba(89, 195, 255, 0.8)"}
        />
      </div>
      <InsightButton linkTo={"/insulin"} />
    </div>
  );
};

export default insulinContent;
