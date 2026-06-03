import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {TicketFoodMenu_copyDate, TicketFoodMenu_getDates} from "../../../../../network/api/TicketFoodMenu.api";
import {Modal} from "react-bootstrap";

const CopyFromDate = ({catering,selectedDate,copyDone}) => {


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
                <Modal show={!!copyDate} onHide={() => setCopyDate(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"کپی منو از "+new Date(copyDate).toLocaleDateString('fa-IR', {
                                weekday: 'long',
                            }) +"  "+new Date(copyDate).toLocaleDateString('fa-IR', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Typography variant={"subtitle1"} >
                                {"با کپی کردن منو همه آیتم های منو با همان مشخصات در این تاریخ اضافه شده و سپس امکان تغییر آنها وجود دارد"}
                            </Typography>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                color={"success"}
                                variant={"contained"}
                                onClick={(e)=>submitCopy()}
                            >
                                تایید
                            </Button>
                        </Modal.Footer>
                </Modal>
            </>
        );
    }


    return (
        <>
            <Card elevation={10}>
                <CardHeader title={"کپی از تاریخ دیگر"}/>
                <CardContent >
                    {activeDates?.map(item=>(
                        <Button variant={"contained"} fullWidth size={"large"} sx={{my:1}} key={item} onClick={(e)=>setCopyDate(item)}>{new Date(item).toLocaleDateString('fa-IR', {
                            weekday: 'long',
                        }) +"  "+new Date(item).toLocaleDateString('fa-IR', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</Button>
                    ))}
                </CardContent>
            </Card>
            {renderModalCopy()}
        </>
    );
};

export default CopyFromDate;
