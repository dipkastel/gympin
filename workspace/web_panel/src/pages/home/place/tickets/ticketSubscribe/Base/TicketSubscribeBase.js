import React, {useState} from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {genders} from "../../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../helper";
import {classStatus} from "../../../../../../helper/enums/ClassStatus";

function TicketSubscribeBase({ticketSubscribe, updateTicketSubscribe}) {

    const [inTicketSubscribe, SetInTicketSubscribe] = useState(ticketSubscribe)

    function setFormValues(lable, value) {
        SetInTicketSubscribe({...inTicketSubscribe, [lable]: value})
    }

    function submitForm() {
        updateTicketSubscribe(inTicketSubscribe)
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"مشخصات " + ticketSubscribe.Name}
                />

                <PortletBody>

                    <TextField
                        id="standard-full-width"
                        label="نام عضویت"
                        placeholder="نام عضویت"
                        value={inTicketSubscribe.Name}
                        onChange={(e) => setFormValues("Name", e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

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

                    <Form.Group className={"w-100"} controlId="SubscribeStatus">
                        <Form.Label>نوع عضویت</Form.Label>
                        <Select
                            className={"dropdown"}
                            name="SubscribeStatus"
                            options={Object.keys(classStatus).map(g => {
                                return {label: classStatus[g], value: g}
                            })}
                            value={{label: classStatus[inTicketSubscribe["SubscribeStatus"]], value: inTicketSubscribe["SubscribeStatus"]}}
                            onChange={(e) => setFormValues("SubscribeStatus", e.value)}
                        />
                    </Form.Group>
                    <TextField
                        id="standard-full-width"
                        label="زمان"
                        value={inTicketSubscribe.Timing || ""}
                        type={"Text"}
                        multiline
                        minRows={3}
                        onChange={(e) => setFormValues("Timing", e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                    <TextField
                        id="standard-full-width"
                        label="پرداختی کاربر به تومان"
                        placeholder="پرداختی کاربر به تومان"
                        value={toPriceWithComma(inTicketSubscribe.Price)}
                        type={"text"}
                        onChange={(e) => setFormValues("Price", toPriceWithoutComma(e.target.value))}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

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

                    <TextField
                        id="standard-full-width"
                        label="درصد تخفیف"
                        placeholder="درصد تخفیف"
                        value={inTicketSubscribe.Discount}
                        onChange={(e) => setFormValues("Discount", e.target.value)}
                        type={"text"}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

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

                    <TextField
                        id="standard-full-width"
                        label="توضیحات عضویت"
                        value={inTicketSubscribe.Description || ""}
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
                            onClick={() => submitForm()}
                            variant="contained"
                            color="primary"
                            className={"button"}>
                            ثبت
                        </Button>
                    </FormGroup>
                </PortletBody>
            </Portlet>

        </>
    );
}

export default TicketSubscribeBase;
