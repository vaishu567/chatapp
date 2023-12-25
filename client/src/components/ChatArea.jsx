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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import CallElement from "../Audio/AudioCallElement";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  const [displayvoice, setDisplayvoice] = useState(false);
  const [openvideo, setOpenvideo] = React.useState(false);
  const [displayvideo, setDisplayvideo] = useState(false);
  const [openvoice, setOpenvoice] = useState(false);

  const handleClickOpen = () => {
    setOpenvoice(true);
    setDisplayvoice(true);
  };

  const handleClickOpenVideo = () => {
    setOpenvideo(true);
    setDisplayvideo(true);
  };

  const handleClosevideo = () => {
    setOpenvideo(false);
  };

  const handleSendImage = () => {
    sendMessage("Media");
    console.log("sent media");
  };

  const handleSendCamera = () => {
    sendMessage("Camera");
    console.log("Sent image from Camera");
  };

  const handleSendDocument = () => {
    sendMessage("Document");
    console.log("Sent document");
  };

  // handling type:
  const handleType = (type) => {
    if (type === "Document") {
      handleSendDocument();
    } else if (type === "Image") {
      handleSendCamera();
    } else {
      handleSendImage();
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
    setdisplayStack(false);
  };

  const handleEmojiClick = (emojiObject, event) => {
    // Insert the selected emoji into the message input
    console.log(emojiObject);
    setMessageContent(messageContent + emojiObject.emoji);
  };

  const sendMessage = (contentType) => {
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
          contentType: contentType,
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
      })
      .catch((error) => {
        console.error("Error sending message:", error);
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
      y: 182,
      title: "Image",
    },
    {
      color: "#b5c99a",
      icon: <InsertDriveFileIcon size="34" />,
      y: 262,
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
            <IconButton onClick={handleClickOpenVideo}>
              <VideocamOutlinedIcon />
            </IconButton>
            <p className="v"></p>
            <IconButton onClick={handleClickOpen}>
              <CallOutlinedIcon />
            </IconButton>
          </div>
          <div>
            {displayvoice && (
              <CallElement open={openvoice} setOpenvoice={setOpenvoice} />
            )}
          </div>
          <div>
            {displayvideo && (
              <React.Fragment>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                  Open dialog
                </Button> */}
                <BootstrapDialog
                  onClose={handleClosevideo}
                  aria-labelledby="customized-dialog-title"
                  open={openvideo}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClosevideo}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent dividers>
                    <div className="voiceContainer"></div>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClosevideo}>
                      Save changes
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </React.Fragment>
            )}
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
                    <IconButton onClick={() => handleType(el.title)}>
                      <Fab
                        sx={{
                          position: "absolute",
                          top: -el.y,
                          right: -45,
                          backgroundColor: el.color,
                        }}
                      >
                        {el.icon}
                      </Fab>
                    </IconButton>
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
                sendMessage("Text");
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
