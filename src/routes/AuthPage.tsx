// src/AuthForm.js
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  LogInWithGoogleButton,
  LogInWithTelegramButton,
  SignUpWithGoogleButton,
  SignUpWithTelegramButton,
} from "../components/Components";

const theme = createTheme();

export const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <ThemeProvider theme={theme}>
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
            {isSignUp ? "Sign Up" : "Log In"}
          </Typography>

          {isSignUp ? (
            <>
              <SignUpWithTelegramButton />
              <SignUpWithGoogleButton />
            </>
          ) : (
            <>
              <LogInWithTelegramButton />
              <LogInWithGoogleButton />
            </>
          )}
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={toggleForm}>
                {isSignUp
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
