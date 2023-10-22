import React from "react";

const MessageSelf = ({ props2 }) => {
  return (
    <div className="self-msg-container">
      <div className="messageBox">
        <p className="lastMessage">{props2.message}</p>
      </div>
    </div>
  );
};

export default MessageSelf;
