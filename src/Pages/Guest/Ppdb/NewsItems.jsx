import { Box, Button, Typography, Pagination } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";

const createMarkup = (html) => {
  return { __html: html };
};

const NewsItems = () => {
  const { allNews: news } = useSelector((state) => state.News);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950) {
        setItemsPerPage(3);
        setCurrentPage(1);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const general_news = news?.filter((news) => news.category === "ppdb");

  const paginatedNews = general_news?.slice(startIndex, endIndex);

  const pageCount = Math.ceil(news?.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      {paginatedNews?.map((item) => (
        <Box key={item._id} sx={{ display: "flex", m: 1 }}>
          <Box
            sx={{ flex: 1, m: 1, height: { xs: 180, md: 250 }, width: "50%" }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ flex: 2, m: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{`${item.title.slice(
              0,
              window.innerWidth < 950 ? 15 : 100
            )}`}</Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CategoryIcon />
              <Typography sx={{ width: 100, ml: 1 }}>
                {item.category.toUpperCase()}
              </Typography>

              <Typography fontSize={12} fontStyle="italic">
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              dangerouslySetInnerHTML={createMarkup(
                `${item.text.slice(
                  0,
                  window.innerWidth < 950 ? 100 : 1000
                )} ...`
              )}
              sx={{
                mb: 1,
                display: "flex",
                flexDirection: "column",
              }}
            />

            <Button
              variant="contained"
              color="success"
              component={Link}
              to={`/${item.title}`}
            >
              Baca
            </Button>
          </Box>
        </Box>
      ))}
      <Box sx={{ mb: 1 }}>
        <Pagination
          count={pageCount || 1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Fragment>
  );
};

export default NewsItems;
