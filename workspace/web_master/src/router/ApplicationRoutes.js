import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Report from "../pages/report/Report";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import _Nqrscan from "../pages/users/scan/_Nqrscan";
import Gate from "../pages/gate/Gate";
import About from "../pages/about/About";
import DemandPeyment from "../pages/demandPeyment/DemandPeyment";
import SingleUser from "../pages/singleUser/SingleUser";
import Option from "../pages/options/Option";
import ManageStall from "../pages/ManageStall/ManageStall";
import Profile from "../pages/profile/Profile";
import Stall from "../pages/stall/Stall";
import Personnel from "../pages/personnel/Personnel";
import Plans from "../pages/plans/Plans";
import Images from "../pages/images/Images";
import SingleTicket from "../pages/userPlan/SingleTicket";
import Support from "../pages/support/Support";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import Settings from "../pages/settings/Settings";
import Place from "../pages/place/Place";
import QrSettings from "../pages/qrSettings/QrSettings";
import EditProfile from "../pages/editProfile/EditProfile";
import QrList from "../pages/qrSettings/QrList";
import PersonnelAccess from "../pages/personnelAccess/PersonnelAccess";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/management/gate/:gateId" element={<Gate/>}/>
                <Route path="/management/plans/:planId" element={<Plans/>}/>
                <Route path="/management/about" element={<About/>}/>
                <Route path="/management/facilities" element={<Option/>}/>
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

                <Route path="/finance/demand" element={<DemandPeyment/>}/>
                <Route path="/finance" element={<Finance/>}/>

                <Route path="/users/singleuser" element={<SingleUser/>}/>
                <Route path="/users/SingleTicket" element={<SingleTicket/>}/>
                <Route path="/users" element={<Users/>}/>

                <Route path="/stall" element={<Stall/>}/>

                <Route path="/report" element={<Report/>}/>

                <Route path="/" element={<Home/>}/>
            </Routes>
            <NBottomNavigation/>
        </>
    )
}
