import React from 'react';
import moment from "moment";
import {
  YAxis,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import aggregateData from "../../../Utils/aggregateData";
import periodFromView from '../../../Utils/periodFromView';
import formatInterval from '../../../Utils/formatInterval';
import getStartEndTimes from '../../../Utils/getStartEndTimes';

const CarbohydratesGraph = ({data, baseInfo}) => {
  let {periodName, periodNumber, intervalName} = periodFromView(baseInfo.view);
  data = data || [{value: 0, start: moment().subtract(periodNumber, periodName).format('YYYY-MM-DDTHH:mm:ss')}]; //Fake data to present in prototype

  let startEndTimes = getStartEndTimes(
    baseInfo.view,
    baseInfo.nrOfIntervalsBack
  );
  let start = startEndTimes.start;
  let end = startEndTimes.end;

  let aggregated = aggregateData(
      data,
      intervalName,
      start,
      end,
      formatInterval(intervalName)
  );
  const noRecentData = aggregated.filter(data => data.y > 0).length === 0;
  //Fake data to present in prototype
  if(noRecentData) {
    aggregated = aggregated.map((data, index) => ({x: data.x[0], y: fakeCarboHydratesData[index % fakeCarboHydratesData.length]}));
  }
  return (
      <div>
          <ResponsiveContainer width="100%" height={150}>
              <BarChart width={350} height={150} data={aggregated}
                  margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                <YAxis
                    label={{value:"g", position: 'top', offset: 10, fontSize: "12px"}}
                    tick={{fontSize: '12px'}}
                    width={40}
                />
                <Bar dataKey='y' fill='#EEE05D' />
              </BarChart>
          </ResponsiveContainer>
      </div>
  );
}

export default CarbohydratesGraph;

const fakeCarboHydratesData = [250, 260, 220, 270, 300, 230, 150, 180];
