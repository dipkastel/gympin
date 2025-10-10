import React, {useEffect} from "react";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Places from "../pages/places/Places";
import PlacesMap from "../pages/places/map/PlacesMap";
import TicketsHistory from "../pages/tickets/TicketsHistory";
import Wallet from "../pages/wallet/Wallet";
import Notifs from "../pages/notifs/Notifs";
import Place from "../pages/places/place/Place";
import SingleSubscribe from "../pages/tickets/singleSubscribe/SingleSubscribe";
import Survey from "../pages/survey/Survey";
import InviteFriends from "../pages/inviteFriends/InviteFriends";
import EditProfile from "../pages/editProfile/EditProfile";
import Checkout from "../pages/checkout/Checkout";
import Invoices from "../pages/invoices/invoices";
import UserBasket from "../pages/basket/UserBasket";
import Coaches from "../pages/coaches/Coaches";
import Coach from "../pages/coaches/coach/Coach";
import SingleCourse from "../pages/tickets/singleCourse/SingleCourse";
import Settings from "../pages/settings/Settings";
import UserRequests from "../pages/wallet/userReqests/UserRequests";
import {NotFound} from "../pages/error/NotFound";
import Login from "../pages/auth/Login";
import LogoutPage from "../pages/auth/Logout";
import PageLayout from "../components/PageLayout";
import {useColorScheme} from "@mui/material";
import TicketsActive from "../pages/tickets/TicketsActive";
import NewHome from "../pages/newHome/NewHome";
import Code from "../pages/auth/Code";
import Support from "../pages/support/Support";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import FoodSelect from "../pages/Food/FoodSelect";

export default function ApplicationRoutes() {
    const isAuthorized = useSelector(({auth: {user}}) => user ? user.Id != null : false);


    const {mode, setMode} = useColorScheme();
    useEffect(() => {
        setMode("light");
    }, []);

    function DynamicRedirect({to}) {
        const params = useParams();
        const resolvedPath = Object.keys(params).reduce(
            (path, param) => path.replace(`:${param}`, params[param]), to);
        return <Navigate to={resolvedPath} replace/>;
    }

    return (
        <>

            {isAuthorized && <PageLayout>
                <Routes>
                    {/*<Route path="/" element={<NewHome/>}/>*/}
                    <Route path="/" element={<NewHome/>}/>
                    <Route path="/places" element={<Places/>}/>
                    <Route path="/foodSelect" element={<FoodSelect/>}/>
                    <Route path="/places/:sid" element={<Places/>}/>
                    <Route path="/place/:placeId" element={<Place/>}/>
                    <Route path="/placesMap" element={<PlacesMap/>}/>
                    <Route path="/coaches" element={<Coaches/>}/>
                    <Route path="/profile/survey" element={<Survey/>}/>
                    <Route path="/profile/invitefriends" element={<InviteFriends/>}/>
                    <Route path="/profile/edit" element={<EditProfile/>}/>
                    <Route path="/support" element={<Support/>}/>
                    <Route path="/support/detail/:supportId" element={<SupportDetail/>}/>
                    {/*<Route path="/profile" element={ <Profile/>}/>*/}
                    {/*tickets*/}
                    <Route path="/tickets" element={<TicketsActive/>}/>
                    <Route path="/ticketsHistory" element={<TicketsHistory/>}/>
                    <Route path="/tickets/singleSubscribe/:subscribeKey" element={<SingleSubscribe/>}/>
                    <Route path="/tickets/singleCourse/:courseKey" element={<SingleCourse/>}/>
                    <Route path="/wallet" element={<Wallet/>}/>
                    <Route path="/wallet/:code" element={<Wallet/>}/>
                    {/*<Route path="/UserTransactions" element={isAuthorized?<UserTransactions/>: <AuthRoutes/>}/>*/}
                    <Route path="/UserRequests" element={<UserRequests/>}/>
                    <Route path="/checkout/:formData" element={<Checkout/>}/>
                    <Route path="/notifs" element={<Notifs/>}/>
                    <Route path="/invoices" element={<Invoices/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/basket" element={<UserBasket/>}/>
                    <Route path="/coach/:coachId" element={<Coach/>}/>
                    <Route path="/auth/*" element={<Navigate to={"/"}/>}/>
                    <Route path="/login" element={<Navigate to={"/"}/>}/>
                    <Route path="/login/:code" element={<Navigate to={"/"}/>}/>
                    <Route path="/logout" element={<LogoutPage/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                    <Route path="/code/:code" element={<DynamicRedirect to={"/wallet/:code"}/>}/>
                    <Route path="/*" element={<Navigate exact={true} to="/error/404"/>}/>
                </Routes>
            </PageLayout>}

            {!isAuthorized &&
                <Routes>
                    <Route path="/place/:placeId" element={<Place/>}/>
                    <Route path="/code/:code" element={<Code/>}/>
                    <Route path="/coach/:coachId" element={<Coach/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/login/:code" element={<Login/>}/>
                    <Route path="/logout" element={<Navigate to={"/"}/>}/>
                    <Route path="/*" element={<Navigate exact={true} to="/login"/>}/>
                </Routes>}
        </>
    )
}
