import React from "react";
import _PlaceTrafic from "./_PlaceTraffic";
import _PlaceGates from "./_PlaceGates";
import _PlacePlans from "./_PlacePlans";
import _ListItem from "./_ListItem";
import _PlaceActivity from "./_PlaceActivity";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";


export default function Management(){
    return (
        <>
            {getAccessOf(personnelAccessEnumT.ManagementStatus)&&<_PlaceActivity/>}
            {/*<_PlaceTrafic/>*/}
            {getAccessOf(personnelAccessEnumT.ManagementGates)&&<_PlaceGates/>}
            {getAccessOf(personnelAccessEnumT.ManagementPlans)&&<_PlacePlans/>}
            {getAccessOf(personnelAccessEnumT.ManagementImages)&&<_ListItem title="تصاویر" destination="/management/images"/>}
            {getAccessOf(personnelAccessEnumT.ManagementPersonnel)&&<_ListItem title="پرسنل مجموعه" destination="/management/personnel"/>}
            {getAccessOf(personnelAccessEnumT.ManagementAbout)&&<_ListItem title="درباره مرکز" destination="/management/about"/>}
            {getAccessOf(personnelAccessEnumT.ManagementOptions)&&<_ListItem title="امکانات مرکز" destination="/management/facilities"/>}
            <_ListItem title="پروفایل من" destination="/management/editprofile"/>
            <_ListItem title="پشتیبانی" destination="/management/support"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
        </>
    );
}
