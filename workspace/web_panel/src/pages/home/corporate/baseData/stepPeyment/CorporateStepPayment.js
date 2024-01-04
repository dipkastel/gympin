import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {corporate_updateStatus, corporate_updateStepPayment} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {FormControlLabel, FormLabel, Switch} from "@mui/material";

const CorporateStepPayment = ({currentCorporate,UpdatePage}) => {
    const error = useContext(ErrorContext);


    function changeStepPayment(data){
        corporate_updateStepPayment({Id:currentCorporate.Id,StepPeyment:data}).then(response=>{
            error.showError({message: "عملیات موفق",});
            UpdatePage();

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
                <PortletHeader title="پرداخت پلکانی" />
                <PortletBody>
                    <Form.Group>
                        <FormLabel component="legend">پرداخت پلکانی :</FormLabel>
                        <FormControlLabel
                            control={<Switch
                                defaultChecked={currentCorporate.StepPeyment}
                                onChange={(e)=>changeStepPayment(e.target.checked)} />}
                            label="فعال"
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateStepPayment;
