import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {placePersonnel_update} from "../../../../../network/api/placePersonnel.api";

const _placePersonelStatus = ({personel,getPerson}) => {
    const error = useContext(ErrorContext);
    function updateUserRole(e){
        placePersonnel_update({...personel,UserRole:e.value}).then(result=>{
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

    function getRoleOptions(){
        return [
            {label:"مدیر مرکز",value:"PLACE_OWNER"},
            {label:"پرسنل مرکز",value:"PLACE_PERSONNEL"},
            {label:"مربی",value:"PLACE_COACH"},
        ]
    }


    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"وضعیت"}
                />

                <PortletBody>

                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={getRoleOptions()}
                            value={getRoleOptions().filter(p=>p.value===personel.UserRole)}
                            onChange={e => updateUserRole(e)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelStatus;
