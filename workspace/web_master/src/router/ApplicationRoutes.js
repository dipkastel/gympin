import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Report from "../pages/report/Report";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/finance" element={<Finance/>}/>
                <Route path="/management" element={<Management/>}/>
                <Route path="/report" element={<Report/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <NBottomNavigation/>
        </>
    )
}
