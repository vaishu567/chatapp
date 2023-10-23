import React from "react";

const MessageSelf = ({ props }) => {
  return (
    <div className="self-msg-container">
      <div className="messageBox">
        <p className="lastMessage">{props.content}</p>
      </div>
    </div>
  );
};

export default MessageSelf;
