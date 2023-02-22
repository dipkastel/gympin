import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import IncreaseList from "../pages/IncreaseListPeyment/IncreaseList";
import CorporateDetail from "../pages/corporateDetail/EditCorporate";
import IncreaseGroupCredit from "../pages/increaseGroupCredit/IncreaseGroupCredit";
import SingleUser from "../pages/singleUser/SingleUser";
import Settings from "../pages/settings/Settings";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/management/details" element={<CorporateDetail/>}/>
                <Route path="/management/settings" element={<Settings/>}/>
                <Route path="/management" element={<Management/>}/>

                <Route path="/finance/increaselist" element={<IncreaseList/>}/>
                <Route path="/finance" element={<Finance/>}/>

                <Route path="/personnel/increasegroupcredit" element={<IncreaseGroupCredit/>}/>
                <Route path="/personnel/detail/:PersonnelId" element={<SingleUser/>}/>
                <Route path="/personnel" element={<Users/>}/>

            </Routes>
            <NBottomNavigation/>
        </>
    )
}
