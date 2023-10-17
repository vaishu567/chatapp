import React from "react";
import "../styles/style.css";
import logo from "../icons/wechat.png";
import { IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";

const Groups = () => {
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
      </div>
      <div className="sb-search">
        <IconButton>
          <Search />
        </IconButton>
        <input className="search-box" placeholder="search for a user" />
      </div>
      <div className="sb-conversations"></div>
    </div>
  );
};

export default Groups;
