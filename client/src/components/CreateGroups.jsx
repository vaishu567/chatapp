import React from "react";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { IconButton } from "@mui/material";

const CreateGroups = () => {
  return (
    <div className="createGroups-container">
      <input placeholder="Enter Group Name" className="search-box" />
      <IconButton>
        <DoneOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default CreateGroups;
