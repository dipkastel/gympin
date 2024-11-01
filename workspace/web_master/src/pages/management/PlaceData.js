import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _ListItem from "./_ListItem";
import {fixTextToSlug} from "../../helper/utils";

const PlaceData = () => {

    const currentPlace = useSelector(({place}) => place.place);
    const currentUser = useSelector(({auth}) => auth.user);
    console.log(currentPlace);
    useEffect(() => {
        document.title = 'مدیریت';
    }, []);
    return (
        <>

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
            <_ListItem  title="کاربران مجموعه را چطور می بینند؟" target="_blank" destination={"https://web.gympin.ir/place/"+currentPlace.Id+"-"+fixTextToSlug(currentPlace.Name)} bgColor={"#c9eac9"}/>
        </>
    );
};

export default PlaceData;
