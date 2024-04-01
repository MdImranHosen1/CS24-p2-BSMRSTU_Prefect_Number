import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "./../../redux/slices/userHandleSlice";

const defaultTheme = createTheme();

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const userValidity = useSelector(
    (state) => state.userType?.userData?.userType
  );
  const userId = useSelector((state) => state.userType?.userData?.id);

  useEffect(() => {
    if (userValidity) {
      if (userValidity === "admin") {
        navigate("/");
      } else if (userValidity === "STS Manager") {
        navigate(`/users/${userId}`);
      } else if (userValidity === "Landfill Manager") {
        navigate(`/users/${userId}`);
      } else {
        dispatch(logout());
        setWarningMessage("Wrong email or password!");
        setShowWarning(true);
        // Hide the warning after 5 seconds
        setTimeout(() => {
          setShowWarning(false);
        }, 2000);
      }
    }
  }, [userValidity]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("email");
    const password = data.get("password");

    const userData = {
      userEmail: userName,
      userPassword: password,
    };

    try {
      const response = await dispatch(loginUser(userData));
      if (response.type === "auth/login/fulfilled") {
        console.log("Login successful");
      } else {
        setWarningMessage("Wrong email or password!");
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {showWarning && (
        <Stack sx={{ width: "100%" }} className=" fixed" spacing={2}>
          <Alert variant="filled" severity="error">
            {warningMessage}
          </Alert>
        </Stack>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="User Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/auth/change-password"
                  variant="body2"
                  className=" hover:text-blue-600 text-purple-600
                  hover:underline"
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
