import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel, ListItemText,
    MenuItem,
    Select,
    Slider,
    Switch,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {genders} from "../../../../helper/enums/genders";
import {TicketSubscribes_update} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {SubscribeTypeEnum} from "../../../../helper/enums/SubscribeTypeEnum";
import Grid from "@mui/material/Grid2";
import {InfoOutlined} from "@mui/icons-material";

const _SubscribeBaseData = ({ticketSubscribe,setSubscribe, getSubscribeData}) => {
    const error = useContext(ErrorContext);
    const [inSubscribe, setInSubscribe] = useState(ticketSubscribe)
    const [isOff, setIsOff] = useState(ticketSubscribe.ValuePrice!=ticketSubscribe.PlacePrice)
    const [off, setOff] = useState(0)

    useEffect(() => {
        setInSubscribe(ticketSubscribe);
    }, [ticketSubscribe]);

    function updateSubscribe(e) {
        e.preventDefault();
        if (inSubscribe?.PlacePrice < 10000) {
            console.log(inSubscribe.PlacePrice)
            error.showError({message: "قیمت بلیط باید بیش از 10،000 تومان باشد",});
            return;
        }
        if (inSubscribe?.ValuePrice < 10000) {
            error.showError({message: "ارزش بلیط باید بیش از 10،000 تومان باشد",});
            return;
        }
        if (inSubscribe?.ExpireDuration < 3) {
            error.showError({message: "حداقل انقضا از تاریخ خرید باید 3 روز باشد",});
            return;
        }
        if (!inSubscribe?.SubscribeStatus) {
            error.showError({message: "نوع کلاس را مشخص نمایید",});
            return;
        }
        TicketSubscribes_update(inSubscribe).then(result => {
            getSubscribeData();
            setSubscribe(null);
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function changeOff(value){
        setOff(value);
        setInSubscribe({...inSubscribe, PlacePrice: inSubscribe.ValuePrice*(1-(value/100)),price:inSubscribe.ValuePrice*(1-(value/100))})
    }

    function priceChange(value){
        setInSubscribe({...inSubscribe, ValuePrice: toPriceWithoutComma(value), PlacePrice: toPriceWithoutComma(value), Price: toPriceWithoutComma(value)})
        setIsOff(false);
    }

    function handleOffSwitch(value){
        setIsOff(value)
        if(!value){
            setInSubscribe({...inSubscribe, PlacePrice: inSubscribe.ValuePrice,Price: inSubscribe.ValuePrice})
            setOff(0)
        }else{
            changeOff(10)
        }
    }

    return (
        <>
            <Form onSubmit={(e) => updateSubscribe(e)}>

                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 11, sm: 11, md: 11, xl: 11}}>
                        <TextField
                            name={"Name"}
                            sx={{my:1}}
                            value={inSubscribe.Name || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, Name: e.target.value})}
                            margin="dense"
                            label="نام عضویت"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip

                            title={<Typography  variant={"subtitle2"}>
                                نام بلیط باید کوتاه باشد و مشخص کننده خدماتی که به کاربر داده میشود مانند ◄ '16 جلسه بدنسازی آقایان' یا ◄ 'ورودی استخر جمعه ها بانوان'
                            </Typography>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"} spacing={2}>
                    <Grid size={{xs: 12, sm: 12, md: 6, xl: 6}}>
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
                    </Grid>
                    <Grid size={{xs: 12, sm: 12, md: 6, xl: 6}}>
                        <FormControl variant="standard" sx={{my: 1}}
                                     fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">نوع کلاس</InputLabel>
                            <Select
                                value={inSubscribe.SubscribeStatus || ""}
                                onChange={(e) => setInSubscribe({...inSubscribe, SubscribeStatus: e.target.value})}
                                label="نوع کلاس"
                                variant={"outlined"}
                                fullWidth
                            >
                                <MenuItem>انتخاب کنید</MenuItem>
                                {Object.keys(SubscribeTypeEnum).map(g => (
                                    <MenuItem key={g} value={g}>{SubscribeTypeEnum[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


                <Grid sx={{mt:4}} container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 5, sm: 5, md: 5, xl: 5}}>
                        <TextField
                            name={"ValuePrice"}
                            value={toPriceWithComma(inSubscribe.ValuePrice)}
                            onChange={(e) => priceChange(e.target.value)}
                            margin="dense"
                            label="ارزش عضویت (تومان)"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip

                            title={<Typography  variant={"subtitle2"}>
                                ارزش عضویت مبلغی است که مرکز برای فروش همین بلیط از طرق دیگر دریافت می کند. توجه داشته باشید مطابق تفاهم‌نامه این عدد نباید بیش از قیمت فروش همین بلیط به صورت آزاد باشد
                            </Typography>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                    <Grid size={{xs: 5, sm: 5, md: 5, xl: 5}}>
                        <ListItemText
                            primary="قیمت عضویت (تومان)"
                            secondary={toPriceWithComma(inSubscribe.PlacePrice)}
                            primaryTypographyProps={{variant:"body2"}}
                            secondaryTypographyProps={{variant:"h5",color:"#202020"}}
                        />
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip

                            title={<Typography  variant={"subtitle2"}>
                                قیمت عضویت یا قیمت فروش که کمیسیون توافق شده از آن کسر می‌شود و به حساب شما واریز می‌گردد
                            </Typography>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid sx={{mb:4}} container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 3, sm: 3, md: 3, xl: 3}}>
                        <FormControlLabel
                            checked={isOff}
                            onChange={e=>handleOffSwitch(e.target.checked)}
                            control={<Switch />}
                            label={"شگفت انگیز"}
                        />
                    </Grid>
                    <Grid size={{xs: 8, sm: 8, md: 8, xl: 8}}>
                        {isOff&&<Slider
                            aria-label="Temperature"
                            defaultValue={Math.round((1-(inSubscribe.PlacePrice/inSubscribe.ValuePrice))*100)}
                            valueLabelDisplay="auto"
                            shiftStep={30}
                            onChange={(e,n)=>changeOff(n)}
                            step={3}
                            marks
                            min={10}
                            max={85}
                        />}
                    </Grid>

                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={<Typography  variant={"subtitle2"}>
                                با شگفت انگیز کردن بلیط فروش خود را افزایش دهید
                            </Typography>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>


                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"} spacing={2}>
                    <Grid size={{xs: 5, sm: 5, md: 3, xl:3}}>
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
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={<Typography  variant={"subtitle2"}>
                                تعداد ورود، تعداد دفعاتی است که کاربر میتواند از این بلیط استفاده کند . (برای 8 جلسه بدنسازی در ماه 8 در نظر گرفته شود- برای ورودی ها 1 در نظر گرفته شود)
                            </Typography>}
                        >
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                    <Grid size={{xs: 5, sm:5, md: 3, xl: 3}}>
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
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={<Typography  variant={"subtitle2"}>
                                    تعداد بلیط قابل فروش با هر فروش بلیط یک عدد کم می شود توصیه میگردد این عدد بیش از 100 در نظر گرفته شود
                                </Typography>}
                        >
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                    <Grid size={{xs: 11, sm: 11, md: 3, xl: 3}}>
                        <TextField
                            name={"ExpireDuration"}
                            value={inSubscribe.ExpireDuration || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, ExpireDuration: e.target.value})}
                            margin="dense"
                            label="خرید تا انقضا (روز)"
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={
                                <Typography  variant={"subtitle2"}>
                                    تعداد روز برای یک ماه 30 و برای 3 ماه 90 در نظر گرفته می شود
                                </Typography>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 11, sm: 11, md: 11, xl: 11}}>
                        <TextField
                            name={"timing"}
                            value={inSubscribe.Timing || ""}
                            onChange={(e) => setInSubscribe({...inSubscribe, Timing: e.target.value})}
                            margin="dense"
                            label="زمان فعالیت"
                            type="text"
                            aria-multiline={"true"}
                            minRows={3}
                            fullWidth
                            multiline
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={<>
                                <Typography variant={"subtitle2"}>
                                    در صورتی که برای این بلیط زمان خاصی وجود دارد مثل کلاس های پیلاتس در این قسمت توضیح دهید و اگر زمان فعالیت مانند باشگاه های بدنسازی با ساعات کاری مجموعه یکی است خالی بگذارید
                                </Typography>
                            </>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 11, sm: 11, md: 11, xl: 11}}>
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
                    </Grid>
                    <Grid size={{xs: 1, sm: 1, md: 1, xl: 1}}>
                        <Tooltip
                            title={<>
                                <Typography variant={"subtitle2"}>
                                    در صورتی که برای بلیط توضیحاتی وجود دارد در این قسمت یادداشت شود در غیر این صورت این فیلد را خالی بگذارید
                                </Typography>
                                <Typography variant={"subtitle2"}>
                                    مثال :
                                </Typography>
                                <Typography variant={"subtitle2"}>در هنگام اولین خرید یک شیکر و یک حوله ورزشی هدیه خواهید گرفت.
                                </Typography>
                                <Typography  variant={"subtitle2"}>
                                    یا
                                </Typography>
                                <Typography variant={"subtitle2"}>قبل از خرید هماهنگی ساعت استفاده با مجموعه انجام شود.
                                </Typography>
                            </>}>
                            <InfoOutlined fontSize={"large"}/>
                        </Tooltip>
                    </Grid>
                </Grid>



                <FormControl fullWidth>
                    <Button variant={"contained"} type={"submit"}>ثبت</Button>
                </FormControl>
            </Form>
        </>
    );
};

export default _SubscribeBaseData;
