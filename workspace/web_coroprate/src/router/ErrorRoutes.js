import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "../pages/error/NotFound";

export default function ErrorsRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate exact={true} to="/error/404" />} />
            <Route path="/404" element={<NotFound />} />
        </Routes>
    );
}
