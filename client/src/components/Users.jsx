import React, { useEffect, useState } from "react";
import "../styles/style.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../icons/wechat.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Users = () => {
  const [refresh, setRefresh] = useState(true);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    navigate(-1);
  }
  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get(URL + "/user/fetchUsers", config).then((data) => {
      console.log("User Data from API", data);
      setUsers(data.data);
    });
  }, [refresh]);
  return (
    <>
      <div className="list-container">
        <div className="ug-header">
          <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className="ug-title">Available Users</p>
          <IconButton
            className="icon"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
        </div>
        <div className="sb-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input className="search-box" placeholder="search for a user" />
        </div>
        <div className="ug-list">
          {users.map((user, index) => {
            return (
              <div
                className="list-item"
                key={index}
                onClick={() => {
                  console.log("Creating chat with", user.name);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post(URL + "/chat", { userId: user._id }, config);
                }}
              >
                <p className="con-icon">{<AccountCircleIcon />}</p>
                <p className="con-title">{user.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Users;
