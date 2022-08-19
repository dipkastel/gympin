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
                <Route path="/profile" element={isAuthorized?<Profile/>: <AuthRoutes/>}/>
                <Route path="/tickets" element={isAuthorized?<Tickets/>: <AuthRoutes/>}/>
                <Route path="/wallet" element={isAuthorized?<Wallet/>: <AuthRoutes/>}/>
                <Route path="/notifs" element={isAuthorized?<Notifs/>: <AuthRoutes/>}/>


                <Route path="/auth/*" element={isAuthorized?<Navigate to={"/"} />: <AuthRoutes/>} />



            </Routes>
            <NBottomNavigation/>
        </>
    )
}
