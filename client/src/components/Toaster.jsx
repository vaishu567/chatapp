import React, { useState } from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Toaster = ({ message }) => {
  const [open, setOpen] = useState(true);
  console.log(String(message));
  const mes = String(message);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        variant="warning"
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={message}
        action={[
          <IconButton key={"close"} onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "30vw" }}>
          {mes}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;
