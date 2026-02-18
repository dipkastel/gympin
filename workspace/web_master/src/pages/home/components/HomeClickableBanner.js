import React from "react";
import { Box, Link } from "@mui/material";
import { Image } from "react-bootstrap";
import clickHandler from "../homeClick";
import { useNavigate } from "react-router";

const HomeClickableBanner = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Link
        onClick={() => clickHandler(props.item, navigate)}
        underline="none"
        color="inherit"
        fontWeight="800"
      >
        <Box className={"simple-banner"}>
          <Image width={"100%"} src={props.item.multimedia.Url} />
        </Box>
      </Link>
    </div>
  );
};

export default HomeClickableBanner;
