import React, {useState} from "react";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import adapterJalali from "@date-io/date-fns-jalali"
import {genders} from "../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../helper";

function PlanBase({plan,updatePlan}){

    const [inPlan,SetInPlan] = useState(plan)
    const [sellInTime,SetSellInTime] = useState((!!plan.Start_selling_date)||(!!plan.End_selling_date))

    function setFormValues(lable,value){
        SetInPlan({...inPlan,[lable]:value})
    }

    function submitForm(){
        updatePlan(inPlan)
    }

    function getExpireTypes() {
        return [{label:"تاریخ مشخص",value:"Date"},{label:"تعداد روز",value:"Duration"}]
    }

    return (
            <>
                <Portlet>
                    <PortletHeader
                        title={"مشخصات " + plan.Name}
                    />

                    <PortletBody>

                        <TextField
                            id="standard-full-width"
                            label="نام پلن"
                            placeholder="نام پلن"
                            value={inPlan.Name}
                            onChange={(e)=>setFormValues("Name",e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Form.Group  controlId="formAddGender">
                            <Form.Label>جنسیت</Form.Label>
                            <Select
                                className={"dropdown"}
                                name="formGender"
                                options={Object.keys(genders).map(g=>{return{label:genders[g],value:g}})}
                                value={{label:genders[inPlan["Gender"]],value:inPlan["Gender"]}}
                                onChange={(e)=>setFormValues("Gender",e.value)}
                            />
                        </Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="پرداختی کاربر به تومان"
                            placeholder="پرداختی کاربر به تومان"
                            value={toPriceWithComma(inPlan.Price)}
                            type={"text"}
                            onChange={(e)=>setFormValues("Price",toPriceWithoutComma(e.target.value))}
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
                            value={toPriceWithComma(inPlan.PlacePrice)}
                            onChange={(e)=>setFormValues("PlacePrice",toPriceWithoutComma(e.target.value))}
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
                            value={toPriceWithComma(inPlan.ValuePrice)}
                            onChange={(e)=>setFormValues("ValuePrice",toPriceWithoutComma(e.target.value))}
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
                            value={inPlan.Discount}
                            onChange={(e)=>setFormValues("Discount",e.target.value)}
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
                            value={inPlan.EntryTotalCount}
                            type={"number"}
                            onChange={(e)=>setFormValues("EntryTotalCount",e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="standard-full-width"
                            label="تعداد بلیط قابل فروش"
                            placeholder="تعداد"
                            value={inPlan.Ticket_Capacity}
                            type={"number"}
                            onChange={(e)=>setFormValues("Ticket_Capacity",e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Form.Group  controlId="formAddSport">
                            <Form.Label>نوع انقضا</Form.Label>
                            <Select
                                className={"dropdown"}
                                inputId="react-select-single"
                                name="formState"
                                options={getExpireTypes()}
                                value={getExpireTypes().find(o=>o.value===inPlan["Expire_type"])}
                                onChange={(e)=>setFormValues("Expire_type",e.value)}
                            />
                        </Form.Group>

                        {(inPlan["Expire_type"]==="Date")?(
                                <LocalizationProvider
                                    dateAdapter={adapterJalali}>
                                    <DatePicker
                                        className={"ltr "}
                                        fullWidth
                                        label="تاریخ اتمام اعتبار"
                                        value={inPlan.Expire_date}
                                        onChange={(e)=>setFormValues("Expire_date",e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            ):(<TextField
                                    label="تعداد روز مدت پلن از روز تاریخ خرید"
                                    placeholder="تعداد"
                                    value={inPlan.Expire_duration}
                                    type={"number"}
                                    onChange={(e)=>setFormValues("Expire_duration",e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )
                        }

                        <TextField
                            id="standard-full-width"
                            label="توضیحات پلن"
                            value={inPlan.Description}
                            type={"Text"}
                            multiline
                            minRows={3}
                            onChange={(e)=>setFormValues("Description",e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={sellInTime}
                                    onChange={(e)=>SetSellInTime(e.target.checked)}
                                    value="gilad" />}
                                label="فروش فقط برای زمان مشخص"
                            />
                        </FormGroup>
                        {sellInTime&&(
                            <>
                                <LocalizationProvider
                                    dateAdapter={adapterJalali}>
                                    <DatePicker
                                        className={"ltr mt-4"}
                                        fullWidth
                                        label="فروش این پلن از تاریخ"
                                        value={inPlan.Start_selling_date}
                                        onChange={(e)=>setFormValues("Start_selling_date",e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={adapterJalali}>
                                    <DatePicker
                                        className={"ltr mt-4"}
                                        fullWidth
                                        label="فروش این پلن از تاریخ"
                                        value={inPlan.End_selling_date}
                                        onChange={(e)=>setFormValues("End_selling_date",e)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </>
                        )}


                        <FormGroup sx={{mt:3}}>
                            <Button
                                fullWidth
                                onClick={()=>submitForm()}
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

export default PlanBase;
