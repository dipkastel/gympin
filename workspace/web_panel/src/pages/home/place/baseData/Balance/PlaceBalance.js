import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
    placeAbout_add,
    placeAbout_delete,
    placeAbout_getByPlace,
    placeAbout_update
} from "../../../../../network/api/placeAbout.api";


const PlaceBalance = ({place}) => {
    const [balance,SetBalance] = useState(place.Balance);

    useEffect(() => {
            SetBalance(place.Balance);
        }, [place]);

    return (
        <>
            <Portlet>
                <PortletHeader title="موجودی" />

                <PortletBody>
                    {`${balance} تومان`}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default PlaceBalance;
