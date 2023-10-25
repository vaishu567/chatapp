import React from "react";

const MessageOthers = ({ props }) => {
  return (
    <div className="other-msg-container">
      <div className="conversation-container1">
        <div className="other-text-content">
          <p className={"con-msg"}>{props.sender.name}</p>
          <p className="lastMessage">{props?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
