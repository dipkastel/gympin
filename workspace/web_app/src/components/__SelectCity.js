import React, {useContext, useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import AsyncSelect from "react-select/async";
import {Location_query} from "../network/api/location.api";
import {ErrorContext} from "./GympinPagesProvider";

const __SelectCity = ({hidden, onChange, selectedLocation}) => {

    const error = useContext(ErrorContext);

    useEffect(() => {
        if (hidden)
            onChange({value: null});
    }, [hidden]);


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Name}</Typography>
                </Grid>)
            }

            Location_query({
                queryType: "FILTER",
                ParentId: 1,
                Name: inputValue,
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
            {!hidden && <AsyncSelect cacheOptions defaultOptions
                                     className={"rselect-container"}
                                     classNamePrefix="rselect"
                                     name={"Location"}
                                     label="انتخاب استان"
                                     value={{ label: selectedLocation?.Name, value: selectedLocation?.Id }}
                                     placeholder="استان"
                                     onChange={onChange}
                                     loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectCity;
