import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/auth/Login";
import LogoutPage from "../pages/auth/Logout";
import Register from "../pages/auth/Register";
import {shallowEqual, useSelector} from "react-redux";

export default function AuthRoutes() {

    const  isAuthorized  = useSelector( ({auth:{user}})=>  user?user.Id!=null:false );
    return (
        <Routes>
            <Route path="/" element={isAuthorized?<Navigate to={"/"} />:<Navigate exact={true} to="/auth/login"/>}/>
            <Route path="/login" element={isAuthorized?<Navigate to={"/"} />:<Login/>}/>
            <Route path="/register" element={isAuthorized?<Navigate to={"/"} />:<Register/>}/>
            <Route path="/logout" element={isAuthorized?<LogoutPage/>:<Navigate to={"/"} />}/>
        </Routes>
    )
}
