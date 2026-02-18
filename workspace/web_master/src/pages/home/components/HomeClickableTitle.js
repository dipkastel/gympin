import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Container, Link } from "@mui/material";
import clickHandler from "../homeClick";
import { useNavigate } from "react-router";

const HomeClickableTitle = (prop) => {
  const navigate = useNavigate();
  const [data] = useState(prop.item);
  return (
    <Container>
      <Row>
        <Link
          onClick={() => clickHandler(data, navigate)}
          underline="none"
          color="inherit"
          fontWeight="800"
        >
          <Col className={"p-1 pb-2"}>{data.Title}</Col>
        </Link>
      </Row>
    </Container>
  );
};

export default HomeClickableTitle;
