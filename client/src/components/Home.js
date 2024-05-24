import axios from "axios";
import React, { useEffect, useState } from "react";
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
  // userprofile
  const [profile, setProfile] = useState("");
  const { userName, email, role, createdAt } = profile;
  const userProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/user/userprofile"
      );
      setProfile(data);
      console.log(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userProfile();
  }, []);
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
        <div className="row">
          <div className="row">
            <div className="col-sm-4">
              <div className="card card_dashboard">
                <div className="card-header">
                  <b>User Dashboard</b>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> Name: {userName}</li>
                  <li className="list-group-item"> E-mail: {email}</li>
                  <li className="list-group-item">
                    {" "}
                    Join at: {new Date(createdAt).toLocaleDateString()}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    {role === 1 ? "Admin" : "Registred User"}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-8">
              <h4>other col</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
