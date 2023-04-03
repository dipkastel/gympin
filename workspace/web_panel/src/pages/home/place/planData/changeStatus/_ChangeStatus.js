import React, {useContext, useState} from 'react';
import {FormControlLabel, FormGroup, FormLabel, Switch} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Plans_PlanStatusChange} from "../../../../../network/api/plans.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const _changeStatus = ({plan, updatePlan}) => {
    const error = useContext(ErrorContext);
    const [inPlan, SetInPlan] = useState(plan)

    function setFormValues(lable, value) {
        Plans_PlanStatusChange({...inPlan, [lable]: value}).then(data => {
            SetInPlan(data.data.Data)
            error.showError({message: "با موفقیت ثبت شد",});
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
                    title={"تغییر وضعیت " + plan.Name}
                />

                <PortletBody>

                    <FormGroup>

                        <FormLabel component="legend">وضعیت :</FormLabel>
                        <FormControlLabel
                            control={<Switch
                                checked={inPlan.Enable}
                                onChange={(e) => setFormValues('Enable', e.target.checked)}
                                value="gilad"/>}
                            label="فعال"
                        />
                    </FormGroup>

                </PortletBody>
            </Portlet>

        </>
    );
};

export default _changeStatus;
