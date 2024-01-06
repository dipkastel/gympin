import React, {useState} from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {Box, Container, Link} from "@mui/material";

const HomeClickableTitle = (prop) => {
    const [data] = useState(prop.item);
    return (
        <Container sx={{
            backgroundColor: "#e7333e",
            color:"#ffffff"
        }}>
            <Row>
                <Link href={"/"+prop?.item?.Destination} underline="none" color="inherit" fontWeight="800">
                    <Col className={"p-1 pb-2"} >
                        {data.Title}
                    </Col>
                </Link>
            </Row>
        </Container>
    );
};

export default HomeClickableTitle;
