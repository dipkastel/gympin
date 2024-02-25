import React, {useEffect} from "react";
import _ListItem from "./_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _PlaceActivity from "./_PlaceActivity";


export default function Management() {
    useEffect(() => {
        document.title = 'مدیریت';
    }, []);

    return (
        <>
            {getAccessOf(personnelAccessEnumT.ManagementStatus)&&<_PlaceActivity ShowIfActive={false}/>}
            {getAccessOf(personnelAccessEnumT.ManagementTickets) &&
            <_ListItem title="فروشی ها" destination="/management/tickets"/>}
            {getAccessOf(personnelAccessEnumT.ManagementSports) &&
            <_ListItem title="ورزش ها" destination="/management/sports"/>}
            {getAccessOf(personnelAccessEnumT.ManagementHalls) &&
            <_ListItem title="سالن ها" destination="/management/Halls"/>}
            {getAccessOf(personnelAccessEnumT.ManagementImages) &&
            <_ListItem title="تصاویر" destination="/management/images"/>}
            {getAccessOf(personnelAccessEnumT.ManagementPersonnel) &&
            <_ListItem title="پرسنل مجموعه" destination="/management/personnel"/>}
            {getAccessOf(personnelAccessEnumT.ManagementAbout) &&
            <_ListItem title="درباره مرکز" destination="/management/about"/>}
            {getAccessOf(personnelAccessEnumT.ManagementOptions) &&
            <_ListItem title="امکانات مرکز" destination="/management/facilities"/>}
            <_ListItem title="پروفایل من" destination="/management/editprofile"/>
            <_ListItem title="پشتیبانی" destination="/management/support"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
        </>
    );
}
