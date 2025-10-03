import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {placePersonnel_getAccess, placePersonnel_updatePersonnelAccess} from "../../../../../network/api/placePersonnel.api";
import {InputLabel, Switch} from "@mui/material";
import {personnelAccessEnum} from "../../../../../helper/enums/personnelAccessEnum";

const _placePersonelAccess = ({personel}) => {
    const error = useContext(ErrorContext);
    const [userAccess,SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);

    function getAccess() {
        placePersonnel_getAccess({placeId: personel.Place.Id,userId: personel.User.Id}).then(result=>{
            SetUserAccess(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function changeAccess(item, e) {
        item.Access = e.target.checked;
        placePersonnel_updatePersonnelAccess([item]).then(result=>{
            getAccess();
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>

            <Portlet >
                <PortletHeader
                    title={"دسترسی"}
                />

                <PortletBody>

                    {userAccess && userAccess.map(item => (
                            <div key={"access-" + item.Section}>
                                <InputLabel htmlFor={item.Section}>{personnelAccessEnum[item.Section]}</InputLabel>
                                <Switch id={item.Section} checked={item.Access} onChange={(e)=>changeAccess(item,e)}/>
                            </div>
                    ))}

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelAccess;
