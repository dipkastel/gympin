import React, {useState} from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {Box, Container, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import clickHandler from "../homeClick";

const HomeClickableTitle = (prop) => {
    const navigate = useNavigate()
    const [data] = useState(prop.item);
    return (
        <Container sx={{
            backgroundColor: "#e7333e",
            color:"#ffffff"
        }}>
            <Row>
                <Link onClick={()=>clickHandler(prop.item,navigate)} underline="none" color="inherit" fontWeight="800">
                    <Col className={"p-1 pb-2"} >
                        {data.Title}
                    </Col>
                </Link>
            </Row>
        </Container>
    );
};

export default HomeClickableTitle;
