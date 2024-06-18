import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

const PieChartBox = () => {
  const { tonerdata } = useContext(UserContext);
  const [chartData, setChartData] = useState([]);
  const [topOptions, setTopOptions] = useState([]);
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  useEffect(() => {
    // Add random color to each tonerdata item
    const coloredTonerData = tonerdata.map((item) => ({
      ...item,
      color: randomColor(),
    }));

    setChartData(coloredTonerData);

    // Sort coloredTonerData by quantity in descending order and take the top 4 for options
    const sortedTopOptions = coloredTonerData
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 4);

    setTopOptions(sortedTopOptions);
  }, [tonerdata]);

  return (
    <div className="pieChartBox">
      <h1>Leads</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={chartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="quantity"
              nameKey="Toner_name"
            >
              {chartData.map((item) => (
                <Cell key={item.id} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {topOptions.slice(0, 4).map((item) => (
          <div className="option" key={item.id}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.Toner_name}</span>
            </div>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
