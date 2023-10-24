import React, { useContext, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { io } from "socket.io-client";
import { myContext } from "./MainContainer";
import { URL } from "../url";
import EmojiPicker from "emoji-picker-react";
var socket;
const ChatArea = () => {
  const [messageContent, setMessageContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (emojiObject, event) => {
    // Insert the selected emoji into the message input
    console.log(emojiObject);
    setMessageContent(messageContent + emojiObject.emoji);
  };

  const sendMessage = () => {
    var data = null;
    const config = {
      headers: {
        authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        URL + "/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config,
        {
          withcredentials: true,
        }
      )
      .then((data) => {
        console.log(data.data);
        console.log("Message Fired");
        socket.emit("newMessage", data.data);
      });
  };

  //connect to socket
  useEffect(() => {
    socket = io(URL);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  //new message received
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  });

  //fetch chats
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get(URL + "/message/" + chat_id, config).then(({ data }) => {
      setAllMessages(data);
      setloaded(true);
      socket.emit("join chat", chat_id);
    });
    setAllMessagesCopy(allMessages);
  }, [refresh, chat_id, userData.data.token, allMessages]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px", flexGrow: "1" }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className="chatArea-container ">
        <div className="chatarea-header">
          <p className="con-icon">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </p>
          <div className="header-text">
            <p className="con-title">{chat_user}</p>
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
          {allMessages.slice(0).map((message, index) => {
            const sender = message.sender;
            const self_id = userData.data._id;
            if (sender._id === self_id) {
              return <MessageSelf props={message} key={index} />;
            } else {
              return <MessageOthers props={message} key={index} />;
            }
          })}
        </div>
        <div className="text-input-area ">
          {showEmoji && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <IconButton onClick={toggleEmojiPicker}>
            <SentimentSatisfiedAltIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Type a message"
            className="search-box  box-input"
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }
            }}
          />

          {messageContent === "" ? (
            <IconButton className="end">
              <KeyboardVoiceOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              className="end"
              onClick={() => {
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </div>
      </div>
    );
  }
};

export default ChatArea;
