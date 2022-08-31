import React from 'react';
import _ReserveDetail from "./_ReserveDetail";
import _EnterList from "./_EnterList";

const data = {
    id: 458,
    item: "ورود تک جلسه",
    itemDesc: "توضیح تکمیلی بلیت",
    deletable: true,
    placeName: "باشگاه ورزشی امیر",
    reserveDate: "8-8-2022 12:01:15",
    expireDate: "8-10-2022 12:01:15",
    peyDate: "8-8-2022 12:05:15",
    useCount: 1,
    MaxUse: 1,
    price: 148000,
    enters: [{
        id: 156,
        used: false,
        code: "15485asda"
    }]
}
const ActionQR = () => {
    return (
        <>
            <_ReserveDetail data={data}/>
            <_EnterList data={data}/>
        </>
    );
};

export default ActionQR;
