import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {placePersonnel_updatePersonnelGetSms} from "../../../../../../network/api/placePersonnel.api";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

const _placePersonnelGetSms = ({personel, getPerson}) => {
    const error = useContext(ErrorContext);

    function updateUserRole(e) {
        e.preventDefault();
        placePersonnel_updatePersonnelGetSms({
            Id: personel.Id,
            Sms: e.target.checked
        }).then(result => {
            getPerson();
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"دریافت پیامک"}
                />
                    <PortletBody>

                        <FormGroup>
                            <FormControlLabel
                                name="formIsActive"
                                control={<Switch/>}
                                label="فعال"
                                checked={personel?.Sms}
                                onChange={(e)=>updateUserRole(e)}
                            />
                        </FormGroup>
                    </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonnelGetSms;
