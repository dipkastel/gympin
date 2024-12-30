import React, {useContext, useEffect, useState} from 'react';
import {Alert, AlertTitle, Button, List,} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {ticketBuyable_query} from "../../../network/api/buyable.api";
import _placeSubscribes from "./ticketSubscribe/_placeSubscribes";
import _placeCourses from "./ticketCourse/_placeCourses";

const _TabPlaceBuyable = ({place}) => {
    const navigate = useNavigate()
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user)
    const [buyables, setBuyables] = useState([]);
    useEffect(() => {
        if (!place.Id) return;
        getPlans();
    }, [place]);


    function getPlans() {
        ticketBuyable_query({
            queryType: "FILTER",
            Place: place.Id,
            paging: {Page: 0, Size: 50}
        }).then(result => {
            setBuyables(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function addToSubscribes(item) {
        if (!currentUser) {
            error.showError({
                clickable: true,
                message: 'برای خرید ابتدا باید وارد شوید',
                buttonTitle: 'پروفایل',
                duration: 6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
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
        // if (!currentUser.NationalCode) {
        //     error.showError({
        //         clickable: true,
        //         message: 'تکمیل کد ملی',
        //         buttonTitle: 'پروفایل',
        //         onClick: () => {
        //             navigate("/profile/edit", {replace: false});
        //         }
        //     });
        //     return;
        // }
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
        // subscribe_add({Plan: {Id: item.Id}, User: {Id: currentUser.Id}})
        //     .then(result => {
        //         navigate("/tickets", {replace: false});
        //     }).catch(e => {
        //     try {
        //         error.showError({message: e.response.data.Message});
        //     } catch (f) {
        //         error.showError({message: "خطا نا مشخص",});
        //     }
        // })

    }


    function getfixedPlaceNumber() {
        return "02177162192"
        // return place?.Tell;
    }

    function showCallSudjest() {
        return place?.CallUs&&place?.Tell;
    }

    return (<>
        {showCallSudjest()&&<Alert sx={{textDecoration:"none"}} severity="warning" href={"tel:"+getfixedPlaceNumber()} component={"a"}>
                <AlertTitle>قبل از خرید بلیط، شرایط استفاده را هماهنگ نمایید.</AlertTitle>
            <Button variant={"contained"} color={"warning"}>تماس با مرکز</Button>
            </Alert>}
            <List className={"nopadding"} disablePadding>
                {place.Id && <_placeSubscribes place={place}/>}
                {place.Id && <_placeCourses place={place}/>}
            </List>

        </>
    );
};

export default _TabPlaceBuyable;
