import Container from "@mui/material/Container";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

export const LandingPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to MyApp
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Your journey to the best experience starts here. Sign up or log in to
          get started!
        </Typography>
      </Box>
    </Container>
  );
};

// src/Header.js

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box>
          <Button color="inherit">Log In</Button>
          <Button color="inherit">Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
