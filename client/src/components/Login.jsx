import React from "react";
import logo from "../icons/wechat.png";
// import { Link } from "react-router-dom";
import "../styles/style.css";
import { Button, TextField } from "@mui/material";
const Login = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <h2 className="texth">Login to your Account</h2>
        <TextField
          id="outlined-basic"
          label="Enter User Name"
          type="text"
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
          Login
        </Button>
        <p className="con-timeStamp">
          Not a member? <a href="/signup">Create an Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
