import axios from "axios";
const accessToken = localStorage.getItem("access")
  ? localStorage.getItem("access")
  : null;
const headers = {
  "Content-Type": "application/json",
  Authorization: accessToken
    ? `Bearer ${accessToken}`
    : console.log("token not found"),
};

export default axios.create({
  headers: headers,
});
