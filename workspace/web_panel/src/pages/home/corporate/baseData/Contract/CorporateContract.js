import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {corporate_updateContractType, corporate_updateStepPayment,} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Button, FormControlLabel, FormLabel, Grid, Switch, TextField} from "@mui/material";

const CorporateContract = ({currentCorporate, UpdatePage}) => {
    const error = useContext(ErrorContext);


    function changeStepPayment(data) {
        corporate_updateStepPayment({Id: currentCorporate.Id, StepPeyment: data}).then(response => {
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
            {value: "LONG_TIME", label: "تا پایان قرارداد"},
            {value: "EXPIRING", label: "دارای تاریخ انقضا"}
        ]
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="پلن (طرح قرارداد)"/>
                <PortletBody>
                    <Form.Group>
                        <FormLabel component="legend">اعتبار پرسنل : </FormLabel>
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
                    {(currentCorporate.ContractType=="EXPIRING")&&
                        <Form.Group className={"m-0"}>
                            <FormLabel sx={{m:0}} component="legend">مدت پیشنهادی برای انقضای اعتبار :</FormLabel>
                            <Grid container sx={{flexGrow: 1, mb: 2}}
                                  justifyContent="center"
                                  alignItems="center">

                                <TextField
                                    label="تعداد روز"
                                    className="textField col-md-10"
                                    type={"number"}
                                    value={currentCorporate.DefaultExpireDuration || 0}
                                    margin="normal"
                                    size={"small"}
                                    variant="outlined"
                                />
                                <Button className={"col-md-2"} size={"large"} variant={"contained"}
                                        color={"primary"}>ثبت</Button>
                            </Grid>
                        </Form.Group>
                    }

                    <Form.Group>
                        <FormLabel component="legend">پرداخت پلکانی :</FormLabel>
                        <FormControlLabel
                            control={<Switch
                                defaultChecked={currentCorporate.StepPeyment}
                                onChange={(e) => changeStepPayment(e.target.checked)}/>}
                            label="فعال"
                        />
                    </Form.Group>

                </PortletBody>
            </Portlet>
        </>
    );
};

export default CorporateContract;
