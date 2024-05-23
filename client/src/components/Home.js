import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const logOut1 = () => {
    try {
      const { data } = axios.get("/user/logout");
      localStorage.removeItem("token");
      navigate("/signin");
      alert("logget");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="btn btn-info" onClick={logOut1}>
              LogOut
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
