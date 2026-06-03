import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Catering_changeStatus} from "../../../../../network/api/placeCatering.api";

const _ChangeCateringStatus = ({catering, update}) => {
    const error = useContext(ErrorContext);

    const [inCatering, SetInCatering] = useState(catering)


    function getStatusOptions() {
        return [
            {value: "ACTIVE", label: "فعال"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"}
        ]
    }
    function setStatusOptions(status) {
        Catering_changeStatus({
            Id:inCatering.Id,
            Status:status
        }).then(result=>{
            SetInCatering(result.data.Data);
            error.showError({message: "ثبت موفق",});
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

            <Portlet>
                <PortletHeader
                    title={"وضعیت " + catering.Name}
                />

                <PortletBody>
                    <Form.Group >
                        <Form.Label>وضعیت</Form.Label>
                        <Select
                            className={"dropdown"}
                            name="formStatus"
                            value={
                                getStatusOptions().filter(option =>
                                    option.value === inCatering.Status)
                            }
                            options={getStatusOptions()}
                            onChange={(e) => setStatusOptions( e.value)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _ChangeCateringStatus;
