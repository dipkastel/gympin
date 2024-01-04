import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {InputLabel, Switch} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {
    placePersonnel_getBuyableAccess,
    placePersonnel_updatePersonnelBuyableAccess
} from "../../../../../network/api/placePersonnel.api";

const _placePersonelBuyableAccess = ({personel}) => {
    const error = useContext(ErrorContext);
    const [userAccess,SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);

    function getAccess() {
        placePersonnel_getBuyableAccess({placeId: personel.Place.Id,userId: personel.User.Id}).then(result=>{
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
        placePersonnel_updatePersonnelBuyableAccess([item]).then(result=>{
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
                    title={"دسترسی بلیط ها"}
                />

                <PortletBody>

                    {userAccess && userAccess.map(item => (
                        <div key={"buyableAccess-" + item.Buyable.Name}>
                            <InputLabel htmlFor={item.Buyable.Name}>{item.Buyable.Name}</InputLabel>
                            <Switch id={item.Buyable.Name} checked={item.Access} onChange={(e)=>changeAccess(item,e)}/>
                        </div>
                    ))}

                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelBuyableAccess;
