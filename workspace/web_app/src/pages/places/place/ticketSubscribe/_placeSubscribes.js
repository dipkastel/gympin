import React, {useContext, useEffect, useState} from 'react';
import {ticketSubscribe_getByPlace} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";
import {Box, Collapse, Grid2 as Grid, Typography} from "@mui/material";
import {ExpandLessTwoTone} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSelector} from "react-redux";
import {invoice_addBuyable, invoice_addSubscribe} from "../../../../network/api/invoice.api";
import {sagaActions} from "../../../../helper/redux/actions/SagaActions";
import store from "../../../../helper/redux/store";
import {useNavigate} from "react-router-dom";
import _SinglePlaceRegister from "../partial/_SinglePlaceRegister";

const _placeSubscribes = ({place,genderFilter}) => {

        const error = useContext(ErrorContext);
        const navigate = useNavigate()
        const currentUser = useSelector(state => state.auth.user)
        const [subscribes, setSubscribes] = useState(null)
        const userBasket = useSelector(state => state.invoice.userBasket);


    useEffect(() => {
        if(!!place?.Id)
            getTickets()
        }, []);

    function getTickets() {
        ticketSubscribe_getByPlace({Id: place.Id}).then(result => {
            setSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

        function addToBasket(item) {
            if (!currentUser) {
                navigate("/auth/login");
                error.showError({
                    clickable: false,
                    message: 'برای رزرو ابتدا باید وارد شوید',
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

            invoice_addSubscribe({
                Invoice: {Id: userBasket?.Id || null},
                Subscribe: {Id: item.Id},
                Count: 1
            }).then(result => {
                store.dispatch(sagaActions.RequestUserInvoices(currentUser))
                navigate("/basket", {replace: false});
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
                <Box sx={{ display: "flex", justifyContent: "center", p: 2,width:"100%" }}>
                    {subscribes?.length > 0 && <Grid container columns={2} spacing={2} sx={{width:"100%" }} >
                        {subscribes?.filter(t => t.Enable).filter(b=>genderFilter==null||b.Gender==genderFilter).map((item, number) => (
                            <_PlaceSubscribeListItem key={"ac" + number} subscribe={item} number={number}
                                                     addToSubscribe={addToBasket} login={!!currentUser}/>))}
                        {subscribes?.filter(t => !t.Enable).filter(b=>genderFilter==null||b.Gender==genderFilter).map((item, number) => (
                            <_PlaceSubscribeListItem key={"de" + number} subscribe={item} number={number}
                                                     addToSubscribe={addToBasket} login={!!currentUser}/>))}
                    </Grid>}
                    {subscribes&&subscribes?.length <1 && <Grid container columns={2} sx={{width:"100%"}}>
                        <_SinglePlaceRegister/>
                    </Grid>}
                </Box>
            </div>
        );
    };

export default _placeSubscribes;
