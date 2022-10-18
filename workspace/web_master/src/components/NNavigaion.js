import React, {useEffect} from "react";
import {Container, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


export default function NNavigaion(){
    const place = useSelector(({auth}) => auth.place)
    const location = useLocation();
    useEffect(() => {
        if(!place&&!window.location.toString().includes("/management/settings")){
            window.location = "/management/settings"
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
