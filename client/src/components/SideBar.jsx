import React from "react";
import "../styles/style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = () => {
  return (
    <div className="sidebar-conatiner">
      <div className="sb-header">
        <AccountCircleIcon />
      </div>
      <div className="sb-search">search</div>
      <div className="sb-conversation">converstions</div>
    </div>
  );
};

export default SideBar;
