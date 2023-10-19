import React, { useState } from "react";
import logo from "../icons/wechat.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import Toaster from "./Toaster";
import { URL } from "../url";
const Login = () => {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(URL + "/user/login", data, config, {
        withCredentials: true,
      });
      console.log("Login :", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
      navigate("/app/welcome");
    } catch (err) {
      console.log(err);
      setLogInStatus({
        mag: "Invalid username or password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(URL + "/user/register", data, config);
      console.log("Login :", response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (err) {
      console.log(err);
      // if (err.response.status === 405) {
      //   setLogInStatus({
      //     msg: "User with this email ID already exists",
      //     key: Math.random(),
      //   });
      // }
      // if (err.response.status === 406) {
      //   setLogInStatus({
      //     msg: "User Name already Taken, please take another one",
      //     key: Math.random(),
      //   });
      // }
      setLoading(false);
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <h2 className="texth">Login to your Account</h2>
            <TextField
              id="outlined-basic"
              label="Enter User Name"
              type="text"
              variant="outlined"
              className="search-box"
              name="name"
              onChange={changeHandler}
            />
            <TextField
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              variant="outlined"
              name="password"
              className="search-box"
              autoComplete="current-password"
              onChange={changeHandler}
            />
            <Button variant="contained" color="success" onClick={loginHandler}>
              Login
            </Button>
            <p className="con-timeStamp">
              Not a member?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Create an Account
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <h1 className="texth">Create Your Account</h1>
            <TextField
              id="outlined-basic"
              label="Enter User Name"
              type="text"
              variant="outlined"
              className="search-box"
              name="name"
              onChange={changeHandler}
            />
            <TextField
              id="outlined-email"
              label="Enter Email Address"
              type="email"
              variant="outlined"
              className="search-box"
              name="email"
              onChange={changeHandler}
            />
            <TextField
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              variant="outlined"
              className="search-box"
              name="password"
              autoComplete="current-password"
              onChange={changeHandler}
            />
            <Button variant="contained" color="success" onClick={signUpHandler}>
              Signup
            </Button>
            <p className="con-timeStamp">
              Already a member?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
