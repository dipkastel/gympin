import React from "react";
import {Container, Navbar} from "react-bootstrap";


export default function NNavigaion(){
    return (
        <Navbar bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Gympin</Navbar.Brand>
            </Container>
        </Navbar>
    );
}
