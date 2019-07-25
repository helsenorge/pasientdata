import React from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import "./goalContent.css";

const goalContent = (data, link) => {
  let COLORS = ["#E38B21", "#EEE05D", "#569B7E", "#EEE05D", "#E38B21"];
  let dataSet=[{ value: 1}, { value: 1}, { value: 1}, { value: 1}, { value: 1}];
  
  return (
    <div className="flex-container-trend-goals outer-div-trend-goals">
      <div className="split">
        <div className="circleBound">
          <div className="goalText">Mål:</div>
          <div className="goalPercentText">prosent</div>
          <div className="goalText">/dag</div>
        </div>
      </div>
      <div className="row split">
        <div className="pieChartStyle">
          <ResponsiveContainer
            className="flex-children-trend-goals"
            width={175}
            height={160}
          >
            <PieChart>
              <Pie
                data={dataSet}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={80}
                startAngle={220}
                endAngle={-40}
                fill="#8884d8"
              >
                {dataSet.map((entry, index) => (
                <Cell key="" fill={COLORS[index % COLORS.length]} />
              ))}
                <Label value={"status:"} position="center" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="button-style">
            <Link to={link} style={{ borderBottom: "none" }}>
              <DisplayButton secondary>
                <div className="flex-container-button">
                  <EditOutlined className="flex-children-button-icon editOutlinedStyle" />
                  <div className="flex-children-button editText">Rediger</div>
                </div>
              </DisplayButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default goalContent;
