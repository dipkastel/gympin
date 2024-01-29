import React, {useContext, useEffect, useState} from 'react';
import _AddPersonnel from "./_AddPersonnel";
import _PersonnelList from "./_PersonnelList";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../network/api/placePersonnel.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import _AddCoach from "./_AddCoach";
import _CoachList from "./_CoachList";

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
            SetPersonnelList(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return <AccessDenied/>;

    return (
        <>
            {personnelList&&<_AddPersonnel renewList={getPersonnelList}/>}
            {personnelList&&<_PersonnelList personnelList={personnelList} renewList={getPersonnelList}/>}
            {personnelList&&<_AddCoach renewList={getPersonnelList}/>}
            {personnelList&&<_CoachList personnelList={personnelList} renewList={getPersonnelList}/>}
        </>
    );
};

export default Personnel;
