import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
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
