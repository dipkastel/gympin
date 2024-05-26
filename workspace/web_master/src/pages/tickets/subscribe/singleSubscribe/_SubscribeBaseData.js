import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {genders} from "../../../../helper/enums/genders";
import {TicketSubscribes_update} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {getWizardComplete} from "../../../../helper/pocket";

const _SubscribeBaseData = ({ ticketSubscribe, getSubscribeData}) => {
    const error = useContext(ErrorContext);
    const [inSubscribe, setInSubscribe] = useState(ticketSubscribe)
    const introMode=!getWizardComplete()

    useEffect(() => {
        setInSubscribe(ticketSubscribe);
    }, [ticketSubscribe]);

    function updateSubscribe(e) {
        e.preventDefault();
        TicketSubscribes_update(inSubscribe).then(result => {
            getSubscribeData();
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
            <Form onSubmit={(e) => updateSubscribe(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent sx={{margin: 0}}>

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>پس از تکمیل فرم دکمه ثبت را بزنید سپس قسمت های دیگر را تکمیل کنید
                        </Typography>}
                        <TextField
                            name={"Name"}
                            value={inSubscribe.Name || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, Name: e.target.value})}
                            margin="dense"
                            label="نام عضویت"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <FormControl variant="standard"
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">جنسیت</InputLabel>
                            <Select
                                value={inSubscribe["Gender"] || ""}
                                onChange={(e) => setInSubscribe({...inSubscribe, Gender: e.target.value})}
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
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            قیمت ها به تومان می باشد
                        </Typography>}
                        <TextField
                            name={"Price"}
                            value={toPriceWithComma(inSubscribe.PlacePrice)}
                            onChange={(e) => setInSubscribe({...inSubscribe, PlacePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="قیمت عضویت"
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
                            value={toPriceWithComma(inSubscribe.ValuePrice)}
                            onChange={(e) => setInSubscribe({...inSubscribe, ValuePrice: toPriceWithoutComma(e.target.value)})}
                            margin="dense"
                            label="ارزش عضویت"
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
                            value={inSubscribe.EntryTotalCount || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, EntryTotalCount: e.target.value})}
                            margin="dense"
                            label="تعداد ورود"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تعداد بلیط قابل فروش با هر فروش بلیط یک عدد کم می شود
                        </Typography>}
                        <TextField
                            name={"SubscribeCapacity"}
                            value={inSubscribe.SubscribeCapacity || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, SubscribeCapacity: e.target.value})}
                            margin="dense"
                            label="تعداد بلیط قابل فروش"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            تعداد روز برای یک ماه 30 و برای 3 ماه 90 در نظر گرفته می شود
                        </Typography>}
                        <TextField
                            name={"ExpireDuration"}
                            value={inSubscribe.ExpireDuration || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, ExpireDuration: e.target.value})}
                            margin="dense"
                            label="تعداد روز از تاریخ خرید تا انقضا"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />

                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            در صورتی که برای بلیط توضیحاتی وجود دارد در این قسمت یادداشت شود در غیر این صورت این فیلد را خالی بگذارید
                        </Typography>}
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            مثال :
                        </Typography>}
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>در هنگام اولین خرید یک شیکر و یک حوله ورزشی هدیه خواهید گرفت.
                        </Typography>}
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                            یا
                        </Typography>}
                        {introMode&&
                        <Typography color={"#a2a2a2"} variant={"subtitle2"}>قبل از خرید هماهنگی ساعت استفاده با مجموعه انجام شود.
                        </Typography>}
                        <TextField
                            name={"Description"}
                            value={inSubscribe.Description || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, Description: e.target.value})}
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

export default _SubscribeBaseData;
