import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../Redux/User/user_action";

const Menus = ({ anchor, toggleDrawer }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Box
      sx={{ width: anchor === "left" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {MenuItems.map((menu) => (
          <ListItem
            key={menu.id}
            disablePadding
            component={Link}
            to={menu.link}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "#29b932" }}>{menu.icon}</ListItemIcon>
              <ListItemText sx={{ color: "black" }} primary={menu.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        <ListItem disablePadding onClick={logoutHandler}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutOutlinedIcon sx={{ color: "#29b932" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Menus;
