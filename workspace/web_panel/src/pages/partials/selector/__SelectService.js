import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import AsyncSelect from "react-select/async";
import {serviceEnum} from "../../../helper/enums/serviceEnum";

const __SelectService = ({hidden, onChange}) => {


    useEffect(() => {
        if (hidden)
            onChange({value: null});
    }, [hidden]);


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm}</Typography>
                </Grid>)
            }

            resolve(Object.entries(serviceEnum).filter(s => s[1].includes(inputValue)).map(itm => {
                return {label: getLabelOfUser(itm[1]), value: itm[0]}
            }));
        });
    }

    return (
        <>
            {!hidden && <AsyncSelect cacheOptions defaultOptions
                                     name={"User"}
                                     label="سرویس"
                                     placeholder="سرویس"
                                     onChange={onChange}
                                     loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectService;
