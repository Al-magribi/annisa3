import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Navbar from "../Components/Navbar";

import { getNews } from "../../../Redux/News/news_action";
import { getFeeds } from "../../../Redux/Act/act_action";
import Hero from "./Hero";
import News from "./News";
import Feed from "./Feed";
import Footer from "../Components/Footer";
import Title from "../../Title";

const Home = () => {
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.webDetail);

  const name = "";

  React.useEffect(() => {
    dispatch(getNews(name));

    dispatch(getFeeds(name));
  }, [dispatch, name]);

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Title
        title={detail?.name}
        description="Sekolah Digital Website memiliko fitur-fitur yang meningkatkan aksesibilitas, efisiensi, dan efektivitas proses pembelajaran, manajemen sekolah, dan administrasi keuangan. Ini juga dapat meningkatkan interaksi antara guru, siswa, dan orang tua dengan menyediakan wadah komunikasi yang lebih baik. Platform ini juga memungkinkan pengguna untuk melacak dan memantau perkembangan akademik serta kemajuan dalam pengajaran dan pembelajaran."
      />
      <Navbar />
      <Hero />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* NEWS */}
        <Box sx={{ flex: 2, p: 2 }}>
          <News />
        </Box>

        {/* FEED */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Feed />
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
