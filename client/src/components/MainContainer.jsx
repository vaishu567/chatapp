import React, { useState } from "react";
import "../styles/style.css";
import SideBar from "./SideBar";
import ChatArea from "./ChatArea";

const MainContainer = () => {
  const [converstions, setConversations] = useState([
    { name: "Yuan", lastMessage: "Hello, are u up?", timeStamp: "today" },
    { name: "kurn", lastMessage: "done?", timeStamp: "today" },
    { name: "poona", lastMessage: "okay!", timeStamp: "today" },
    { name: "erum", lastMessage: "yeyy", timeStamp: "today" },
  ]);
  return (
    <div className="main-container">
      <SideBar />
      <ChatArea props={converstions[0]} />
    </div>
  );
};

export default MainContainer;
