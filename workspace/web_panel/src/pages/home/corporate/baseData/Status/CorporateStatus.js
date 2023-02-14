import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {user_GetStatuses, user_UpdateUserStatus} from "../../../../../network/api/user.api";
import {corporate_updateStatus} from "../../../../../network/api/corporate.api";

const CorporateStatus = ({currentCorporate}) => {
    const [inCorporate,SetInCorporate] = useState(currentCorporate)


    function changeUserStatus(data){
       console.log(data)

        corporate_updateStatus({...inCorporate,Status:data}).then(response=>{
            SetInCorporate({...inCorporate,Status:data})
        }).catch(e=>console.log(e))
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
