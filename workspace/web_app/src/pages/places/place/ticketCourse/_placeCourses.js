import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import _PlaceSubscribeListItem from "../ticketSubscribe/_PlaceSubscribeListItem";
import {Collapse, Grid, Typography} from "@mui/material";
import {ExpandLessTwoTone} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSelector} from "react-redux";
import {invoice_addBuyable, invoice_addSubscribe} from "../../../../network/api/invoice.api";
import {sagaActions} from "../../../../helper/redux/actions/SagaActions";
import store from "../../../../helper/redux/store";
import {useNavigate} from "react-router-dom";
import {ticketCourses_getByPlace} from "../../../../network/api/ticketCourses.api";
import _PlaceCourseListItem from "./_PlaceCourseListItem";

const _placeCourses = ({place}) => {

        const error = useContext(ErrorContext);
        const navigate = useNavigate()
        const currentUser = useSelector(state => state.auth.user)
        const [courses, setCourses] = useState([])
        const [isExpanded, setIsExpanded] = useState(true)
        const userBasket = useSelector(state => state.invoice.userBasket);
        useEffect(() => {
            ticketCourses_getByPlace({Id: place.Id}).then(result => {
                setCourses(result.data.Data);
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


            invoice_addSubscribe({
                Invoice: {Id: userBasket?.Id||null},
                Subscribe: {Id: item.Id},
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
                {courses.length>0 && <>
                    <Grid container onClick={(e) => setIsExpanded(!isExpanded)} direction={"row"} alignItems={"center"}
                          justifyContent={"space-between"} bgcolor={"#c7c7c7"}
                          sx={{width: "100%", p: 1, borderBottom: "#e7333e solid 2px", mt: 1}}>

                        <Typography variant={"subtitle1"} color={"white"}>کلاس ها</Typography>
                        {isExpanded ? <ExpandLessTwoTone/> : <ExpandMoreIcon/>}
                    </Grid>
                    <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
                        {courses?.filter(t => t.Enable).map((item, number) => (
                            <_PlaceCourseListItem key={"ac" + number} course={item} number={number}
                                                  addToBasket={addToBasket}/>))}
                        {courses?.filter(t => !t.Enable).map((item, number) => (
                            <_PlaceCourseListItem key={"de" + number} course={item} number={number}
                                                  addToBasket={addToBasket}/>))}
                    </Collapse></>}
            </div>
        );
    }
;

export default _placeCourses;
