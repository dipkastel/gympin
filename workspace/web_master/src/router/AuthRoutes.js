import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Report from "../pages/report/Report";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import {BrowserRouter} from "react-router-dom";
import Login from "../pages/auth/Login";
import LogoutPage from "../pages/auth/Logout";
import Register from "../pages/auth/Register";

export default function AuthRoutes() {

    return (
            <Routes>
                    <Route path="/" element={<Navigate exact={true} to="/auth/login" />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<LogoutPage/>} />
                    <Route path="/register" element={<Register/>} />
            </Routes>
    )
}
