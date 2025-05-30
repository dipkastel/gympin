import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import AsyncSelect from "react-select/async";
import {corporate_query} from "../../../network/api/corporate.api";
import {toPriceWithComma} from "../../../helper";

const __SelectCorporate = ({hidden,onChange,value}) => {

    const error = useContext(ErrorContext);

    useEffect(() => {
        if(hidden)
            onChange({value:null});
    }, [hidden]);


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Name}</Typography>
                    <Typography variant={"body2"}>{toPriceWithComma(itm?.FinanceCorporate?.TotalDeposit-itm?.FinanceCorporate?.TotalCredits)}</Typography>
                    <Typography variant={"body2"}>{itm.Status}</Typography>
                </Grid>)
            }

            corporate_query({
                queryType: "SEARCH",
                Name: inputValue,
                Address: inputValue,
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
                         label="سازمان"
                         placeholder="سازمان"
                         onChange={onChange}
                         loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectCorporate;
