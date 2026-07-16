import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {placeCounseling_changeStatus} from "../../../../../network/api/Counseling.api";

const _ChangeCounselingStatus = ({counseling, updatePlace}) => {

    const error = useContext(ErrorContext);
    const [inCounseling, SetInCounseling] = useState(counseling)

    function getStatusOptions() {
        return [
            {value: "ACTIVE", label: "فعال"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"}
        ]
    }

    function setStatusOptions(status) {
        placeCounseling_changeStatus({
            Id:inCounseling.Id,
            Status:status
        }).then(result=>{
            SetInCounseling(result.data.Data);
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
                    title={"وضعیت مشاوره " + counseling.Name}
                />

                <PortletBody>
                    <Form.Group >
                        <Form.Label>وضعیت</Form.Label>
                        <Select
                            className={"dropdown"}
                            name="formStatus"
                            value={
                                getStatusOptions().filter(option =>
                                    option.value === inCounseling.Status)
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

export default _ChangeCounselingStatus;
