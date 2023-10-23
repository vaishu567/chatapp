import React from "react";

const MessageSelf = ({ props }) => {
  const mes = { props };
  console.log(mes);
  return (
    <div className="self-msg-container">
      <div className="messageBox">
        <p className="lastMessage">{props.content}</p>
      </div>
    </div>
  );
};

export default MessageSelf;
