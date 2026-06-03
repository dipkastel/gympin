import React, {useEffect} from "react";
import {Container, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import {useSelector} from "react-redux";


export default function NNavigaion(){
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const location = useLocation();
    useEffect(() => {
        if(!corporate&&!window.location.toString().includes("/management/settings")){
            navigate('/management/settings', {replace: true});
            alert("برای ادامه مجموعه خود را انتخاب کنید");
        }
    }, [location]);

    return (
        <Navbar bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">
                    {"Gympin"+(corporate?(" - "+corporate.Name):"")}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
