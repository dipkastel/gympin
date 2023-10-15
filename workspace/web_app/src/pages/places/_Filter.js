import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Typography
} from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {getAllSports, sports_query} from "../../network/api/sport.api";
import GetStringPrice from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Location_query} from "../../network/api/location.api";
import {useSelector} from "react-redux";

const _Filter = ({setBaseFilters,BaseFilters, setBaseSortBy}) => {

    return (
        <>


        </>
    );
};

export default _Filter;
