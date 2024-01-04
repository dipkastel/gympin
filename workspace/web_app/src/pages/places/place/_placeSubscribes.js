import React, {useContext, useEffect, useState} from 'react';
import {ticketSubscribe_getByPlace} from "../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";
import {Collapse, Grid, Typography} from "@mui/material";
import {ExpandLessTwoTone} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSelector} from "react-redux";
import {invoice_add, invoice_addBuyable} from "../../../network/api/invoice.api";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import store from "../../../helper/redux/store";
import {useNavigate} from "react-router-dom";

const _placeSubscribes = ({place}) => {

        const error = useContext(ErrorContext);
        const navigate = useNavigate()
        const currentUser = useSelector(state => state.auth.user)
        const [subscribes, setSubscribes] = useState(null)
        const [isExpanded, setIsExpanded] = useState(true)
        const userBasket = useSelector(state => state.invoice.userBasket);
        useEffect(() => {
            ticketSubscribe_getByPlace({Id: place.Id}).then(result => {
                setSubscribes(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }, []);


        function addToBasket(item) {
            if (!currentUser) {
                navigate("/auth/login");
                error.showError({
                    clickable: false,
                    message: 'برای خرید ابتدا باید وارد شوید',
                    duration: 6000,
                });
                return;
            }
            if (!currentUser.FullName) {
                error.showError({
                    clickable: true,
                    message: 'تکمیل نام و نام خانوادگی',
                    buttonTitle: 'پروفایل',
                    duration: 6000,
                    onClick: () => {
                        navigate("/profile/edit", {replace: false});
                    }
                });
                return;
            }
            if (!currentUser.Birthday) {
                error.showError({
                    clickable: true,
                    message: 'تکمیل تاریخ تولد',
                    buttonTitle: 'پروفایل',
                    duration: 6000,
                    onClick: () => {
                        navigate("/profile/edit", {replace: false});
                    }
                });
                return;
            }
            if (!currentUser.NationalCode) {
                error.showError({
                    clickable: true,
                    message: 'تکمیل کد ملی',
                    buttonTitle: 'پروفایل',
                    onClick: () => {
                        navigate("/profile/edit", {replace: false});
                    }
                });
                return;
            }
            if (!currentUser.Gender) {
                error.showError({
                    clickable: true,
                    message: 'تکمیل جنسیت',
                    buttonTitle: 'پروفایل',
                    duration: 6000,
                    onClick: () => {
                        navigate("/profile/edit", {replace: false});
                    }
                });
                return;
            }
            //
            // if (!userBasket) {
            //
            //     invoice_add({User: {Id: currentUser.Id}}).then(data => {
            //         store.dispatch(sagaActions.RequestUserInvoices(currentUser))
            //         setTimeout(function () {
            //             addToBasket(item);
            //         }, 2000);
            //     }).catch(e => {
            //         try {
            //             error.showError({message: e.response.data.Message,});
            //         } catch (f) {
            //             error.showError({message: "خطا نا مشخص",});
            //         }
            //     });
            //     return;
            // }


            invoice_addBuyable({
                Invoice: {Id: userBasket?.Id||null},
                Buyable: {Id: item.Id},
                Count: 1
            }).then(result => {
                store.dispatch(sagaActions.RequestUserInvoices(currentUser))
                error.showError({
                    clickable: true,
                    message: 'با موفقیت به سبد خرید شما اضافه شد',
                    buttonTitle: 'سبد خرید',
                    duration: 8000,
                    onClick: () => {
                        navigate("/basket", {replace: false});
                    }
                });
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        };

        return (
            <div>
                {subscribes && <>
                    <Grid container onClick={(e) => setIsExpanded(!isExpanded)} direction={"row"} alignItems={"center"}
                          justifyContent={"space-between"} bgcolor={"#c7c7c7"}
                          sx={{width: "100%", p: 1, borderBottom: "#e7333e solid 2px", mt: 1}}>

                        <Typography variant={"subtitle1"} color={"white"}>عضویت ها</Typography>
                        {isExpanded ? <ExpandLessTwoTone/> : <ExpandMoreIcon/>}
                    </Grid>
                    <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
                        {subscribes?.filter(t => t.Enable).map((item, number) => (
                            <_PlaceSubscribeListItem key={"ac" + number} subscribe={item} number={number}
                                                     addToSubscribe={addToBasket}/>))}
                        {subscribes?.filter(t => !t.Enable).map((item, number) => (
                            <_PlaceSubscribeListItem key={"de" + number} subscribe={item} number={number}
                                                     addToSubscribe={addToBasket}/>))}
                    </Collapse></>}
            </div>
        );
    }
;

export default _placeSubscribes;
