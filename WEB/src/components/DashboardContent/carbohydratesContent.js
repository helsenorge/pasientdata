import React from "react";
import "./dashboardContent.css";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import CarbsGraph from "./DashboardGraphs/carbsGraph";

const carbohydratesContent = () => {
  let startString = moment()
    .startOf("day")
    .subtract(1, "week")
    .add(1, "day");
  let endString = moment();

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <CarbsGraph
          start={startString}
          end={endString}
          interval={"day"}
          outputFormat={"ddd"}
          legend="off"
          page="Dashboard"
          color={"rgba(89, 195, 255, 0.8)"}
        />
      </div>
      <InsightButton linkTo={"/carbohydrates"} />
    </div>
  );
};

export default carbohydratesContent;
