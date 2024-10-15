import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import Finance from "../pages/finance/Finance";
import Management from "../pages/management/Management";
import Users from "../pages/users/Users";
import NNavigaion from "../components/NNavigaion";
import NBottomNavigation from "../components/NBottomNavigation";
import CorporateDetail from "../pages/corporateDetail/EditCorporate";
import IncreaseGroupCredit from "../pages/increaseGroupCredit/IncreaseGroupCredit";
import SingleUser from "../pages/singleUser/SingleUser";
import Settings from "../pages/settings/Settings";
import Groups from "../pages/Groups/Groups";
import IncreaseHistory from "../pages/IncreaseListPeyment/IncreaseHistory";
import Support from "../pages/support/Support";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import EditProfile from "../pages/editProfile/EditProfile";

export default function ApplicationRoutes() {

    return (
        <>
            <NNavigaion/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/management/details" element={<CorporateDetail/>}/>
                <Route path="/management/settings" element={<Settings/>}/>
                <Route path="/management/categories" element={<Groups/>}/>
                <Route path="/management" element={<Management/>}/>

                <Route path="/finance/IncreaseHistory" element={<IncreaseHistory/>}/>
                <Route path="/finance" element={<Finance/>}/>

                <Route path="/management/support" element={<Support/>}/>
                <Route path="/management/Support/detail/:supportId" element={<SupportDetail/>}/>

                <Route path="/personnel/increasegroupcredit" element={<IncreaseGroupCredit/>}/>
                <Route path="/personnel/detail/:PersonnelId" element={<SingleUser/>}/>
                <Route path="/personnel" element={<Users/>}/>
                <Route path="/profile" element={<EditProfile/>}/>

            </Routes>
            <NBottomNavigation/>
        </>
    )
}
