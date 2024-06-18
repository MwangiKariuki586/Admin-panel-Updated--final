import { useContext } from "react";
import "./navbar.scss";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  const { authenticate } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Kenindia</span>
      </div>
      <div className="icons">
        <div className="user">
          <span>{authenticate?.staff_name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
