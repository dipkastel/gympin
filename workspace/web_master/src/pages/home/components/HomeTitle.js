import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Container} from "@mui/material";

const HomeTitle = (prop) => {
    const [data] = useState(prop.item);
    return (
        <Container sx={{
            backgroundColor: "#e7333e",
            color:"#ffffff"
        }}>
            <Row>
                <Col className={"p-1 pb-2"} >
                    {data.Title}
                </Col>
            </Row>
        </Container>
    );
};

export default HomeTitle;
