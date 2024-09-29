import React from "react";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "../pages/home/Home";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import AuthRoutes from "./AuthRoutes"
import Places from "../pages/places/Places";
import Profile from "../pages/profile/Profile";
import Purchased from "../pages/tickets/Purchased";
import Wallet from "../pages/wallet/Wallet";
import Notifs from "../pages/notifs/Notifs";
import Place from "../pages/places/place/Place";
import SingleSubscribe from "../pages/tickets/singleSubscribe/SingleSubscribe";
import Survey from "../pages/survey/Survey";
import InviteFriends from "../pages/inviteFriends/InviteFriends";
import EditProfile from "../pages/profile/editProfile/EditProfile";
import Checkout from "../pages/checkout/Checkout";
import Invoices from "../pages/invoices/invoices";
import UserBasket from "../pages/basket/UserBasket";
import Coaches from "../pages/coaches/Coaches";
import Coach from "../pages/coaches/coach/Coach";
import SingleCourse from "../pages/tickets/singleCourse/SingleCourse";
import Settings from "../pages/settings/Settings";

export default function ApplicationRoutes() {
    const  isAuthorized  = useSelector( ({auth:{user}})=>  user?user.Id!=null:false );
    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/places" element={isAuthorized?<Places/>: <AuthRoutes/>}/>
                <Route path="/place/:placeId" element={<Place/>}/>

                <Route path="/coaches" element={isAuthorized?<Coaches/>: <AuthRoutes/>}/>
                <Route path="/coach/:coachId" element={<Coach/>}/>

                <Route path="/profile/survey" element={isAuthorized?<Survey/>: <AuthRoutes/>}/>
                <Route path="/profile/invitefriends" element={isAuthorized?<InviteFriends/>: <AuthRoutes/>}/>
                <Route path="/profile/edit" element={isAuthorized?<EditProfile/>: <AuthRoutes/>}/>
                <Route path="/profile" element={isAuthorized?<Profile/>: <AuthRoutes/>}/>

                {/*tickets*/}
                <Route path="/tickets" element={isAuthorized?<Purchased/>: <AuthRoutes/>}/>
                <Route path="/tickets/singleSubscribe/:subscribeKey" element={isAuthorized?<SingleSubscribe/>: <AuthRoutes/>}/>
                <Route path="/tickets/singleCourse/:courseKey" element={isAuthorized?<SingleCourse/>: <AuthRoutes/>}/>

                <Route path="/wallet" element={isAuthorized?<Wallet/>: <AuthRoutes/>}/>
                <Route path="/checkout/:formData"  element={isAuthorized?<Checkout/>: <AuthRoutes/>}/>

                <Route path="/notifs" element={isAuthorized?<Notifs/>: <AuthRoutes/>}/>

                <Route path="/invoices" element={isAuthorized?<Invoices/>: <AuthRoutes/>}/>

                <Route path="/settings" element={isAuthorized?<Settings/>: <AuthRoutes/>}/>

                <Route path="/basket" element={isAuthorized?<UserBasket/>: <AuthRoutes/>}/>

                <Route path="/auth/*" element={<AuthRoutes/>} />

            </Routes>
            <NBottomNavigation/>
        </>
    )
}
