import React from "react";
import logo from "../icons/wechat.png";
import "../styles/style.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <img src={logo} alt="logo" className="welcome-logo" />
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default WelcomePage;
