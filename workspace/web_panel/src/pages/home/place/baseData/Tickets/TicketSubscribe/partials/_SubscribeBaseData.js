import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel, Grid,
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
import {InfoOutlined} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {TicketSubscribes_update} from "../../../../../../../network/api/ticketSubscribes.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../../helper";
import {genders} from "../../../../../../../helper/enums/genders";
import {classStatus} from "../../../../../../../helper/enums/ClassStatus";

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
                                {Object.keys(classStatus).map(g => (
                                    <MenuItem key={g} value={g}>{classStatus[g]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


                <Grid sx={{mt:4}} container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 6, sm: 6, md: 6, xl: 6}}>
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
                    <Grid size={{xs: 6, sm: 6, md: 6, xl: 6}}>
                        <ListItemText
                            primary="قیمت عضویت (تومان)"
                            secondary={toPriceWithComma(inSubscribe.PlacePrice)}
                            primaryTypographyProps={{variant:"body2"}}
                            secondaryTypographyProps={{variant:"h5",color:"#202020"}}
                        />
                    </Grid>
                </Grid>


                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"} spacing={2}>
                    <Grid size={{xs: 6, sm: 6, md: 4, xl:4}}>
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
                    <Grid size={{xs: 6, sm:6, md: 4, xl: 4}}>
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
                    <Grid size={{xs: 12, sm: 12, md: 4, xl: 4}}>
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
                </Grid>

                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 12, sm: 12, md: 12, xl: 12}}>
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
                </Grid>
                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"}>
                    <Grid size={{xs: 12, sm: 12, md: 12, xl: 12}}>
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
                </Grid>



                <FormControl fullWidth>
                    <Button variant={"contained"} type={"submit"}>ثبت</Button>
                </FormControl>
            </Form>
        </>
    );
};

export default _SubscribeBaseData;
