import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import _PlaceTabs from "./_PlaceTabs";
import {getPlace} from "../../network/api/place.api";
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
    console.log(searchParams.get("id"))
    const [place, setPlace] = useState({});
    useEffect(() => {
        getPlace(searchParams.get("id")).then(result=>{
            console.log("getPlace",result);
            setPlace(result.data.Data);
        }).catch(e=>console.log(e))
    }, [searchParams]);

    return (
        <>
            <_PlaceImages images={data.images}/>
            <_PlaceTabs data={data}/>
        </>
    );
};

export default Place;
