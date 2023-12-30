import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Read_Ebook } from "../../../Redux/Ebook/ebook_action";
import { Box } from "@mui/material";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Admin_Protection from "../Admin_Protection";

const Read_ebook_admin = () => {
  Admin_Protection();

  const dispatch = useDispatch();
  const params = useParams();

  const title = params.title;

  const { detail: ebook } = useSelector((state) => state.detailEbook);

  useEffect(() => {
    dispatch(Read_Ebook(title));
  }, [dispatch, title]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title title={ebook?.title} />

      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 900, md: 680, xl: 820 },
          top: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: { xs: 790, md: 640, xl: 780 },
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <embed
            src={ebook?.ebook}
            height="100%"
            width="100%"
            type="application/pdf"
            onContextMenu={(e) => e.preventDefault()}
          />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Read_ebook_admin;
