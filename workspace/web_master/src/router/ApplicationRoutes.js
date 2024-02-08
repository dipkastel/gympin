import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Report from "../pages/report/Report";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import Hall from "../pages/halls/singleHall/Hall";
import About from "../pages/about/About";
import DemandPayment from "../pages/demandPeyment/DemandPayment";
import SingleUser from "../pages/singleUser/SingleUser";
import Option from "../pages/options/Option";
import ManageStall from "../pages/ManageStall/ManageStall";
import Profile from "../pages/profile/Profile";
import Stall from "../pages/stall/Stall";
import Personnel from "../pages/personnel/Personnel";
import SingleTicketSubscribe from "../pages/tickets/subscribe/singleSubscribe/SingleTicketSubscribe";
import Images from "../pages/images/Images";
import SingleSubscribe from "../pages/purchased/subscribe/single/SingleSubscribe";
import Support from "../pages/support/Support";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import Settings from "../pages/settings/Settings";
import Place from "../pages/place/Place";
import QrSettings from "../pages/qrSettings/QrSettings";
import EditProfile from "../pages/editProfile/EditProfile";
import QrList from "../pages/qrSettings/QrList";
import PersonnelAccess from "../pages/personnelAccess/PersonnelAccess";
import {useSelector} from "react-redux";
import store from "../helper/redux/store";
import {sagaActions} from "../helper/redux/actions/SagaActions";
import PageNotFound from "../components/PageNotFound";
import Halls from "../pages/halls/Halls";
import TicketsManagement from "../pages/tickets/TicketsManagement";
import SubscribesList from "../pages/tickets/subscribe/SubscribesList";
import PurchasedSubscribe from "../pages/purchased/subscribe/PurchasedSubscribe";
import Sports from "../pages/sports/Sports";
import CoursesList from "../pages/tickets/course/CoursesList";
import SingleTicketCourse from "../pages/tickets/course/singleCourse/SingleTicketCourse";

export default function ApplicationRoutes() {

    const user = useSelector(state => state.auth.user);
    const place = useSelector(({place}) => place.place);
    useEffect(() => {
        getAccess();
        var interval = setInterval(function () {
            getAccess();
        },1000*60*5)
        return () => {
            clearInterval(interval);
        };
    }, []);

    function getAccess(){
        try{
            store.dispatch(sagaActions.RequestAccess(user.Id,place.Id));
        }catch (e) {}
    }

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/management/hall/:hallId" element={<Hall/>}/>
                <Route path="/management/halls" element={<Halls/>}/>
                <Route path="/management/about" element={<About/>}/>
                <Route path="/management/facilities" element={<Option/>}/>
                <Route path="/management/sports" element={<Sports/>}/>
                <Route path="/management/stall" element={<ManageStall/>}/>
                <Route path="/management/personnel" element={<Personnel/>}/>
                <Route path="/management/personnelAccess" element={<PersonnelAccess/>}/>
                <Route path="/management/images" element={<Images/>}/>
                <Route path="/management/support" element={<Support/>}/>
                <Route path="/management/Support/detail/:supportId" element={<SupportDetail/>}/>
                <Route path="/management/settings" element={<Settings/>}/>
                <Route path="/management/place" element={<Place/>}/>
                <Route path="/management/qrManagement" element={<QrSettings/>}/>
                <Route path="/management/qrList" element={<QrList/>}/>
                <Route path="/management/profile" element={<Profile/>}/>
                <Route path="/management/editProfile" element={<EditProfile/>}/>
                <Route path="/management" element={<Management/>}/>

                {/*tickets*/}
                <Route path="/management/tickets" element={<TicketsManagement/>}/>

                <Route path="/ticket/subscribes" element={<SubscribesList/>}/>
                <Route path="/ticket/SingleTicketSubscribe/:subscribeId" element={<SingleTicketSubscribe/>}/>

                <Route path="/ticket/courses" element={<CoursesList/>}/>
                <Route path="/ticket/course/:courseId" element={<SingleTicketCourse/>}/>

                {/*purchased*/}
                <Route path="/purchased/subscribes" element={<PurchasedSubscribe/>}/>

                <Route path="/finance/demand" element={<DemandPayment/>}/>
                <Route path="/finance" element={<Finance/>}/>

                <Route path="/users/singleuser" element={<SingleUser/>}/>
                <Route path="/users/SingleSubscribe" element={<SingleSubscribe/>}/>
                <Route path="/users" element={<Users/>}/>
                {/*<Route path="/users/:section" element={<Users/>}/>*/}

                <Route path="/stall" element={<Stall/>}/>

                <Route path="/report" element={<Report/>}/>

                <Route path="/" element={<Home/>}/>
                <Route path="/*" element={<PageNotFound/>}/>

            </Routes>
            <NBottomNavigation/>
        </>
    )
}
