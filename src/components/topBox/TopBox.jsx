import "./topBox.scss";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";

const TopBox = () => {
  const { toner_requests } = useContext(UserContext);
  return (
    <div className="topBox">
      <h1>Latest Requests</h1>
      <div className="list">
        {toner_requests.slice(0, 7).map((tonerRequest) => (
          <div className="listItem" key={tonerRequest.id}>
            <div className="user">
              <div className="userTexts">
                <span className="username">{tonerRequest.user_staffname}</span>
                <span className="staffid">{tonerRequest.user_staffid}</span>
              </div>
            </div>
            <span className="toner_name">{tonerRequest.toner_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
