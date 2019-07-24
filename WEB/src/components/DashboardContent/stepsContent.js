import React from "react";
import InsightButton from "../InsightButton/insightButton";
import moment from "moment";
import BarPlotter from "../Barplotter/barPlotter";
import './stepsContent.css';

const stepsContent = (data, link) => {
  return (
    <div>
      <div style={{ "margin-bottom": "40px" }}>
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
