import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import * as PropTypes from "prop-types";
import AdapterJalaali from '@date-io/jalaali';
import {TimePicker} from "@mui/x-date-pickers";
import {useParams} from "react-router-dom";
import {Halls_getById} from "../../../network/api/halls.api";
import _BaseHallData from "./_BaseHallData";
import _HallSchedule from "./_HallSchedule";
import getAccessOf from "../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../helper/enums/personnelAccessEnum";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import AccessDenied from "../../../components/AccessDenied";

TimePicker.propTypes = {
    renderInput: PropTypes.func,
    label: PropTypes.string
};
const Hall = () => {

    const error = useContext(ErrorContext);
    const {hallId} = useParams()
    const [hall, SetHall] = useState({})

    useEffect(() => {
        document.title = 'مدیریت سالن';
        getHall()
    }, []);

    function getHall() {
        Halls_getById({id: hallId}).then(result => {
            SetHall(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementHalls))
        return <AccessDenied/>;


    return (
        <>
            <_BaseHallData hall={hall} getHall={getHall}/>
            <_HallSchedule hall={hall}/>
        </>

    );
};

export default Hall;
