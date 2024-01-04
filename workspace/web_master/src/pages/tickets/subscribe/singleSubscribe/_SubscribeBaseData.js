import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {genders} from "../../../../helper/enums/genders";
import {TicketSubscribes_update} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";

const _SubscribeBaseData = ({ ticketSubscribe, getSubscribeData}) => {
    const error = useContext(ErrorContext);
    const [inSubscribe, setInSubscribe] = useState(ticketSubscribe)

    useEffect(() => {
        setInSubscribe(ticketSubscribe);
        console.log(ticketSubscribe)
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
