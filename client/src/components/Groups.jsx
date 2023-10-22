import React, { useEffect, useState } from "react";
import "../styles/style.css";
import logo from "../icons/wechat.png";
import { IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Refresh from "@mui/icons-material/Refresh";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { URL } from "../url";

const Groups = () => {
  const [groups, SetGroups] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  const user = userData.data;
  console.log(user.token);
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(URL + "/chat/fetchGroups", config, { withCredentials: true })
      .then((response) => {
        SetGroups(response.data);
      });
  }, [user.token]);

  return (
    <div className="list-container">
      <div className="ug-header">
        <img
          src={logo}
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
        />
        <h3 className="text" style={{ color: "#657d65" }}>
          Available Groups
        </h3>
        <IconButton
          className="icon"
          onClick={() => {
            // setRefresh(!refresh);
          }}
        >
          <Refresh />
        </IconButton>
      </div>
      <div className="sb-search">
        <IconButton className="icon">
          <Search />
        </IconButton>
        <input className="search-box" placeholder="search for a user" />
      </div>
      <div className="ug-list">
        {groups.map((group, index) => {
          return (
            <div
              className="list-item"
              key={index}
              onClick={() => {
                const config = {
                  headers: {
                    authorization: `Bearer ${userData.data.token}`,
                  },
                };
                axios.put(
                  URL + "/chat/addSelfToGroup",
                  {
                    chatId: group._id,
                    userId: userData.data._id,
                  },
                  config
                );
                // dispatch(refreshSidebarFun());
              }}
            >
              <p className="con-icon">
                <AccountCircle />
              </p>
              <p className="con-title">{group.chatName}</p>
            </div>
          );
        })}
      </div>
      <div className="sb-conversations"></div>
    </div>
  );
};

export default Groups;
