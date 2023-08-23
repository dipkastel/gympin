import React, {useEffect, useState} from 'react';
import {Button, Collapse, FormGroup, Grid, IconButton, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {genders} from "../../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import adapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers";
import {CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";

const __wizardPlanDetails = ({plan,updatePlan}) => {


    const [detailsComplete, setDetailsComplete] = useState(false)
    const [openCollapsableDetails, setOpenCollapsableDetails] = useState(false)
    const [inPlan, SetInPlan] = useState(plan)

    useEffect(() => {
        setDetailsComplete(
            plan.PlacePrice&&
            plan.ValuePrice&&
            plan.EntryTotalCount&&
            plan.Ticket_Capacity&&
            (plan.Expire_date||plan.Expire_duration)&&
            plan.Gender
        )
    }, [plan]);



    function setFormValues(lable, value) {
        SetInPlan({...inPlan, [lable]: value})
    }

    function submitForm(e) {
         updatePlan(e,inPlan)
    }

    function getExpireTypes() {
        return [{label: "تاریخ مشخص", value: "Date"}, {label: "تعداد روز", value: "Duration"}]
    }


    return (
        <>
            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}
                  onClick={() => setOpenCollapsableDetails(!openCollapsableDetails)}>
                <Grid item>
                    <Typography variant={"subtitle1"}>اطلاعات پایه</Typography>
                </Grid>
                <Grid item>

                    <IconButton
                        onClick={() => setOpenCollapsableDetails(!openCollapsableDetails)}>
                        {!detailsComplete ? <QuestionMark color={"warning"}/> : <CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableDetails(!openCollapsableDetails)}>
                        {!openCollapsableDetails ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>

                </Grid>

            </Grid>
            <Collapse in={openCollapsableDetails} timeout="auto" unmountOnExit>

                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <TextField
                            id="standard-full-width"
                            label="قیمت مرکز به تومان"
                            placeholder="قیمت مرکز به تومان"
                            value={toPriceWithComma(inPlan.PlacePrice)}
                            onChange={(e) => setFormValues("PlacePrice", toPriceWithoutComma(e.target.value))}
                            type={"text"}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <TextField
                            id="standard-full-width"
                            label="ارزش به تومان"
                            placeholder="ارزش به تومان"
                            value={toPriceWithComma(inPlan.ValuePrice)}
                            onChange={(e) => setFormValues("ValuePrice", toPriceWithoutComma(e.target.value))}
                            type={"text"}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <TextField
                            id="standard-full-width"
                            label="تعداد ورود مجاز کاربر"
                            placeholder="تعداد"
                            value={inPlan.EntryTotalCount}
                            type={"number"}
                            onChange={(e) => setFormValues("EntryTotalCount", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <TextField
                            id="standard-full-width"
                            label="تعداد بلیط قابل فروش"
                            placeholder="تعداد"
                            value={inPlan.Ticket_Capacity}
                            type={"number"}
                            onChange={(e) => setFormValues("Ticket_Capacity", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <Form.Group controlId="formAddSport">
                            <Form.Label>نوع انقضا</Form.Label>
                            <Select
                                className={"dropdown"}
                                inputId="react-select-single"
                                name="formState"
                                options={getExpireTypes()}
                                value={getExpireTypes().find(o => o.value === inPlan["Expire_type"])}
                                onChange={(e) => setFormValues("Expire_type", e.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className={"col-md-6"}>
                        {(inPlan["Expire_type"] === "Date") ? (
                            <LocalizationProvider
                                dateAdapter={adapterJalali}>
                                <DatePicker
                                    className={"ltr fix-date"}
                                    fullWidth
                                    label="تاریخ اتمام اعتبار"
                                    value={inPlan.Expire_date}
                                    onChange={(e) => setFormValues("Expire_date", e)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        ) : (<TextField
                                label="تعداد روز مدت پلن از روز تاریخ خرید"
                                placeholder="تعداد"
                                value={inPlan.Expire_duration}
                                type={"number"}
                                onChange={(e) => setFormValues("Expire_duration", e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )
                        }
                    </div>
                </div>


                <Form.Group controlId="formAddGender">
                    <Form.Label>جنسیت</Form.Label>
                    <Select
                        className={"dropdown"}
                        name="formGender"
                        options={Object.keys(genders).map(g => {
                            return {label: genders[g], value: g}
                        })}
                        value={{label: genders[inPlan["Gender"]], value: inPlan["Gender"]}}
                        onChange={(e) => setFormValues("Gender", e.value)}
                    />
                </Form.Group>


                <TextField
                    id="standard-full-width"
                    label="توضیحات پلن"
                    value={inPlan.Description}
                    type={"Text"}
                    multiline
                    minRows={3}
                    onChange={(e) => setFormValues("Description", e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <FormGroup sx={{mt: 3}}>
                    <Button
                        fullWidth
                        onClick={(e) => submitForm(e)}
                        variant="contained"
                        color="primary"
                        className={"button"}>
                        ثبت
                    </Button>
                </FormGroup>
            </Collapse>


        </>
    );
};

export default __wizardPlanDetails;
