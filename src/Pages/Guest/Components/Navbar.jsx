import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { detail: data } = useSelector((state) => state.webDetail);

  const role = userInfo && userInfo.role;

  return (
    <AppBar
      position="absolute"
      style={{
        background: "transparent",
        transition: "background-color 0.5s ease-in-out",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                height: "100%",
                width: { xs: "50%", md: "18%" },
                textDecoration: "none",
              }}
            >
              <img src={data?.logo} alt="logo" style={{ width: 50 }} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "end",
                height: "100%",
                width: { xs: "50%", md: "100%" },
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {/* PPDB */}
              <Button
                component={Link}
                to="/ppdb"
                sx={{
                  fontFamily: "Nunito Sans",
                  color: "white",
                  letterSpacing: 1.5,
                  width: 90,
                  fontWeight: "700",
                  ml: 2,
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    color: "#55ac34",
                  },
                }}
              >
                PPDB
              </Button>

              {/* VISI MISI */}
              <Button
                component={Link}
                to="/visi-misi"
                sx={{
                  fontFamily: "Nunito Sans",
                  color: "white",
                  letterSpacing: 1.5,
                  width: 130,
                  fontWeight: "700",
                  ml: 2,
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    color: "#55ac34",
                  },
                }}
              >
                Visi & Misi
              </Button>

              {/* LIBRARY */}
              <Button
                component={Link}
                to="/library"
                sx={{
                  fontFamily: "Nunito Sans",
                  color: "white",
                  letterSpacing: 1.5,
                  width: 130,
                  fontWeight: "700",
                  ml: 2,
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    color: "#55ac34",
                  },
                }}
              >
                Perpustakaan
              </Button>

              {/* NEWS */}
              <Button
                component={Link}
                to="/news"
                sx={{
                  fontFamily: "Nunito Sans",
                  color: "white",
                  letterSpacing: 1.5,
                  width: 130,
                  fontWeight: "700",
                  ml: 2,
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    color: "#55ac34",
                  },
                }}
              >
                Informasi
              </Button>

              {/* TEACHERS */}
              <Button
                component={Link}
                to="/teachers"
                sx={{
                  fontFamily: "Nunito Sans",
                  color: "white",
                  letterSpacing: 1.5,
                  width: 90,
                  fontWeight: "700",
                  ml: 2,
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    color: "#55ac34",
                  },
                }}
              >
                Guru
              </Button>

              {role === "admin" ? (
                <Button
                  component={Link}
                  to="/admin-dashboard"
                  sx={{
                    fontFamily: "Nunito Sans",
                    color: "white",
                    letterSpacing: 1.5,
                    width: 130,
                    fontWeight: "700",

                    ml: 2,
                  }}
                >
                  DASHBOARD
                </Button>
              ) : role === "siswa" ? (
                <Button
                  component={Link}
                  to="/student-dashboard"
                  sx={{
                    fontFamily: "Nunito Sans",
                    color: "white",
                    letterSpacing: 1.5,
                    width: 130,
                    fontWeight: "700",
                    ml: 2,
                  }}
                >
                  DASHBOARD
                </Button>
              ) : role === "guru" ? (
                <Button
                  component={Link}
                  to="/teacher-dashboard"
                  sx={{
                    fontFamily: "Nunito Sans",
                    color: "white",
                    letterSpacing: 1.5,
                    width: 130,
                    fontWeight: "700",
                    ml: 2,
                  }}
                >
                  DASHBOARD
                </Button>
              ) : (
                <>
                  <Button
                    onClick={(e) => setOpenMenu(e.currentTarget)}
                    sx={{
                      fontFamily: "Nunito Sans",
                      color: "white",
                      letterSpacing: 1.5,
                      width: 130,
                      fontWeight: "700",
                      ml: 2,
                    }}
                  >
                    Login
                  </Button>
                  <Menu
                    anchorEl={openMenu}
                    keepMounted
                    open={Boolean(openMenu)}
                    onClose={() => setOpenMenu(null)}
                  >
                    <MenuItem
                      component={Link}
                      to="/admin/login"
                      onClick={() => setOpenMenu(null)}
                    >
                      Admin
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/user/login"
                      onClick={() => setOpenMenu(null)}
                    >
                      Siswa & Guru
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setShow(true)}
                color="inherit"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer open={show} onClose={() => setShow(false)}>
              <Box sx={{ width: "200px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    mt: 1,
                    mr: 2,
                  }}
                  onClick={() => setShow(false)}
                >
                  <CloseIcon />
                </Box>
                <List>
                  {/* PPBD */}
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/ppdb"
                      onClick={() => setShow(false)}
                    >
                      <ListItemIcon>
                        <FeedIcon sx={{ color: "#55ac34" }} />
                      </ListItemIcon>
                      <ListItemText primary="PPDB" />
                    </ListItemButton>
                  </ListItem>

                  {/* VISI & MISI */}
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/visi-misi"
                      onClick={() => setShow(false)}
                    >
                      <ListItemIcon>
                        <CrisisAlertIcon sx={{ color: "#55ac34" }} />
                      </ListItemIcon>
                      <ListItemText primary="Visi & Misi" />
                    </ListItemButton>
                  </ListItem>

                  {/* LIBRARY */}
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/library"
                      onClick={() => setShow(false)}
                    >
                      <ListItemIcon>
                        <MenuBookIcon sx={{ color: "#55ac34" }} />
                      </ListItemIcon>
                      <ListItemText primary="Perpustakaan" />
                    </ListItemButton>
                  </ListItem>

                  {/* NEWS */}
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/news"
                      onClick={() => setShow(false)}
                    >
                      <ListItemIcon>
                        <NewspaperIcon sx={{ color: "#55ac34" }} />
                      </ListItemIcon>
                      <ListItemText primary="Informasi" />
                    </ListItemButton>
                  </ListItem>

                  {/* TEACHER */}
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      to="/teachers"
                      onClick={() => setShow(false)}
                    >
                      <ListItemIcon>
                        <GroupIcon sx={{ color: "#55ac34" }} />
                      </ListItemIcon>
                      <ListItemText primary="Guru" />
                    </ListItemButton>
                  </ListItem>

                  {role === "admin" ? (
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/admin-dashboard"
                        onClick={() => setShow(false)}
                      >
                        <ListItemIcon>
                          <DashboardIcon sx={{ color: "#55ac34" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </ListItem>
                  ) : role === "siswa" ? (
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/student-dashboard"
                        onClick={() => setShow(false)}
                      >
                        <ListItemIcon>
                          <DashboardIcon sx={{ color: "#55ac34" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </ListItem>
                  ) : role === "guru" ? (
                    <ListItem>
                      <ListItemButton
                        component={Link}
                        to="/teacher-dashboard"
                        onClick={() => setShow(false)}
                      >
                        <ListItemIcon>
                          <DashboardIcon sx={{ color: "#55ac34" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </ListItem>
                  ) : (
                    <>
                      <ListItem>
                        <ListItemButton
                          onClick={(e) => setOpenMenu(e.currentTarget)}
                        >
                          <ListItemIcon>
                            <LoginIcon sx={{ color: "#55ac34" }} />
                          </ListItemIcon>
                          <ListItemText primary="LogIn" />
                        </ListItemButton>
                      </ListItem>
                      <Menu
                        anchorEl={openMenu}
                        keepMounted
                        open={Boolean(openMenu)}
                        onClose={() => setOpenMenu(null)}
                      >
                        <MenuItem
                          component={Link}
                          to="/admin/login"
                          onClick={() => setOpenMenu(null)}
                        >
                          Admin
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/user/login"
                          onClick={() => setOpenMenu(null)}
                        >
                          Siswa & Guru
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
