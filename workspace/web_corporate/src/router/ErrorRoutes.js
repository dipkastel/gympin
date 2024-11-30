import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "../pages/error/NotFound";
import NNavigaion from "../components/NNavigaion";
import Inactive from "../pages/error/Inactive";

export default function ErrorsRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/" element={<Navigate exact={true} to="/error/404" />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/inactive" element={<Inactive />} />
            </Routes>
        </>
    );
}
