import React, { useState, useEffect, useContext } from "react";
import "./areyousure.scss";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
const Areyousure = (props) => {
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();
  const { selectedUserData, dataChanged, setDataChanged, headers } =
    useContext(UserContext);
  const entity = selectedUserData?.row || {};
  let { state } = useLocation();
  // Use useEffect to handle transition effect when component mounts
  useEffect(() => {
    // Delay setting transition to true to allow CSS transition to take effect
    const timeout = setTimeout(() => {
      setTransition(true);
    }, 100); // Adjust the delay time as needed
    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, []);

  const closeModal = () => {
    setTransition(false);
    navigate(-1);
  };
  const handleDelete = async () => {
    console.log("Endpoint:", state);
    try {
      const response = await axios.delete(`${state.urlData}${entity.id}/`, {
        headers,
      });
      if (response) {
        // console.log(response);
        // console.log(entity);
      }
      if (response.request.status === 204) {
        setDataChanged(!dataChanged);
        navigate(-1);
      }
    } catch (error) {
      // console.error("Error deleting item:", error);
      if (error) {
        setTransition(false);
        alert("There was a problem deleting the selected item");
        navigate(-1);
      }
    }
  };
  return (
    <div className={transition ? "confirm_delete" : "confirm_delete hidden"}>
      <h1>Are you sure</h1>
      <h3>you want to delete?</h3>
      <div className="btns">
        <button onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Areyousure;
