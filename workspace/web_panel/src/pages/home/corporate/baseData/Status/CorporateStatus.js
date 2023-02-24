import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {user_GetStatuses, user_UpdateUserStatus} from "../../../../../network/api/user.api";
import {corporate_updateStatus} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const CorporateStatus = ({currentCorporate}) => {
    const error = useContext(ErrorContext);
    const [inCorporate,SetInCorporate] = useState(currentCorporate)


    function changeUserStatus(data){
        corporate_updateStatus({...inCorporate,Status:data}).then(response=>{
            error.showError({message: "عملیات موفق",});
            SetInCorporate({...inCorporate,Status:data})
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getStatusOptions() {
        return [
            {value: "ACTIVE", label: "فعال"},
            {value: "LOW_BUDGET", label: "کمبود موجودی"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"},
        ]
    }
    return (
        <>
            <Portlet>
                <PortletHeader title="وضعیت کاربر" />
                <PortletBody>
                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={getStatusOptions()}
                            value={{label: inCorporate.Status, value: inCorporate.Status}}
                            onChange={e => changeUserStatus( e.value)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateStatus;
