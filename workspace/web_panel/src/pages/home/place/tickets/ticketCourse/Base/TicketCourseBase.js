import React, {useState} from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {genders} from "../../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import adapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers";
import {classStatus} from "../../../../../../helper/enums/ClassStatus";

function TicketCourseBase({ticketCourse, updateTicketCourse}) {

    const [inTicketCourse, SetInTicketCourse] = useState(ticketCourse)
    function setFormValues(lable, value) {
        SetInTicketCourse({...inTicketCourse, [lable]: value})
    }

    function submitForm() {
        updateTicketCourse(inTicketCourse)
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"مشخصات " + ticketCourse.Name}
                />

                <PortletBody>
                    <div className={"row"}>
                        <TextField
                            id="standard-full-width"
                            label="نام کلاس"
                            placeholder="نام کلاس"
                            value={inTicketCourse.Name}
                            onChange={(e) => setFormValues("Name", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Form.Group className={"w-100"} controlId="formAddGender">
                            <Form.Label>جنسیت</Form.Label>
                            <Select
                                className={"dropdown"}
                                name="formGender"
                                options={Object.keys(genders).map(g => {
                                    return {label: genders[g], value: g}
                                })}
                                value={{label: genders[inTicketCourse["Gender"]], value: inTicketCourse["Gender"]}}
                                onChange={(e) => setFormValues("Gender", e.value)}
                            />
                        </Form.Group>

                        <Form.Group className={"w-100"} controlId="formAddGender">
                            <Form.Label>نوع کلاس</Form.Label>
                            <Select
                                className={"dropdown"}
                                name="formGender"
                                options={Object.keys(classStatus).map(g => {
                                    return {label: classStatus[g], value: g}
                                })}
                                value={{label: classStatus[inTicketCourse["Status"]], value: inTicketCourse["Status"]}}
                                onChange={(e) => setFormValues("Status", e.value)}
                            />
                        </Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="پرداختی کاربر به تومان"
                            placeholder="پرداختی کاربر به تومان"
                            value={toPriceWithComma(inTicketCourse.Price)}
                            type={"text"}
                            onChange={(e) => setFormValues("Price", toPriceWithoutComma(e.target.value))}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        <TextField
                            id="standard-full-width"
                            label="قیمت مرکز به تومان"
                            placeholder="قیمت مرکز به تومان"
                            value={toPriceWithComma(inTicketCourse.PlacePrice)}
                            onChange={(e) => setFormValues("PlacePrice", toPriceWithoutComma(e.target.value))}
                            type={"text"}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="standard-full-width"
                            label="ارزش به تومان"
                            placeholder="ارزش به تومان"
                            value={toPriceWithComma(inTicketCourse.ValuePrice)}
                            onChange={(e) => setFormValues("ValuePrice", toPriceWithoutComma(e.target.value))}
                            type={"text"}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="standard-full-width"
                            label="درصد تخفیف"
                            placeholder="درصد تخفیف"
                            value={inTicketCourse.Discount}
                            onChange={(e) => setFormValues("Discount", e.target.value)}
                            type={"text"}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            id="standard-full-width"
                            label="محدوده سنی"
                            placeholder="10 تا 18 سال"
                            value={inTicketCourse.AgeLimit}
                            onChange={(e) => setFormValues("AgeLimit", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="standard-full-width"
                            label="سطح کلاس"
                            placeholder="مبتدی"
                            value={inTicketCourse.CourseLevel}
                            onChange={(e) => setFormValues("CourseLevel", e.target.value)}
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
                            value={inTicketCourse.EntryTotalCount}
                            type={"number"}
                            onChange={(e) => setFormValues("EntryTotalCount", e.target.value)}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="standard-full-width"
                            label="ظرفیت کلاس"
                            placeholder="تعداد نفرات (حدود)"
                            value={inTicketCourse.ClassCapacity}
                            type={"number"}
                            onChange={(e) => setFormValues("ClassCapacity", e.target.value)}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="standard-full-width"
                            label="تعداد بلیط قابل فروش"
                            placeholder="تعداد"
                            value={inTicketCourse.CourseCapacity}
                            type={"number"}
                            onChange={(e) => setFormValues("CourseCapacity", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <LocalizationProvider
                            dateAdapter={adapterJalali}>
                            <DatePicker
                                className={"ltr mt-4 mb-2 col-6"}
                                label="تاریخ شروع"
                                value={inTicketCourse.StartDate}
                                onChange={(e) => setFormValues("StartDate", e)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                            <DatePicker
                                className={"ltr mt-4 mb-2 col-6"}
                                label="تاریخ پایان"
                                value={inTicketCourse.EndDate}
                                onChange={(e) => setFormValues("EndDate", e)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField
                            id="standard-full-width"
                            label="دستاورد شاگردان در پایان کلاس"
                            value={inTicketCourse.TargetOfCourse || ""}
                            type={"Text"}
                            multiline
                            minRows={3}
                            onChange={(e) => setFormValues("TargetOfCourse", e.target.value)}
                            className={"col-6"}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="standard-full-width"
                            label="توضیحات بلیط"
                            value={inTicketCourse.Description || ""}
                            type={"Text"}
                            multiline
                            minRows={3}
                            onChange={(e) => setFormValues("Description", e.target.value)}
                            className={"col-6"}
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
                    </div>
                </PortletBody>
            </Portlet>

        </>
    );
}

export default TicketCourseBase;
