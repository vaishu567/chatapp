import React, { useState } from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

const CreateGroups = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const nav = useNavigate();
  console.log(userData);

  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }
  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const createGroup = () => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };
    axios.post(
      URL + "/chat/createGroup",
      {
        name: groupName,
        users: [],
      },
      config
    );
    nav("/app/groups");
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to create a Group Named" + groupName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will create a group in which you will be the admin and other
            will be able to join this group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              createGroup();
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className="createGroups-container">
        <input
          placeholder="Enter Group Name"
          className="search-box"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <IconButton
          onClick={() => {
            handleClickOpen();
          }}
        >
          <DoneOutlineOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
};

export default CreateGroups;
