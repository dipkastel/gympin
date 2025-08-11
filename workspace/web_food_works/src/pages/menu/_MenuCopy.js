import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {Form, Modal} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {TicketFoodMenu_copyDate, TicketFoodMenu_getDates} from "../../network/api/TicketFoodMenu.api";
import Grid from "@mui/material/Grid2";

const _MenuCopy = ({catering,selectedDate,copyDone}) => {

    const error = useContext(ErrorContext);
    const [activeDates, setActiveDates] = useState(null);
    const [copyDate, setCopyDate] = useState(null);

    useEffect(() => {
        getActiveDates();
    }, []);

    function getActiveDates() {
        TicketFoodMenu_getDates({cateringId: catering.Id}).then(result => {
            setActiveDates(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalCopy(){

        function submitCopy(e) {

            TicketFoodMenu_copyDate({Catering:{Id:catering.Id},From:copyDate,To:selectedDate}).then(result => {
                copyDone();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <>

                <Dialog maxWidth={"md"} open={!!copyDate} onClose={() => setCopyDate(null)}>
                    <DialogTitle>{"کپی منو از "+new Date(copyDate).toLocaleDateString('fa-IR', {
                        weekday: 'long',
                    }) +"  "+new Date(copyDate).toLocaleDateString('fa-IR', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}</DialogTitle>
                    <DialogContent>
                        <Typography variant={"subtitle1"} >
                            {"با کپی کردن منو همه آیتم های منو با همان مشخصات در این تاریخ اضافه شده و سپس امکان تغییر آنها وجود دارد"}
                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={(e)=>submitCopy()}
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Dialog>

            </>
        );
    }


    return (
        <>
            <Card elevation={10} sx={{m:2}}>
                <CardHeader title={"کپی از تاریخ دیگر"}/>
                <CardContent >
                    <Grid columns={3} container columnSpacing={1} >
                        {activeDates?.map(item=>(
                            <Grid key={item.Id+"--time"} size={1}>
                                <Button variant={"contained"} fullWidth size={"large"} sx={{my:1}} key={item} onClick={(e)=>setCopyDate(item)}>{new Date(item).toLocaleDateString('fa-IR', {
                                    weekday: 'long',
                                }) +"  "+new Date(item).toLocaleDateString('fa-IR', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</Button>
                            </Grid>
                        ))}

                    </Grid>
                </CardContent>
            </Card>
            {renderModalCopy()}
        </>
    );
};

export default _MenuCopy;
