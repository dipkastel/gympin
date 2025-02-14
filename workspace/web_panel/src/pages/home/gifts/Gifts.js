import React from 'react';
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {SetRppLocationManagement} from "../../../helper/pocket/pocket";
import {Edit, EditAttributes, InsertLink} from "@mui/icons-material";
import _GiftCredit from "./giftTypes/_GiftCredit";

const Gifts = () => {


    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>مدیریت هدایا</p>
            </Notice>

            <_GiftCredit />
        </>
    );
};

export default Gifts;
