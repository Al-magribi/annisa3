import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Images = () => {
  const { allActs: images } = useSelector((state) => state.Acts);

  const cols = window.innerWidth >= 915 ? 5 : 2;

  return (
    <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={cols}
      rowHeight={300}
    >
      {images?.map((item) => (
        <ImageListItem key={item.img} cols={1} rows={1}>
          <img src={item.img} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Images;
