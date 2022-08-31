import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import Home from "../pages/home/Home";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import AuthRoutes from "./AuthRoutes"
import Places from "../pages/places/Places";
import Profile from "../pages/profile/Profile";
import Tickets from "../pages/tickets/Tickets";
import Wallet from "../pages/wallet/Wallet";
import Notifs from "../pages/notifs/Notifs";
import Place from "../pages/place/Place";
import ActionQR from "../pages/actionQR/ActionQR";
import Survey from "../pages/survey/Survey";
import InviteFriends from "../pages/inviteFriends/InviteFriends";
import EditProfile from "../pages/editProfile/EditProfile";

export default function ApplicationRoutes() {

    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null,
        }),
        shallowEqual
    );
    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/places" element={<Places/>}/>

                <Route path="/place" element={<Place/>}/>

                <Route path="/profile" element={isAuthorized?<Profile/>: <AuthRoutes/>}/>
                <Route path="/profile/survey" element={isAuthorized?<Survey/>: <AuthRoutes/>}/>
                <Route path="/profile/invitefriends" element={isAuthorized?<InviteFriends/>: <AuthRoutes/>}/>
                <Route path="/profile/edit" element={isAuthorized?<EditProfile/>: <AuthRoutes/>}/>

                <Route path="/tickets" element={isAuthorized?<Tickets/>: <AuthRoutes/>}/>
                <Route path="/tickets/actionqr" element={isAuthorized?<ActionQR/>: <AuthRoutes/>}/>

                <Route path="/wallet" element={isAuthorized?<Wallet/>: <AuthRoutes/>}/>

                <Route path="/notifs" element={isAuthorized?<Notifs/>: <AuthRoutes/>}/>

                <Route path="/auth/*" element={<AuthRoutes/>} />

            </Routes>
            <NBottomNavigation/>
        </>
    )
}
