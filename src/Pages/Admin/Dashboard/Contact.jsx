import { Avatar, Box, Button, Typography } from "@mui/material";
import { green, red, blue, pink } from "@mui/material/colors";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LanguageIcon from "@mui/icons-material/Language";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Contact = () => {
  const wa = "https://wa.me/6287720776871";
  const web = "https://almagribi-dev.com/";
  const youtube = "https://www.youtube.com/channel/UCl9oxBNIVDgdOsnD4L-hA1Q";

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        m: 1,
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      {/* Whatsapp */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "45%",
          m: 1,
        }}
      >
        <Avatar sx={{ bgcolor: green[500], ml: 2 }}>
          <WhatsAppIcon />
        </Avatar>

        <Button
          variant="outlined"
          sx={{ ml: 2, width: 300 }}
          component={Link}
          to={wa}
          target="blank"
        >
          Whatsapp
        </Button>
      </Box>

      {/* Website */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "45%",
          m: 1,
        }}
      >
        <Avatar sx={{ bgcolor: blue[500], ml: 2 }}>
          <LanguageIcon />
        </Avatar>

        <Button
          variant="outlined"
          sx={{ ml: 2, width: 300 }}
          component={Link}
          to={web}
          target="blank"
        >
          Website
        </Button>
      </Box>

      {/* Youtube */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "45%",
          m: 1,
        }}
      >
        <Avatar sx={{ bgcolor: red[500], ml: 2 }}>
          <YouTubeIcon />
        </Avatar>

        <Button
          variant="outlined"
          sx={{ ml: 2, width: 300 }}
          component={Link}
          to={youtube}
          target="blank"
        >
          YouTube
        </Button>
      </Box>

      {/* Instagram */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "45%",
          m: 1,
        }}
      >
        <Avatar sx={{ bgcolor: pink[500], ml: 2 }}>
          <InstagramIcon />
        </Avatar>

        <Button
          variant="outlined"
          sx={{ ml: 2, width: 300 }}
          component={Link}
          to={youtube}
          target="blank"
        >
          Instagram
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
