import React, { useEffect, useState } from "react";
import "../styles/style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightModeIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
// import ConversationsItem from "./ConversationsItem";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { URL } from "../url";
// import { myContext } from "./MainContainer";
// import { useDispatch } from "react-redux";

const SideBar = () => {
  const [lightTheme, setLightTheme] = useState(true);
  const [converstions, setConversations] = useState([]);
  // const dispatch = useDispatch();
  // const { refresh, setRefresh } = useContext(myContext);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }
  const logOutHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(URL + "/user/logout", config, {
        withCredentials: true,
      });
      console.log("Logout:", response);
      localStorage.removeItem("userData");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const user = userData.data;
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(URL + "/chat/", config, { withCredentials: true })
      .then((response) => {
        setConversations(response.data);
      });
  }, [user.token]);

  return (
    <div className="sidebar-container">
      <div className={"sb-header"}>
        <div>
          <IconButton
            onClick={() => {
              navigate("/app/welcome");
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("groups");
            }}
          >
            <GroupAddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setLightTheme((prevValue) => {
                return !prevValue;
              });
            }}
          >
            {lightTheme && <NightModeIcon />}
            {!lightTheme && <LightModeIcon />}
          </IconButton>
          <IconButton onClick={logOutHandler}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="search" className="search-box" />
      </div>
      <div className="sb-conversation">
        {converstions.map((convo, index) => {
          var chatName = "";
          if (convo.isGroupChat) {
            chatName = convo.chatName;
          } else {
            convo.users.map((user) => {
              if (user._id !== userData.data._id) {
                chatName = user.name;
              }
            });
          }
          if (convo.latestMessage === undefined) {
            return (
              <div
                key={index}
                onClick={() => {
                  // setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate("chat/" + convo._id + "&" + chatName);
                  }}
                >
                  <p className="con-icon">
                    <AccountCircleIcon />
                  </p>
                  <p className="con-title">{chatName}</p>
                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate("chat/" + convo._id + "&" + chatName);
                }}
              >
                <p className="con-icon">
                  <AccountCircleIcon />
                </p>
                <p className="con-title">{chatName}</p>
                <p className="con-lastMessage">{convo.latestMessage.content}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SideBar;
