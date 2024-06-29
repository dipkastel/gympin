import React, {useContext, useEffect, useState} from 'react';
import _SettingsPlaces from "./_SettingsPlaces";
import _ListItem from "../management/_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import {getWizardComplete, setWizardComplete, setWizardLevel} from "../../helper/pocket";
import {user_GetUserSettings, user_SetUserSettings} from "../../network/api/user.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";

const Settings = () => {
    const [userHasIntro,setUserHasIntro]=useState(false);
    const navigate = useNavigate();
    const user = useSelector(({auth}) => auth.user);
    const [wizard,setWizard] = useState([]);
    const error = useContext(ErrorContext);

    useEffect(() => {
        document.title = 'تنظیمات';
        getWizardId();
    }, []);

    const introMode=!getWizardComplete()


    function getWizardId() {
        user_GetUserSettings({Id:user.Id}).then(data=>{
            setWizard(data.data.Data?.filter(s=>s.Key=="USER_WIZARD_COMPLETE")?.[0]);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function activeWizard() {
        user_SetUserSettings({Id:wizard?.Id,Value:false,Key:"USER_WIZARD_COMPLETE",User:{Id:user.Id}}).then(result=>{
            error.showError({message: "با موفقیت انجام شد.",});
            setWizardLevel(0);
            setWizardComplete(false);
            setTimeout(function () {
                window.location = "/"
                navigate('/home', {replace: false});
            }, 2000);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <_SettingsPlaces setUserHasIntro={setUserHasIntro}/>
            {!introMode&&userHasIntro&&<_ListItem title="فعال سازی مراحل ورود اطلاعات" onClick={()=>activeWizard()}/>}
            {!introMode&&getAccessOf(personnelAccessEnumT.ManagementSettingsQr)&&<_ListItem title="کنترل qr کد ها" destination="/management/qrManagement"/>}
            {!introMode&&<_ListItem title="خروج" destination="/auth/logout"/>}
        </>
    );
};

export default Settings;
