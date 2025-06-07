import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _ProInvoice from "./partials/_ProInvoice";
import _FoodSelectDate from "./_FoodSelectDate";
import _FoodMenu from "./_FoodMenu";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    invoice_addBuyable,
    invoice_changeInvoiceBuyableCount,
    invoice_deleteBuyable,
    invoice_getBasketByUserId
} from "../../../network/api/invoice.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router";

const FoodDetails = () => {

    const error = useContext(ErrorContext);
    let {cateringId} = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(false);
    const currentUser = useSelector(state => state.auth.user);
    const [CurrentBasket, SetCurrentBasket] = useState(null);


    useEffect(() => {
        getBasket();
    }, []);

    function getBasket() {
        invoice_getBasketByUserId(currentUser.Id).then(result => {
            SetCurrentBasket(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function AddOrder(itemId) {
        invoice_addBuyable({
            Invoice: {Id: CurrentBasket?.Id || null},
            Buyable: {Id: itemId},
            Count: 1
        }).then(result => {
            error.showError({message: 'به سبد خرید اضافه شد'});
            getBasket();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RemoveOrder(item) {
        if(item.Count<2){
            invoice_deleteBuyable({id: item.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getBasket()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }else{
            updateCount("minus",item);
        }
    }

    function updateOrderCount(item,Count) {
        updateCount("update",item,Count);
    }

    function updateCount(action,item,_newCount) {
        let newCount = item.Count;
        if (action === "plus") {
            newCount++;
        }

        if (action === "minus") {
            newCount--;
        }
        if(action === "update"){
            newCount = _newCount;
        }
        invoice_changeInvoiceBuyableCount({
            Id: item.Id,
            Count: newCount
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            getBasket();
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
            <Grid columns={120} container>
                <Grid sx={{p: 1}} size={{xs: 90, sm: 96, md: 102, lg: 104, xl: 108}}>
                    <Card><CardContent sx={{p: 2}}>
                        <Typography variant={"h4"}>فارسی در یک نگاه</Typography>
                        <Typography sx={{mt: 2, lineHeight: 1.9}} variant={"body1"}>شاد روان حاج محمدعلی فارسی بنیان گذار تهیه غذای فارسی در
                            سال ١٣٤٤ در سایه الطاف الهی پذیرایی زائران سرزمین وحی را به عهده گرفت و پس از گذشت بیست سال مدیریت گروه حج ، در
                            سال 1364 فعالیت خود را در تالارداری و خدمات مجالس شروع کرد و با توجه به رضایت و استقبال روز افزون مشتریان عزیز
                            توانست روز به روز بر کیفیت کار خود بیفزاید. و در طی این سالها، انتقادات و پیشنهادهای سازنده مشتریان را سرلوحه
                            کار خود قرار دادیم.</Typography>
                    </CardContent></Card>
                </Grid>
                <Grid sx={{p: 1, alignContent: "top"}} size={{xs: 30, sm: 24, md: 18, lg: 16, xl: 12}}>
                    <Button sx={{my: 1}} variant={"contained"} fullWidth size={"small"}>تاریخچه و پیگیری</Button>
                    <_ProInvoice CurrentBasket={CurrentBasket} refreshList={getBasket} addOrder={AddOrder}
                                 setOrderCount={updateOrderCount} removeOrder={RemoveOrder}/>
                </Grid>
                <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                    <_FoodSelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} catering={cateringId}/>
                </Grid>
                <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                    {selectedDate && <_FoodMenu selectedDate={selectedDate} catering={cateringId} orders={CurrentBasket} addOrder={AddOrder}
                                                />}
                </Grid>


            </Grid>
        </>
    );
};

export default FoodDetails;
