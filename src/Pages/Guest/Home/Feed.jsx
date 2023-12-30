import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Feed = () => {
  const { allActs: feed } = useSelector((state) => state.Acts);

  return (
    <>
      <ImageList sx={{ width: "100%", height: 950 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Kegiatan Sekolah</ListSubheader>
        </ImageListItem>
        {feed?.slice(0, 10).map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              subtitle={new Date(item.createdAt).toLocaleDateString()}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ mt: 1, width: "100%" }}>
        <Button
          component={Link}
          to="/feed"
          fullWidth
          variant="outlined"
          color="success"
        >
          Lebih Banyak
        </Button>
      </Box>
    </>
  );
};

export default Feed;
