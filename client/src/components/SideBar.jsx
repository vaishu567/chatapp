import React, { useState } from "react";
import "../styles/style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightModeIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ConversationsItem from "./ConversationsItem";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { URL } from "../url";

const SideBar = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const [converstions, setConversations] = useState([
    { name: "Yuan", lastMessage: "Hello, are u up?", timeStamp: "today" },
    { name: "kurn", lastMessage: "done?", timeStamp: "today" },
    { name: "poona", lastMessage: "okay!", timeStamp: "today" },
    { name: "erum", lastMessage: "yeyy", timeStamp: "today" },
  ]);
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(URL + "/user/logout", config, {
        withCredentials: true,
      });
      console.log("Logout:", response);
      localStorage.removeItem("userData");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="sidebar-container">
      <div className={"sb-header"}>
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setLightTheme((prevValue) => {
                return !prevValue;
              });
            }}
          >
            {lightTheme && <NightModeIcon />}
            {!lightTheme && <LightModeIcon />}
          </IconButton>
          <IconButton onClick={logOutHandler}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="search-box" />
      </div>
      <div
        className="sb-conversation"
        onClick={() => {
          navigate("chat");
        }}
      >
        {converstions.map((convo) => {
          return <ConversationsItem props={convo} key={convo.name} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;
