import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const ChartBox = (props) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <div className="view">
          <h1>{props.number}</h1>
          <Link to={props.link} style={{ color: props.color }}>
            View all
          </Link>
        </div>
      </div>
      {/* <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart
              data={[
                { name: "Sun", users: 400 },
                { name: "Mon", users: 600 },
                { name: "Tue", users: 500 },
                { name: "Wed", users: 700 },
                { name: "Thu", users: 400 },
                { name: "Fri", users: 500 },
                { name: "Sat", users: 450 },
              ]}
            >
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div> */}
    </div>
  );
};

export default ChartBox;
