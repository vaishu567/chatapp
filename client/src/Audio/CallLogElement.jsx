import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import "../styles/style.css";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
const CallLogElement = () => {
  const [incoming, setIncoming] = useState(false);
  const [missed, setMissed] = useState(true);
  return (
    <>
      <div className="call-log-con">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <p className="con-icon">
            <AccountCircle />
          </p>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <p className="con-title">Rapanzuale</p>
          {/* incoming/outgoing */}
          {incoming ? (
            <p
              className="self-timeStamp"
              style={{ color: "#d9d9d9", fontWeight: "bold", fontSize: "12px" }}
            >
              <CallReceivedIcon
                style={{
                  color: missed ? "#780000" : "#3a5a40",
                  fontSize: "17px",
                  paddingRight: "3px",
                }}
              />
              incoming
            </p>
          ) : (
            <p
              className="self-timeStamp"
              style={{ color: "#d9d9d9", fontWeight: "bold", fontSize: "12px" }}
            >
              <CallMadeIcon
                style={{
                  color: missed ? "#780000" : "#3a5a40",
                  fontSize: "17px",
                  paddingRight: "3px",
                }}
              />
              outgoing
            </p>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <IconButton className="log-icon">
            {missed ? (
              <PhoneMissedIcon
                style={{
                  color: "#780000",
                }}
              />
            ) : (
              <CallIcon
                style={{
                  color: "#3a5a40",
                }}
              />
            )}
          </IconButton>
          <p
            className="self-timeStamp"
            style={{ color: "#d9d9d9", fontWeight: "bold", fontSize: "12px" }}
          >
            12:30pm
          </p>
        </Stack>
      </div>
    </>
  );
};

export default CallLogElement;
