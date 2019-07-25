import React from "react";
import { DisplayButton } from "@helsenorge/toolkit/components/atoms/buttons/display-button";
import EditOutlined from "@helsenorge/toolkit/components/icons/EditOutlined";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import "./goalContent.css";

const bloodPressureContent = (title, data) => {
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
            width={150}
            height={175}
          >
            <PieChart width={60} height={20}>
              <Pie
                data={[{ value: 100, name: "hei" }]}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                fill="#8884d8"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="button-style">
            <Link to={"/mygoals"} style={{ borderBottom: "none" }}>
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

export default bloodPressureContent;
