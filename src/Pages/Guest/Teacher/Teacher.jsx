import { Avatar, Box, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Title from "../../Title";

const Teacher = () => {
  const { teachers } = useSelector((state) => state.teachers);

  return (
    <>
      <Title title="Guru" />
      {teachers?.map((item) => (
        <Box
          key={item._id}
          sx={{
            height: { xs: 100, md: 80 },
            width: { xs: 180, md: 370 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: 1,
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt="profile"
              src={item.avatar}
              sx={{
                height: { xs: 50, md: 80 },
                width: { xs: 50, md: 80 },
                mr: 1,
              }}
            />
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.mapel} />
        </Box>
      ))}
    </>
  );
};

export default Teacher;
