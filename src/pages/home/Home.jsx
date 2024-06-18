import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox.jsx";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";
const Home = () => {
  const { toner_requests, userdata, tonerdata, printerdata } =
    useContext(UserContext);
  const requests_length = Object.keys(toner_requests);
  const users_length = Object.keys(userdata);
  const toners_length = Object.keys(tonerdata);
  const printers_length = Object.keys(printerdata);
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox
          color="#8884d8"
          link="/users"
          icon="/userIcon.svg"
          title="Total Users"
          number={users_length.length}
          dataKey="users"
          percentage="45"
        />
      </div>
      <div className="box box3">
        <ChartBox
          color="skyblue"
          link="/toner_requests"
          icon="/productIcon.svg"
          title="Total Requests"
          number={requests_length.length}
          dataKey="users"
          percentage="45"
        />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox
          color="teal"
          link="/toners"
          icon="/productIcon.svg"
          title="Total Toners"
          number={toners_length.length}
          dataKey="users"
          percentage="45"
        />
      </div>
      <div className="box box6">
        <ChartBox
          color="gold"
          link="/printers"
          icon="/productIcon.svg"
          title="Total Printers"
          number={printers_length.length}
          dataKey="users"
          percentage="45"
        />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
