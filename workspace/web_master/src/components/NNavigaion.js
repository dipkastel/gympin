import React, {useEffect} from "react";
import {Container, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";


export default function NNavigaion(){
    const navigate = useNavigate();
    const place = useSelector(({place}) => place.place)
    const location = useLocation();
    useEffect(() => {
        if(!place&&!window.location.toString().includes("/management/settings")){
            navigate('/management/settings', {replace: true});
            alert("برای ادامه مجموعه خود را انتخاب کنید");
        }
    }, [location]);

    return (
        <Navbar bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">
                    {"Gympin"+(place?(" - "+place.Name):"")}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
