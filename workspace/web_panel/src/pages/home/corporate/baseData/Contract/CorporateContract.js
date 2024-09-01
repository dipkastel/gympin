import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {
    corporate_updateContractType,
    corporate_updateDefaultExpireDuratione,
} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Button, FormLabel, Grid, TextField} from "@mui/material";

const CorporateContract = ({currentCorporate, UpdatePage}) => {
    const error = useContext(ErrorContext);
    const [DefaultExpireDuration,setDefaultExpireDuration]=useState(currentCorporate.DefaultExpireDuration)


    function changeCorporateContractType(data) {
        corporate_updateContractType({Id: currentCorporate.Id, ContractType: data}).then(response => {
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

    function getContractOptions() {
        return [
            {value: "ALPHA", label: "آلفا"},
            {value: "PRO", label: "پرو"},
            {value: "NEO", label: "نئو"}
        ]
    }

    function UpdateDefaltExpireDuration(e) {
        e.preventDefault()
        corporate_updateDefaultExpireDuratione({Id:currentCorporate.Id,DefaultExpireDuration:DefaultExpireDuration}).then(result => {
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
                <PortletHeader title="پلن (طرح قرارداد)"/>
                <PortletBody>
                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={getContractOptions()}
                            value={{
                                label: getContractOptions().filter(d => d.value == currentCorporate.ContractType)[0].label,
                                value: currentCorporate.Status
                            }}
                            onChange={e => changeCorporateContractType(e.value)}
                        />
                    </Form.Group>
                    {(currentCorporate.ContractType=="PRO"||currentCorporate.ContractType=="NEO")&&
                        <Form.Group className={"m-0"}>
                            <FormLabel sx={{m:0}} component="legend">مدت پیشنهادی برای انقضای اعتبار :</FormLabel>
                            <Grid container sx={{flexGrow: 1, mb: 2}}
                                  justifyContent="center"
                                  alignItems="center">

                                <TextField
                                    label="تعداد روز"
                                    className="textField col-md-10"
                                    type={"number"}
                                    value={DefaultExpireDuration || 0}
                                    margin="normal"
                                    size={"small"}
                                    variant="outlined"
                                    onChange={e => setDefaultExpireDuration(e.target.value)}
                                />
                                <Button className={"col-md-2"} size={"large"} variant={"contained"}
                                        color={"primary"} onClick={(e)=>UpdateDefaltExpireDuration(e)}>ثبت</Button>
                            </Grid>
                        </Form.Group>
                    }


                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateContract;
