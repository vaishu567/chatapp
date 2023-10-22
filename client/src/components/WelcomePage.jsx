import React from "react";
import logo from "../icons/wechat.png";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  return (
    <div className="welcome-container">
      <img src={logo} alt="logo" className="welcome-logo" />
      <b> Hi, {userData?.data?.name}👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  );
};

export default WelcomePage;
