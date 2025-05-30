import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Button, Switch, TextField} from "@mui/material";
import PlaceMap from "../Base/PlaceMap";
import Select from "react-select";
import {placeGym_changeStatus} from "../../../../../network/api/place.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const _ChangePlaceStatus = ({place, updatePlace}) => {
    const error = useContext(ErrorContext);

    const [inPlace, SetInPlace] = useState(place)


    function getStatusOptions() {
        return [
            {value: "ACTIVE", label: "فعال"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"}
        ]
    }
    function setStatusOptions(status) {
        placeGym_changeStatus({
            Id:inPlace.Id,
            Status:status
        }).then(result=>{
            SetInPlace(result.data.Data);
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
                    title={"وضعیت " + place.Name}
                />

                <PortletBody>
                    <Form.Group >
                        <Form.Label>وضعیت</Form.Label>
                        <Select
                            className={"dropdown"}
                            name="formStatus"
                            value={
                                getStatusOptions().filter(option =>
                                    option.value === inPlace.Status)
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

export default _ChangePlaceStatus;
