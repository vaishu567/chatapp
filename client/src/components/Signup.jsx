import React from "react";
import logo from "../icons/wechat.png";
// import { Link } from "react-router-dom";
import "../styles/style.css";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <h1 className="texth">Create Your Account</h1>
        <TextField
          id="outlined-basic"
          label="Enter User Name"
          type="text"
          variant="outlined"
          className="search-box"
        />
        <TextField
          id="outlined-basic"
          label="Enter Email Address"
          type="email"
          variant="outlined"
          className="search-box"
        />
        <TextField
          id="outlined-password-input"
          label="Enter Password"
          type="password"
          variant="outlined"
          className="search-box"
          autoComplete="current-password"
        />
        <Button variant="contained" color="success">
          Signup
        </Button>
        <p className="con-timeStamp">
          Already a member? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
