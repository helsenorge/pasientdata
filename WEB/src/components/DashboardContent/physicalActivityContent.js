import React from "react";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import BarPlotter from "../Barplotter/barPlotter";

const PhysicalActivityContent = (data, link, goal) => {
  return (
    <div>
      <div>
        <BarPlotter
          start={moment()
            .subtract(1, "week")
            .endOf("day")}
          end={moment()}
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
