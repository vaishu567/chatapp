import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const ConversationsItem = ({ props }) => {
  return (
    <>
      <div className="conversation-container">
        <p className="con-icon">
          <AccountCircleIcon />
        </p>
        <p className="con-title">{props.name}</p>
        <p className="con-timeStamp">{props.timeStamp}</p>

        <p className="con-lastMessage">
          {props.lastMessage && (
            <DoneAllIcon sx={{ width: 20, height: 20, color: "gray" }} />
          )}
          {props.lastMessage}
        </p>
      </div>
    </>
  );
};

export default ConversationsItem;
