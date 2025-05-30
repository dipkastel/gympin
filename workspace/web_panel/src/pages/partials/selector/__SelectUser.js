import React, {useContext, useEffect, useState} from 'react';
import {user_query} from "../../../network/api/user.api";
import {Grid, Typography} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import AsyncSelect from "react-select/async";

const __SelectUser = ({hidden,onChange,value}) => {

    const error = useContext(ErrorContext);

    useEffect(() => {
        if(hidden)
            onChange({value:null});
    }, [hidden]);


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Username}</Typography>
                    <Typography variant={"body2"}>{((itm.FullName) ? `(${itm.FullName})` : "")}</Typography>
                    <Typography variant={"body2"}>{itm.PhoneNumber}</Typography>
                </Grid>)
            }

            user_query({
                queryType: "SEARCH",
                Username: inputValue,
                FullName: inputValue,
                PhoneNumber: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: getLabelOfUser(itm), value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
    }

    return (
        <>
            {!hidden&&<AsyncSelect cacheOptions defaultOptions
                         name={"User"}
                         label="کاربر"
                         placeholder="کاربر"
                         onChange={onChange}
                         loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectUser;
