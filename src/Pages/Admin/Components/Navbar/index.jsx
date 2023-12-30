import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menus from "./Menus";
import { Drawer, Typography } from "@mui/material";

const Navbar = () => {
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
          <AdminPanelSettingsIcon
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
              Administrator
            </Typography>
          </Box>

          {/* KOLOM LOGIN */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </Box>

          {/* MENU MOBILE */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
