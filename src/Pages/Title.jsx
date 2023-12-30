import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Title = ({ title, description }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default Title;
