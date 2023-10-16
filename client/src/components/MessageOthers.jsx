import React from "react";

const MessageOthers = () => {
  var props1 = { name: "RandomUser", message: "Hi there!" };
  return (
    <div className="other-msg-container">
      <div className="conversation-container1">
        <div className="other-text-content">
          <p className="lastMessage">{props1.message}</p>
          <p className="self-timeStamp">12:00am</p>
        </div>
      </div>
    </div>
  );
};

export default MessageOthers;
