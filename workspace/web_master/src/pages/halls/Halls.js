import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {Halls_getByPlace} from "../../network/api/halls.api";
import _HallList from "./_HallList";
import _AddHall from "./_AddHall";

const Halls = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [hallsList, SetHallsList] = useState(null);

    useEffect(() => {
        document.title = 'مدیریت سالن ها';
        getHallList();
    }, []);

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
            {hallsList && <_HallList hallList={hallsList} renewList={getHallList}/>}
        </>
    );
};

export default Halls;
