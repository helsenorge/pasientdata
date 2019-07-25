import React from "react";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import BarPlotter from "../Barplotter/barPlotter";

const stepsContent = (data, link) => {
  return (
    <div>
      <div style={{ "marginBottom": "40px" }}>
        <BarPlotter
          start={moment().subtract(1, "week")}
          end={moment()}
          interval={"day"}
          outputFormat={"ddd"}
          data={data}
          legend="off"
          page="Dashboard"
        />
      </div>
      <InsightButton linkTo={link} />
    </div>
  );
};

export default stepsContent;
