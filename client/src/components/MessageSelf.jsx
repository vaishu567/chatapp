import React from "react";

const MessageSelf = () => {
  var props2 = { name: "You", message: "Hello random guy!" };
  return (
    <div className="self-msg-container">
      <div className="messageBox">
        <p className="lastMessage">{props2.message}</p>
        <p className="self-timeStamp">12:10am</p>
      </div>
    </div>
  );
};

export default MessageSelf;
