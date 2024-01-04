import React, {useEffect, useState} from "react";
import {Portlet, PortletBody, PortletFooter, PortletHeader,} from "../../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import TablePagination from "@mui/material/TablePagination";
import {transactionUser_query} from "../../../../../network/api/transactionsUser.api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ApartmentIcon from '@mui/icons-material/Apartment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import {Tooltip} from "@mui/material";
import {SupervisorAccount} from "@mui/icons-material";

function UserTransactions({ currentUser ,updatePage}) {
    return (
    <Portlet>
      <PortletHeader title="تراکنش های شخصی کاربر" />

    </Portlet>
  );
}

export default UserTransactions;
