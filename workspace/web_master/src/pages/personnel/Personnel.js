import React, {useContext, useEffect, useState} from 'react';
import _AddPersonnel from "./_AddPersonnel";
import _PersonnelList from "./_PersonnelList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../network/api/placePersonnel.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {Grid, Typography} from "@mui/material";
import {getWizardComplete} from "../../helper/pocket";

const Personnel = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [personnelList, SetPersonnelList] = useState(null);
    const introMode = !getWizardComplete()

    useEffect(() => {
        document.title = 'مدیریت پرسنل';
        getPersonnelList();
    }, []);

    function getPersonnelList() {
        SetPersonnelList(null);
        placePersonnel_ByPlace({Id: place?.Id}).then(result => {
            SetPersonnelList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return <AccessDenied/>;

    return (
        <>
            {personnelList && <_AddPersonnel renewList={getPersonnelList}/>}
            {introMode && <Grid sx={{p: 2}}>
                <Typography variant={"subtitle1"}>
                    لطفا پرسنل مرکز را در این قسمت وارد نمایید.
                </Typography>
                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                    پس از تکمیل فرم میتوانید از قسمت تنظیمات ← پرسنل ، دسترسی های لازم برای پرسنل را بدهید.
                </Typography>
                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                    پرسنلی که دسترسی به آنها داده نشده باشد امکان استفاده از هیچ بخشی از اپلیکیشن را ندارد.
                </Typography>
            </Grid>}
            {personnelList && <_PersonnelList personnelList={personnelList} renewList={getPersonnelList}/>}
            {/*{personnelList&&<_AddCoach renewList={getPersonnelList}/>}*/}
            {/*{personnelList&&<_CoachList personnelList={personnelList} renewList={getPersonnelList}/>}*/}
        </>
    );
};

export default Personnel;
