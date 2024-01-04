import React, {useEffect, useState} from 'react';
import {Button, Collapse, FormGroup, Grid, IconButton, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {genders} from "../../../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import adapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers";
import {CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";

const __wizardTicketSubscribesDetails = ({ticketSubscribe,updateTicketSubscribe}) => {


    const [detailsComplete, setDetailsComplete] = useState(false)
    const [openCollapsableDetails, setOpenCollapsableDetails] = useState(false)
    const [inTicketSubscribe, SetInTicketSubscribe] = useState(ticketSubscribe)

    useEffect(() => {
        setDetailsComplete(
            ticketSubscribe.PlacePrice&&
            ticketSubscribe.ValuePrice&&
            ticketSubscribe.EntryTotalCount&&
            ticketSubscribe.SubscribeCapacity&&
            ticketSubscribe.ExpireDuration&&
            ticketSubscribe.Gender
        )
    }, [ticketSubscribe]);



    function setFormValues(lable, value) {
        if(lable=="PlacePrice"){
            SetInTicketSubscribe({...inTicketSubscribe, [lable]: value,"Price":value,})
        }else{
            SetInTicketSubscribe({...inTicketSubscribe, [lable]: value})
        }
    }

    function submitForm(e) {
         updateTicketSubscribe(e,inTicketSubscribe)
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
                            value={toPriceWithComma(inTicketSubscribe.PlacePrice)}
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
                            value={toPriceWithComma(inTicketSubscribe.ValuePrice)}
                            onChange={(e) => setFormValues("ValuePrice", toPriceWithoutComma(e.target.value))}
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
                            label="تعداد ورود مجاز کاربر"
                            placeholder="تعداد"
                            value={inTicketSubscribe.EntryTotalCount}
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
                            label="تعداد عضویت قابل فروش"
                            placeholder="تعداد"
                            value={inTicketSubscribe.SubscribeCapacity}
                            type={"number"}
                            onChange={(e) => setFormValues("SubscribeCapacity", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <TextField
                            label="تعداد روز مدت عضویت از روز تاریخ خرید"
                            placeholder="تعداد"
                            value={inTicketSubscribe.ExpireDuration}
                            type={"number"}
                            onChange={(e) => setFormValues("ExpireDuration", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Form.Group controlId="formAddGender">
                            <Form.Label>جنسیت</Form.Label>
                            <Select
                                className={"dropdown"}
                                name="formGender"
                                options={Object.keys(genders).map(g => {
                                    return {label: genders[g], value: g}
                                })}
                                value={{label: genders[inTicketSubscribe["Gender"]], value: inTicketSubscribe["Gender"]}}
                                onChange={(e) => setFormValues("Gender", e.value)}
                            />
                        </Form.Group>
                    </div>
                </div>


                <TextField
                    id="standard-full-width"
                    label="توضیحات عضویت"
                    value={inTicketSubscribe.Description}
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

export default __wizardTicketSubscribesDetails;
