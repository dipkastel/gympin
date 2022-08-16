import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Report from "../pages/report/Report";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import Nqrscan from "../pages/qr-scan/Nqrscan";
import Gate from "../pages/gate/Gate";
import About from "../pages/about/About";
import DemandPeyment from "../pages/demandPeyment/DemandPeyment";
import SingleUser from "../pages/singleUser/SingleUser";
import Facilities from "../pages/facilities/Facilities";
import ManageStall from "../pages/ManageStall/ManageStall";
import Profile from "../pages/profile/Profile";
import Stall from "../pages/stall/Stall";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/management" element={<Management/>}/>
                <Route path="/management/gate" element={<Gate/>}/>
                <Route path="/management/about" element={<About/>}/>
                <Route path="/management/facilities" element={<Facilities/>}/>
                <Route path="/management/stall" element={<ManageStall/>}/>
                <Route path="/management/profile" element={<Profile/>}/>

                <Route path="/finance" element={<Finance/>}/>
                <Route path="/finance/demand" element={<DemandPeyment/>}/>

                <Route path="/users" element={<Users/>}/>
                <Route path="/users/singleuser" element={<SingleUser/>}/>
                <Route path="/users/qrscan" element={<Nqrscan/>}/>

                <Route path="/stall" element={<Stall/>}/>
                <Route path="/stall/qrscan" element={<Nqrscan/>}/>

                <Route path="/report" element={<Report/>}/>

                <Route path="/" element={<Home/>}/>
            </Routes>
            <NBottomNavigation/>
        </>
    )
}