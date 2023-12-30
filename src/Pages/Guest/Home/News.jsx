import { Box, Button, Typography, ListSubheader } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const createMarkup = (html) => {
  return { __html: html };
};

const News = () => {
  const { allNews: news } = useSelector((state) => state.News);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ListSubheader>Informasi</ListSubheader>
      {news?.slice(0, 3).map((item) => (
        <Box key={item._id} sx={{ display: "flex", m: 2 }}>
          <Box sx={{ flex: 1, m: 2, display: { xs: "none", md: "block" } }}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading='lazy'
            />
          </Box>
          <Box sx={{ flex: 2, m: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant='h6'>{`${item.title.slice(
              0,
              window.innerWidth < 950 ? 15 : 100
            )}`}</Typography>
            <Typography fontSize={10} fontStyle='italic'>
              {new Date(item.createdAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant='body2'
              dangerouslySetInnerHTML={createMarkup(
                `${item.text.slice(0, 500)} ...`
              )}
              sx={{ mb: 1 }}
            />

            <Button
              variant='contained'
              color='success'
              component={Link}
              to={`/${item.title}`}
            >
              Baca
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default News;
