import React from "react";
import "./Notfound.scss";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="notfound_wrapper">
      <div className="notfound_container">
        <h1 className="notfound_heading">404 - Page Not Found</h1>
        <p className="notfound_paragraph">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to={"/"}>
          <button className="notfound_btn">Return Home</button>
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
