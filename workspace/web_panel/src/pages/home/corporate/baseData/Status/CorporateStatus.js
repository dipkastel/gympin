import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {corporate_updateStatus} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const CorporateStatus = ({currentCorporate, updatePage}) => {
    const error = useContext(ErrorContext);


    function changeUserStatus(data) {
        corporate_updateStatus({Id: currentCorporate.Id, Status: data}).then(response => {
            error.showError({message: "عملیات موفق",});
            updatePage();
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
                <PortletHeader title="وضعیت شرکت"/>
                <PortletBody>
                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={getStatusOptions()}
                            value={{label: getStatusOptions().filter(d=>d.value==currentCorporate.Status)[0].label, value: currentCorporate.Status}}
                            onChange={e => changeUserStatus(e.value)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateStatus;
