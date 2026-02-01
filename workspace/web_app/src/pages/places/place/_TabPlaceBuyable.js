import React, {useContext, useEffect, useState} from 'react';
import { List, Tab, Tabs,} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _placeSubscribes from "./ticketSubscribe/_placeSubscribes";
import {genders} from "../../../helper/enums/genders";
import {useNavigate} from "react-router";

const _TabPlaceBuyable = ({place}) => {
    const navigate = useNavigate()
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user)
    const [genderFilter, setGenderFilter] = useState(null);

    useEffect(() => {
        if (!place.Id) return;
        getPlans();
        if(place?.Genders?.length==1){
            setGenderFilter(place?.Genders[0])
        }
    }, [place]);


    function getPlans() {
        // ticketBuyable_query({
        //     queryType: "FILTER",
        //     Place: place.Id,
        //     paging: {Page: 0, Size: 1}
        // }).then(result => {
        // if(result?.data?.Data?.numberOfElements===0)
        //     setSelectedTab(1)
        // if(result.data.Data)return;
        // }).catch(e => {
        //     try {
        //         error.showError({message: e.response.data.Message});
        //     } catch (f) {
        //         error.showError({message: "خطا نا مشخص",});
        //     }
        // })
    }

    function addToSubscribes(item) {
        if (!currentUser) {
            error.showError({
                clickable: true,
                message: 'برای رزرو ابتدا باید وارد شوید',
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



    return (
        <>


            {place?.Genders?.length > 0 && (
                <Tabs
                    value={genderFilter}
                    onChange={(e, n) => setGenderFilter(n)}
                    variant="fullWidth"
                    textColor="inherit"
                    TabIndicatorProps={{ sx: { display: "none" } }}
                    sx={{
                        background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                        borderRadius: 3,
                        p: 0.5,
                        m:2
                    }}
                >
                    {place?.Genders?.map((gender, number) => (
                        <Tab
                            key={number}
                            label={genders[gender]}
                            value={gender}
                            sx={{
                                color: "white",
                                fontWeight: genderFilter === number ? "bold" : "normal",
                                fontSize: genderFilter === number ? "1.1rem" : "0.95rem",
                                transition: "all 0.3s ease",
                                "&.Mui-selected": { color: "#fff" }
                            }}
                        />
                    ))}
                </Tabs>
            )}


            <List sx={{minHeight: {sm: 50, md: 800}}} className={"nopadding"} disablePadding>
                {place?.Id && <_placeSubscribes place={place} genderFilter={genderFilter}/>}
            </List>

        </>
    );
};

export default _TabPlaceBuyable;
