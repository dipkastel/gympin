import React, {useEffect} from "react";
import {Container, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ReactGA from "react-ga4";


export default function NNavigaion(){
    const navigate = useNavigate();
    const place = useSelector(({place}) => place.place)
    const currentUser = useSelector(({auth}) => auth.user);
    const location = useLocation();
    useEffect(() => {
        if(currentUser&&place&&currentUser.Username&&place.Name){
            try{
                ReactGA.gtag( {
                    action: "user_place_use",
                    Username:currentUser.Username,
                    Placename:place.Name
                });
            }catch (e){}
        }
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
