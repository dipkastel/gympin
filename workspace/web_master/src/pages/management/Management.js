import React, {useEffect} from "react";
import _ListItem from "./_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _PlaceActivity from "./_PlaceActivity";
import {useSelector} from "react-redux";
import placeData from "./PlaceData";


export default function Management() {
    const currentUser = useSelector(({auth}) => auth.user);

    useEffect(() => {
        document.title = 'مدیریت';
    }, []);

    return (
        <>
            {getAccessOf(personnelAccessEnumT.ManagementStatus)&&<_PlaceActivity ShowIfActive={false}/>}

            {getAccessOf(personnelAccessEnumT.ManagementTickets) &&
            <_ListItem title="فروشی ها" destination="/management/tickets"/>}
            {/*{currentUser.UserRole.includes("COACH")&&*/}
            {/*<_ListItem title="بخش مربی" destination="/management/coach"/>}*/}
            <_ListItem title="اطلاعات مجموعه" destination="/management/placeData"/>
            <_ListItem title="پروفایل من" destination="/management/editprofile"/>
            <_ListItem title="پشتیبانی" destination="/management/support"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
        </>
    );
}
