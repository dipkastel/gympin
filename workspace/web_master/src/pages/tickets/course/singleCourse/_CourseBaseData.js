import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {genders} from "../../../../helper/enums/genders";
import {TicketCourses_update} from "../../../../network/api/ticketCourse.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {CourseStatusEnum} from "../../../../helper/enums/CourseStatusEnum";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AdapterJalaali from "@date-io/jalaali";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns";

const _CourseBaseData = ({ ticketCourse, getCourseData}) => {
    const error = useContext(ErrorContext);
    const [inCourse, setInCourse] = useState(ticketCourse)

    useEffect(() => {
        setInCourse(ticketCourse);
        console.log(ticketCourse)
    }, [ticketCourse]);

    function updateCourse(e) {
        e.preventDefault();
        TicketCourses_update(inCourse).then(result => {
            getCourseData();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Form onSubmit={(e) => updateCourse(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent sx={{margin: 0}}>

                        <TextField
                            name={"Name"}
                            value={inCourse.Name || ""}
                            onChange={(e) => setInCourse({...inCourse, Name: e.target.value})}
                            margin="dense"
                            label="نام عضویت"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <FormControl variant="standard" sx={{my:1}}
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">جنسیت</InputLabel>
                            <Select
                                value={inCourse["Gender"] || ""}
                                onChange={(e) => setInCourse({...inCourse, Gender: e.target.value})}
                                label="جنسیت"
                                variant={"outlined"}
                                fullWidth
                            >
                                <MenuItem>انتخاب کنید</MenuItem>
                                {Object.keys(genders).map(g => (
                                    <MenuItem key={g} value={g}>{genders[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{my:1}}
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">نوع کلاس</InputLabel>
                            <Select
                                value={inCourse.Status || ""}
                                onChange={(e) => setInCourse({...inCourse, Status: e.target.value})}
                                label="نوع کلاس"
                                variant={"outlined"}
                                fullWidth
                            >
                                <MenuItem>انتخاب کنید</MenuItem>
                                {Object.keys(CourseStatusEnum).map(g => (
                                    <MenuItem key={g} value={g}>{CourseStatusEnum[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name={"Price"}
                            value={toPriceWithComma(inCourse.PlacePrice)}
                            onChange={(e) => setInCourse({...inCourse, PlacePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="قیمت عضویت"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"ValuePrice"}
                            value={toPriceWithComma(inCourse.ValuePrice)}
                            onChange={(e) => setInCourse({...inCourse, ValuePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="ارزش عضویت"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            name={"AgeLimit"}
                            value={inCourse.AgeLimit || ""}
                            onChange={(e) => setInCourse({...inCourse, AgeLimit: e.target.value})}
                            margin="dense"
                            label="محدوده سنی"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"CourseLevel"}
                            value={inCourse.CourseLevel || ""}
                            onChange={(e) => setInCourse({...inCourse, CourseLevel: e.target.value})}
                            margin="dense"
                            label="سطح کلاس"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"EntryTotalCount"}
                            value={inCourse.EntryTotalCount || ""}
                            onChange={(e) => setInCourse({...inCourse, EntryTotalCount: e.target.value})}
                            margin="dense"
                            label="تعداد ورود"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"ClassCapacity"}
                            value={inCourse.ClassCapacity || ""}
                            onChange={(e) => setInCourse({...inCourse, ClassCapacity: e.target.value})}
                            margin="dense"
                            label="تعداد نفراد کلاس"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            name={"CourseCapacity"}
                            value={inCourse.CourseCapacity || ""}
                            onChange={(e) => setInCourse({...inCourse, CourseCapacity: e.target.value})}
                            margin="dense"
                            label="تعداد بلیط قابل فروش"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />



                        <LocalizationProvider
                            dateAdapter={AdapterJalaali} adapterLocale={"fa-IR"}>
                            <DatePicker
                                variant="outlined"
                                onChange={(e) => setInCourse({...inCourse, StartDate: format(Date.parse(e), "yyyy-MM-dd")})}
                                toolbarFormat={"jYYYY/jMM/jDD"}
                                inputFormat={"jYYYY/jMM/jDD"}
                                value={Date.parse(inCourse.StartDate) || ""}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        className="w-100"
                                        variant="outlined"
                                        margin="normal"
                                        label={"تاریخ شروع کلاس"}
                                    />
                                }
                            />
                            <DatePicker
                                variant="outlined"
                                onChange={(e) => setInCourse({...inCourse, EndDate: format(Date.parse(e), "yyyy-MM-dd")})}
                                toolbarFormat={"jYYYY/jMM/jDD"}
                                inputFormat={"jYYYY/jMM/jDD"}
                                value={Date.parse(inCourse.EndDate) || ""}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        className="w-100"
                                        variant="outlined"
                                        margin="normal"
                                        label={"تاریخ پایان کلاس"}
                                    />
                                }
                            />
                        </LocalizationProvider>

                        <TextField
                            name={"TargetOfCourse"}
                            value={inCourse.TargetOfCourse || ""}
                            onChange={(e) => setInCourse({...inCourse, TargetOfCourse: e.target.value})}
                            margin="dense"
                            label="دستاورد شاگردان در پایان کلاس"
                            type="text"
                            aria-multiline={"true"}
                            minRows={3}
                            fullWidth
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            name={"Description"}
                            value={inCourse.Description || ""}
                            onChange={(e) => setInCourse({...inCourse, Description: e.target.value})}
                            margin="dense"
                            label="توضیح مخصوص این عضویت"
                            type="text"
                            aria-multiline={"true"}
                            minRows={3}
                            fullWidth
                            multiline
                            variant="outlined"
                        />

                        <FormControl fullWidth>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Form>
        </>
    );
};

export default _CourseBaseData;
