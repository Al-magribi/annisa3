import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menus from "./Menus";
import { Drawer, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo: user } = useSelector((state) => state.userLogin);

  // Dashboard Menu
  const [state, setState] = React.useState({ left: false });

  React.useEffect(() => {
    setState((prevState) => ({ ...prevState, left: false }));
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((prevState) => ({ ...prevState, [anchor]: open }));
  };

  //   Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClick={handleMobileMenuClose}
    >
      {/* Profile */}
      <MenuItem component={Link} to="/profile">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon
            sx={{
              color: "#29b932",
            }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      {/* Logout */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutOutlinedIcon
            sx={{
              color: "#29b932",
            }}
          />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#29b932",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO MOBILE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <IconButton onClick={toggleDrawer("left", true)}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Drawer
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              <Menus anchor="left" toggleDrawer={toggleDrawer} />
            </Drawer>

            <Typography sx={{ ml: 4 }} variant="h5">
              {user?.name}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
