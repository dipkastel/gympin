import React, {useContext, useEffect, useState} from 'react';
import {
    List,
} from "@mui/material";
import {Plans_getByPlace} from "../../../network/api/Plans.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {ticket_add} from "../../../network/api/tickets.api";
import _PlaceReserveListItem from "./_PlaceReserveListItem";

const _TabPlaceReserve = ({place}) => {
    const navigate = useNavigate()
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user)
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        if (!place.Id) return;
        getPlans();
    }, [place]);


    function getPlans() {
        Plans_getByPlace({Id: place.Id}).then(result => {
            setPlans(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function addToTickets(item) {
        if(!currentUser){
            error.showError({
                clickable: true,
                message: 'برای خرید بلیط ابتدا باید وارد شوید',
                buttonTitle: 'پروفایل',
                duration:6000,
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
                duration:6000,
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
                duration:6000,
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
                duration:6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
            });
            return;
        }
        ticket_add({Plan: {Id: item.Id}, User: {Id: currentUser.Id}})
            .then(result => {
                navigate("/tickets", {replace: false});
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }


    return (
            <List className={"nopadding"} disablePadding>
                {plans.filter(t=>t.Enable).map((item, number) => (<_PlaceReserveListItem key={"ac"+number} plan={item} number={number} addToTickets={addToTickets}/>))}
                {plans.filter(t=>!t.Enable).map((item, number) => (<_PlaceReserveListItem key={"de"+number} plan={item} number={number} addToTickets={addToTickets}/>))}
            </List>
    );
};

export default _TabPlaceReserve;
