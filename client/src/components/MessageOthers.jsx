import React from "react";

const MessageOthers = ({ props1 }) => {
  return (
    <div className="other-msg-container">
      <div className="conversation-container1">
        <div className="other-text-content">
          <p className="lastMessage">{props1.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
