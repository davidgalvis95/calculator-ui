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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const authService = useAuthApi();

  const handleLogin = (event) => {
    event.preventDefault();
    authService.signIn(email, password).then((response) => {
      if (response) {
        navigate("/calculator");
      }
    });
  };

  const handleGoSignUp = () => {
    navigate("/sign-up");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <Avatar sx={{ m: 1 }}>
        <LockOpenIcon />
      </Avatar>
      <h2 className="loginTitle" data-testid="title">
        Sign In
      </h2>
      <form onSubmit={handleLogin}>
        <TextField
          className="loginInput"
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
          data-testid="password-input"
        />
        <Button
          sx={{ borderRadius: 20, backgroundColor: "#60a3bc" }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          data-testid="sign-in-button"
        >
          Sign In
        </Button>
        <Button
          sx={{ borderRadius: 20, backgroundColor: "#60a3bc" }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGoSignUp}
        >
          Create An Account
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
