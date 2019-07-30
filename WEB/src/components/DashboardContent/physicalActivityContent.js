import React from "react";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import PhysicalActivityGraph from "./DashboardGraphs/physicalActivityGraph";

const PhysicalActivityContent = (data, link, start, end) => {
  let startString = moment()
    .startOf("day")
    .subtract(1, "week")
    .add(1, "day");
  let endString = moment();
  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <PhysicalActivityGraph
          start={startString}
          end={endString}
          interval={"day"}
          outputFormat={"ddd"}
          data={data}
          legend="off"
          page="Dashboard"
          color={"rgba(89, 195, 255, 0.8)"}
        />
      </div>
      <InsightButton linkTo={link} />
    </div>
  );
};

export default PhysicalActivityContent;
