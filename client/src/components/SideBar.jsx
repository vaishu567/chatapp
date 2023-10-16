import React, { useState } from "react";
import "../styles/style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import LightModeIcon from "@mui/icons-material/LightMode";
import NightModeIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ConversationsItem from "./ConversationsItem";

const SideBar = () => {
  const [converstions, setConversations] = useState([
    { name: "Yuan", lastMessage: "Hello, are u up?", timeStamp: "today" },
    { name: "kurn", lastMessage: "done?", timeStamp: "today" },
    { name: "poona", lastMessage: "okay!", timeStamp: "today" },
    { name: "erum", lastMessage: "yeyy", timeStamp: "today" },
  ]);
  return (
    <div className="sidebar-conatiner">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightModeIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="search-box" />
      </div>
      <div className="sb-conversation">
        {converstions.map((convo) => {
          return <ConversationsItem props={convo} key={convo.name} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;
