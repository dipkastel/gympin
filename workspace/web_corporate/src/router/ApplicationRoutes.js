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
import IncreaseList from "../pages/IncreaseListPeyment/IncreaseList";
import Stall from "../pages/stall/Stall";
import CorporateDetail from "../pages/corporateDetail/CorporateDetail";
import IncreaseGroupCredit from "../pages/increaseGroupCredit/IncreaseGroupCredit";
import SingleUser from "../pages/singleUser/SingleUser";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/management" element={<Management/>}/>
                <Route path="/management/details" element={<CorporateDetail/>}/>

                <Route path="/finance" element={<Finance/>}/>
                <Route path="/finance/increaselist" element={<IncreaseList/>}/>

                <Route path="/users" element={<Users/>}/>
                <Route path="/users/increasegroupcredit" element={<IncreaseGroupCredit/>}/>
                <Route path="/users/Detail" element={<SingleUser/>}/>

                <Route path="/stall" element={<Stall/>}/>
                <Route path="/stall/qrscan" element={<Nqrscan/>}/>

                <Route path="/report" element={<Report/>}/>

                <Route path="/" element={<Home/>}/>
            </Routes>
            <NBottomNavigation/>
        </>
    )
}
