import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {Halls_getByPlace} from "../../network/api/halls.api";
import _HallList from "./_HallList";
import _AddHall from "./_AddHall";
import {Grid, Typography} from "@mui/material";
import {getWizardComplete} from "../../helper/pocket";

const Halls = ({hallListChange,introCanGoNext}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [hallsList, SetHallsList] = useState(null);

    const introMode = !getWizardComplete()

    useEffect(() => {
        document.title = 'مدیریت سالن ها';
        getHallList();
    }, []);

    useEffect(() => {
        if (introMode)
            hallListChange(hallsList)
        try{
            introCanGoNext(hallsList?.length>0)
        }catch (e){}
    }, [hallsList]);



    function getHallList() {
        SetHallsList(null);
        Halls_getByPlace({Id: place.Id}).then(result => {
            SetHallsList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if (!getAccessOf(personnelAccessEnumT.ManagementHalls))
        return <AccessDenied/>;

    return (
        <>
            {hallsList && <_AddHall renewList={getHallList}/>}
            <Grid container sx={{p:2}} >
                <Typography variant={"subtitle2"}>
                    سالن محلی است که خدمات یا ورزش ها در آن انجام میشود.
                </Typography>
                <Typography variant={"subtitle2"}>
                    هر مجموعه شامل یک یا چند سالن می باشد.
                </Typography>
                <Typography color={"#a2a2a2"} variant={"caption"}>
                    از این سالن ها برای تفکیک محل استفاده ورزش ها استفاده میشود در ادامه برای هر سالن فعالیت و زمان فعالیت ثبت میشود.
                </Typography>
                <Typography color={"#a2a2a2"} variant={"caption"}>
                    سالن ها ممکن است به هم پیوسته باشند مثلا سالن ورزش هوازی در ادامه سالن بدنسازی باشد اما به صورت جدا گانه وارد میشود.چرا که ورزش متفاوتی مانند پیلاتس در آن قسمت انجام می شود.
                </Typography>
                <Typography sx={{width:"100%"}} color={"#a2a2a2"} variant={"subtitle2"}>
                    مثال:
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                     هوازی
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    بدنسازی
                </Typography>
                <Typography sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    استخر کودکان
                </Typography>
                <Typography sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    منطقه پرواز 1
                </Typography>
            </Grid>
            {hallsList && <_HallList hallList={hallsList} renewList={getHallList}/>}
        </>
    );
};

export default Halls;
