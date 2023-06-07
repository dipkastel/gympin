import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {InputLabel, Switch} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    placePersonnel_getGateAccess,
    placePersonnel_updatePersonnelGateAccess
} from "../../../../../network/api/placePersonnel.api";

const _placePersonelGateAccess = ({personel}) => {
    const error = useContext(ErrorContext);
    const [userAccess,SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);

    function getAccess() {
        placePersonnel_getGateAccess({placeId: personel.Place.Id,userId: personel.User.Id}).then(result=>{
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
        placePersonnel_updatePersonnelGateAccess([item]).then(result=>{
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
                    title={"دسترسی گیت ها"}
                />

                <PortletBody>

                    {userAccess && userAccess.map(item => (
                        <div key={"gateAccess-" + item.Gate.Name}>
                            <InputLabel htmlFor={item.Gate.Name}>{item.Gate.Name}</InputLabel>
                            <Switch id={item.Gate.Name} checked={item.Access} onChange={(e)=>changeAccess(item,e)}/>
                        </div>
                    ))}

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelGateAccess;
