import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _PlaceTabs from "./_PlaceTabs";
const data = {
    "id": 5,
    "name": "اکسیر جوان",
    "plan": 3,
    "address": "فلکه اول صادقیه",
    "workDays": "شنبه تا پنج شنبه",
    "shiftTime": "7 الی 24",
    "gender": "both",
    "facilities": [2, 5, 9, 10, 12],
    "sports": ["بدنسازی", "EMS", "trx"],
    "images": ["https://sportreserve.ir/storage/sportreserve-ir/1558/conversions/Jkf7CyTuCGrF6XsPL4mI-large.jpg","https://sportreserve.ir/storage/sportreserve-ir/1558/conversions/Jkf7CyTuCGrF6XsPL4mI-large.jpg"]
}
const Place = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [place, setPlace] = useState({});
    console.log(searchParams.get("id"))
    useEffect(() => {
            setPlace(data)
        console.log(data)
    }, [searchParams]);

    return (
        <>
            <_PlaceImages images={data.images}/>
            <_PlaceTabs data={data}/>
        </>
    );
};

export default Place;
