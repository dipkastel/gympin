import React from "react";
import _PlaceTrafic from "./_PlaceTraffic";
import _PlaceGates from "./_PlaceGates";
import _PlacePlans from "./_PlacePlans";
import _ListItem from "./_ListItem";
import _PlaceActivity from "./_PlaceActivity";


export default function Management(){
    return (
        <>
            <_PlaceTrafic/>
            <_PlaceGates/>
            <_PlacePlans/>
            <_PlaceActivity/>
            <_ListItem title="تصاویر" destination="/management/images"/>
            <_ListItem title="پرسنل مجموعه" destination="/management/personel"/>
            <_ListItem title="درباره مرکز" destination="/management/about"/>
            <_ListItem title="امکانات مرکز" destination="/management/facilities"/>
            <_ListItem title="پروفایل من" destination="/management/editprofile"/>
            <_ListItem title="پشتیبانی" destination="/management/tickets"/>
            <_ListItem title="تنظیمات" destination="/management/settings"/>
        </>
    );
}
