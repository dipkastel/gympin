import React from "react";
import _ListItem from "./_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";


export default function Management() {
    return (
        <>
            {getAccessOf(personnelAccessEnumT.ManagementTickets) &&
            <_ListItem title="فروشی ها" destination="/management/tickets"/>}
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
