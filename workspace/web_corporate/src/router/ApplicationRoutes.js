import React, {useEffect, useState} from "react";
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
import {useSelector} from "react-redux";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import {getWizardComplete, setWizardComplete} from "../helper/pocket";
import WizardBody from "../pages/wizard/body/WizardBody";

export default function ApplicationRoutes() {


    const user = useSelector(state => state.auth.user);
    const corporate = useSelector(({corporate}) => corporate?.corporate);
    const inSettings = useSelector(settings=>settings.settings.server);
    const navigate = useNavigate();
    const [inWizardComplete,setInWizardComplete] = useState(true);


    useEffect(() => {

        try{
            setInWizardComplete(corporate.Status!=="PREREGISTER");
            setWizardComplete(corporate.Status!=="PREREGISTER");
        }catch (e) {
            setInWizardComplete(true);
            setWizardComplete(true);
        }
    }, [inSettings]);

    useEffect(() => {
        if (!getWizardComplete()) navigate('/intro/wizard', {replace: true});
    }, []);

    return (
        <>

            {inWizardComplete?(<>
                {/*<NNavigaion/>*/}

                {corporate?.Status === "INACTIVE" &&
                <Route path="/*" element={<Navigate to={"/error/inactive"}/>}/>
                }
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

                    <Route path="/*" element={<Navigate to={"/error/404"}/>}/>

                </Routes>
                {/*<NBottomNavigation/>*/}
            </>):(<>
                <Routes>
                    <Route path="/intro/wizard" element={<WizardBody/>}/>
                    <Route path="/management/settings" element={<Settings/>}/>
                </Routes>
            </>)}
        </>
    )
}
