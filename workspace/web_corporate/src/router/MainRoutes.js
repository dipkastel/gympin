import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import ErrorsRoutes from "./ErrorRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import AuthRoutes from "./AuthRoutes";

export const MainRoutes = ({router}) => {

    const isAuthorized = useSelector(({auth: {token}}) => token != null);

    function getPageByRoute(router) {
        console.log(router)
        switch (router.pathname) {
            case '/auth/*' : return <AuthRoutes/>
            case '/error/*' : return <>جواب</>

        }
    }

    return (
        <>
            {router && getPageByRoute(router)}
            {!router &&
            <Routes>
                <Route path="/auth/*" element={<AuthRoutes/>}/>
                <Route path="/error/*" element={<ErrorsRoutes/>}/>
                <Route path="/*"
                       element={isAuthorized ? <ApplicationRoutes userLastLocation={"/"}/> : <Navigate to="/auth/login"/>}/>
            </Routes>
            }
        </>
    );
};
