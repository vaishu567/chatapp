import React, { useContext, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Fab, IconButton, Stack, Tooltip } from "@mui/material";
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
import ImageIcon from "@mui/icons-material/Image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
  const [displayStack, setdisplayStack] = useState(false);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
    setdisplayStack(false);
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

  const display = () => {
    setdisplayStack(!displayStack);
    setShowEmoji(false);
  };
  const Actions = [
    {
      color: "#e9f5db",
      icon: <ImageIcon size="34" />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#cfe1b9",
      icon: <CameraAltIcon size="34" />,
      y: 172,
      title: "Image",
    },
    {
      color: "#b5c99a",
      icon: <InsertDriveFileIcon size="34" />,
      y: 242,
      title: "Document",
    },
  ];

  //connect to socket
  useEffect(() => {
    socket = io(URL);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, [socketConnectionStatus]);

  //new message received
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  }, []);

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
      // setIsGroup(isgroup + 1);
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
            {/* <IconButton>
              <DeleteIcon />
            </IconButton> */}
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
          {displayStack && (
            <Stack sx={{ position: "relative" }}>
              {Actions.map((el) => {
                return (
                  <Tooltip placement="right" title={el.title}>
                    <Fab
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                );
              })}
            </Stack>
          )}
          <IconButton onClick={display}>
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
                setShowEmoji(false);
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
                setShowEmoji(false);
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
