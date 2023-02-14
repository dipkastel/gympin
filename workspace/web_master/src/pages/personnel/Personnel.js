import React, {useContext, useEffect, useState} from 'react';
import _AddPersonnel from "./_AddPersonnel";
import _PersonnelList from "./_PersonnelList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../network/api/placePersonnel.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";

const Personnel = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [personnelList,SetPersonnelList] = useState(null);

    useEffect(() => {
        getPersonnelList();
    }, []);

    function getPersonnelList() {
        SetPersonnelList(null);
        placePersonnel_ByPlace({Id:place.Id}).then(result=>{
            console.log(result.data.Data);
            SetPersonnelList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return (<></>);

    return (
        <>
            {personnelList&&<_AddPersonnel renewList={getPersonnelList}/>}
            {personnelList&&<_PersonnelList personnelList={personnelList} renewList={getPersonnelList}/>}
        </>
    );
};

export default Personnel;
