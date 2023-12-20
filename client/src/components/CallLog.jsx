import React from "react";
import "../styles/style.css";
import CallLogElement from "../elements/CallLogElement";

const CallLog = () => {
  return (
    <div className="chatArea-container">
      <div className="messages-container">
        <div className="header">Call Log</div>
        <CallLogElement />
        <CallLogElement />
        <CallLogElement />
        <CallLogElement />
      </div>
    </div>
  );
};

export default CallLog;
