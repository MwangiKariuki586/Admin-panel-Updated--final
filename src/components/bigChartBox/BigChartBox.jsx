import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
import { useContext } from "react";

const data = [
  {
    name: "Sun",
    IT: 4000,
    BRANCH_1: 2400,
    AUDIT: 2400,
  },
  {
    name: "Mon",
    IT: 3000,
    BRANCH_1: 1398,
    AUDIT: 2210,
  },
  {
    name: "Tue",
    IT: 2000,
    BRANCH_1: 9800,
    AUDIT: 2290,
  },
  {
    name: "Wed",
    IT: 2780,
    BRANCH_1: 3908,
    AUDIT: 2000,
  },
  {
    name: "Thu",
    IT: 1890,
    BRANCH_1: 4800,
    AUDIT: 2181,
  },
  {
    name: "Fri",
    IT: 2390,
    BRANCH_1: 3800,
    AUDIT: 2500,
  },
  {
    name: "Sat",
    IT: 3490,
    BRANCH_1: 4300,
    AUDIT: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Requests Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="AUDIT"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="BRANCH_1"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="IT"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
