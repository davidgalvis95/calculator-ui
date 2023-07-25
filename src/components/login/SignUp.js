import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./SignInUp.css";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Avatar from "@mui/material/Avatar";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import useAuthApi from "../../hooks/useAuthApi";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [successMsg, setSuccessMsg] = useState(undefined);
  const navigate = useNavigate();
  const authService = useAuthApi();

  const handleGoSignIn = () => {
    setSuccessMsg(undefined);
    navigate("/sign-in");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    authService.signUp(email, password).then((msg) => setSuccessMsg(msg));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      {successMsg ? (
        <div className="messageContainer">User Signed Up Successfully!</div>
      ) : null}
      {!successMsg ? (
        <div className="container">
          <Avatar sx={{ m: 1, color: "#2f3542" }}>
            <LockOpenIcon />
          </Avatar>
          <h2 className="registerTitle">Register User</h2>
          <form onSubmit={handleRegister}>
            <TextField
              className="registerInput"
              label="email@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <OutlinedInput
              className="registerInput"
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <TextField
              className="registerInput"
              label="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              sx={{ borderRadius: 20, backgroundColor: "#60a3bc" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
        </div>
      ) : null}
      <Button
        sx={{ borderRadius: 20, backgroundColor: "#60a3bc", marginTop: "20px" }}
        fullWidth
        variant="contained"
        onClick={handleGoSignIn}
        color="primary"
      >
        I Have An Account
      </Button>
    </div>
  );
};

export default SignUp;
