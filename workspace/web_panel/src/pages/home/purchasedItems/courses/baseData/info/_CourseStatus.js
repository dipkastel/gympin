import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {PurchasedCourseStatus} from "../../../../../../helper/enums/PurchasedCourseStatus";
import {purchasedCourse_updateStatus} from "../../../../../../network/api/purchasedCourses.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const _CourseStatus = ({course, updatePage}) => {
    const error = useContext(ErrorContext);

    function updateStatus(value) {
        purchasedCourse_updateStatus({
            Id: course.Id,
            Status:value
        }).then(result => {
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <Portlet>
            <PortletHeader title="وضعیت"/>

            <PortletBody>
                <div className={"row"}>

                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">وضعیت</InputLabel>
                        <Select

                            sx={{my: 1}}
                            label="status"
                            value={course.Status || "null"}
                            onChange={e => updateStatus(e.target.value)}>
                            {Object.keys(PurchasedCourseStatus).map((item, number) => (
                                <MenuItem key={number} value={item}>{PurchasedCourseStatus[item]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </PortletBody>
        </Portlet>
    );
};

export default _CourseStatus;
