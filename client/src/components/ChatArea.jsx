import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import "../styles/style.css";
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";

const ChatArea = ({ props }) => {
  const [value, setValue] = useState(null);

  return (
    <div className="chatArea-container">
      <div className="chatarea-header">
        <p className="con-icon">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </p>
        <div className="header-text">
          <p className="con-title">{props.name}</p>
          <p className="con-timeStamp">{props.timeStamp}</p>
        </div>
        <div className="call-icon">
          <IconButton>
            <VideocamOutlinedIcon />
          </IconButton>
          <p className="v"></p>
          <IconButton>
            <CallOutlinedIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <div className="messages-container">
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
        <MessageOthers />
        <MessageSelf />
      </div>
      <div className="text-input-area ">
        <input
          type="text"
          placeholder="Type a message"
          value={value}
          className="search-box"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        {value === "" ? (
          <IconButton>
            <KeyboardVoiceOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton>
            <SendIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
