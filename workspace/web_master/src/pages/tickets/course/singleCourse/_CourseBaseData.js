import React, {useContext, useEffect, useState} from 'react';
import {
    Accordion, AccordionActions, AccordionDetails, AccordionSummary,
    Button,
    Card,
    CardContent,
    FormControl, FormControlLabel,
    InputLabel,
    MenuItem,
    Select, Switch,
    TextField,
    Typography
} from "@mui/material";
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
import {getWizardComplete} from "../../../../helper/pocket";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const _CourseBaseData = ({ ticketCourse, getCourseData}) => {
    const error = useContext(ErrorContext);
    const [inCourse, setInCourse] = useState(ticketCourse)

    const introMode=!getWizardComplete()

    useEffect(() => {
        setInCourse(ticketCourse);
    }, [ticketCourse]);

    function updateCourse(e) {
        e.preventDefault();
        if(inCourse?.PlacePrice<10000){
            error.showError({message: "قیمت بلیط اشتباه است",});
            return;
        }
        if(inCourse?.ValuePrice<10000){
            error.showError({message: "ارزش بلیط اشتباه است",});
            return;
        }
        if(inCourse?.ExpireDuration<3){
            error.showError({message: "حداقل انقضا از تاریخ خرید باید 3 روز باشد",});
            return;
        }
        if(inCourse?.ExpireDuration>179){
            error.showError({message: "حداکثر انقضا از تاریخ خرید باید 180 روز باشد",});
            return;
        }
        if(inCourse?.DayBeforeStartSell>inCourse?.ExpireDuration){
            error.showError({message: "تعداد روز 'فعال بودن بلیط قبل از شروع کلاس' نمیتواند بزرگتر از 'انقضا پس از تاریخ خرید' باشد",});
            return;
        }
        if(inCourse?.DayAfterStartSell>inCourse?.ExpireDuration){
            error.showError({message: "تعداد روز 'فعال بودن بلیط پس از شروع کلاس' نمیتواند بزرگتر از 'انقضا پس از تاریخ خرید' باشد",});
            return;
        }
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

    function changeExpireDuration(e) {
        if(e.target.value<3)
            error.showError({message: "تعداد روز باید بیش از 3 باشد",});
        if(e.target.value>179)
            error.showError({message: "تعداد روز باید کمتر از 180 باشد",});

        setInCourse({...inCourse, ExpireDuration: e.target.value, DayBeforeStartSell: e.target.value-1, DayAfterStartSell: e.target.value-1})

    }
    return (
        <>
            <Form onSubmit={(e) => updateCourse(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent sx={{margin: 0}}>

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>پس از تکمیل فرم دکمه ثبت را بزنید سپس قسمت های دیگر را تکمیل کنید
                        </Typography>}
                        <TextField
                            name={"Name"}
                            value={inCourse.Name || ""}
                            onChange={(e) => setInCourse({...inCourse, Name: e.target.value})}
                            margin="dense"
                            label="نام کلاس"
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



                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>توضیح در مورد زمان و مکان برگزاری کلاس
                        </Typography>}
                        <TextField
                            name={"Timing"}
                            value={inCourse.Timing || ""}
                            onChange={(e) => setInCourse({...inCourse, Timing: e.target.value})}
                            margin="dense"
                            label="زمان و مکان"
                            type="text"
                            aria-multiline={"true"}
                            minRows={3}
                            fullWidth
                            multiline
                            variant="outlined"
                        />

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
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            قیمت ها به تومان می باشد
                        </Typography>}
                        <TextField
                            name={"Price"}
                            value={toPriceWithComma(inCourse.PlacePrice)}
                            onChange={(e) => setInCourse({...inCourse, PlacePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="قیمت کلاس"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            ارزش عضویت مبلغی است که مرکز برای فروش همین بلیط از طرق دیگر دریافت می کند.
                        </Typography>}
                        <TextField
                            name={"ValuePrice"}
                            value={toPriceWithComma(inCourse.ValuePrice)}
                            onChange={(e) => setInCourse({...inCourse, ValuePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="ارزش کلاس"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تعداد ورود، تعداد دفعاتی است که کاربر میتواند از این بلیط استفاده کند . (برای 8 جلسه بدنسازی در ماه 8 در نظر گرفته شود- برای ورودی ها 1 در نظر گرفته شود)
                        </Typography>}
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
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            اگر کلاس مورد نظر دارای تعداد شاگرد مشخصی نمی باشد این فیلد را خالی بگذارید.
                            برای کلاس های خصوصی این عدد 1 در نظر گرفته شود.
                        </Typography>}
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

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تعداد بلیط قابل فروش با هر فروش بلیط یک عدد کم می شود
                        </Typography>}
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
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تاریخ شروع و مدت اعتبار بلیط (تعداد روز از تاریخ خرید تا انقضا) الزامی است.
                        </Typography>}

                        <LocalizationProvider
                            dateAdapter={AdapterJalaali} adapterLocale={"fa-IR"}>
                            <DatePicker
                                variant="outlined"
                                onChange={(e) => setInCourse({...inCourse, StartDate: format(Date.parse(e), "yyyy-MM-dd")})}
                                toolbarFormat={"jYYYY/jMM/jDD"}
                                inputFormat={"jYYYY/jMM/jDD"}
                                value={Date.parse(inCourse.StartDate) || null}
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
                        </LocalizationProvider>

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تعداد روز برای یک ماه 30 و برای 3 ماه 90 در نظر گرفته می شود
                        </Typography>}
                        <TextField
                            name={"ExpireDuration"}
                            value={inCourse.ExpireDuration || ""}
                            onChange={(e) => changeExpireDuration(e)}
                            margin="dense"
                            label="تعداد روز از تاریخ خرید تا انقضا"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />


                        <FormControlLabel
                            name={"Renew"}
                            checked={inCourse.AutoRenew}
                            onChange={(e) => setInCourse({...inCourse, AutoRenew: e.target.checked})}
                            control={<Switch defaultChecked/>} label="تمدید کلاس پس از پایان دوره"/>
                        {introMode&&<>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                در صورتی که برای بلیط توضیحاتی وجود دارد در این قسمت یادداشت شود در غیر این صورت این فیلد را خالی بگذارید
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                مثال :
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>در هنگام اولین خرید یک شیکر و یک حوله ورزشی هدیه خواهید گرفت.
                            </Typography>

                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                یا
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>قبل از خرید هماهنگی ساعت استفاده با مجموعه انجام شود.
                            </Typography>
                        </>}
                        <TextField
                            name={"Description"}
                            value={inCourse.Description || ""}
                            onChange={(e) => setInCourse({...inCourse, Description: e.target.value})}
                            margin="dense"
                            label="توضیح مخصوص این کلاس"
                            type="text"
                            aria-multiline={"true"}
                            minRows={3}
                            fullWidth
                            multiline
                            variant="outlined"
                        />

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                پیشرفته
                            </AccordionSummary>
                            <AccordionDetails>

                                {introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    در صورت ارائه مدرک یا داشتن دستاورد قابل توجه برای شاگردان فیلد زیر را پر نمایید در غیر این صورت این فیلد را خالی بگذارید.
                                </Typography>}

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

                                {introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    محدوده سنی به صورت نوشته برای اطلاع کاربر وارد میشود. اگر کلاس مورد نظر محدوده سنی ندارد این فیلد را خالی بگذارید.
                                </Typography>}
                                {introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    مثال :
                                </Typography>}
                                {introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    8 تا 16 سال
                                </Typography>}
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

                                {introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    سطح کلاس برای اطلاع کاربر وارد میشود. اگر کلاس مورد نظر دارای سطح بندی نمی باشد این فیلد را خالی بگذارید.
                                </Typography>}
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


                                {inCourse.AutoRenew&&introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    چند روز قبل از شروع کلاس امکان خرید بلیط وجود داشته باشد ؟
                                </Typography>}
                                {inCourse.AutoRenew&&<TextField
                                    name={"DayBeforeStartSell"}
                                    value={inCourse.DayBeforeStartSell || ""}
                                    onChange={(e) => setInCourse({...inCourse, DayBeforeStartSell: e.target.value})}
                                    margin="dense"
                                    label="تعداد روز فعال بودن بلیط قبل از شروع کلاس"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />}
                                {inCourse.AutoRenew&&introMode&&
                                <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                    بلیط تا چند روز پس از شروع کلاس قابل خرید باشد ؟
                                </Typography>}
                                {inCourse.AutoRenew&&<TextField
                                    name={"DayAfterStartSell"}
                                    value={inCourse.DayAfterStartSell || ""}
                                    onChange={(e) => setInCourse({...inCourse, DayAfterStartSell: e.target.value})}
                                    margin="dense"
                                    label="تعداد روز فعال بودن بلیط پس از شروع کلاس"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />}


                            </AccordionDetails>
                        </Accordion>
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
