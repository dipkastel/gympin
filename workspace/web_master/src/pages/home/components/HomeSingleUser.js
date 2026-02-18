import React from "react";
import { Card, Link, Typography } from "@mui/material";
import { Image } from "react-bootstrap";
import clickHandler from "../homeClick";
import { useNavigate } from "react-router";

const HomeSingleUser = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Link
          onClick={() => clickHandler(props.item, navigate)}
          underline="none"
        >
          <Card
            sx={{
              marginX: 0.3,
              marginY: 1,
            }}
            elevation={3}
          >
            <Image
              height={"100%"}
              width={"100%"}
              src={props.item.multimedia.Url}
            />
            <Typography
              width={"100%"}
              variant="overline"
              noWrap={true}
              textAlign={"center"}
              fontSize={"0.5em"}
              component="div"
              sx={{
                marginY: 0.1,
              }}
            >
              {props.item.Title}
            </Typography>
          </Card>
        </Link>
      </div>
    </>
  );
};
export default HomeSingleUser;
