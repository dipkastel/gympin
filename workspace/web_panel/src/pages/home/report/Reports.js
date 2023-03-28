import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import {user_query} from "../../../network/api/user.api";
import {Form, Modal} from "react-bootstrap";
import {Avatar, Button, Chip, TextField} from "@mui/material";
import {account_registerUser} from "../../../network/api/auth.api";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import UserAvatar from "../user/baseDate/Avatar/UserAvatar";
import UserBasics from "../user/baseDate/Base/UserBasics";
import UserAccess from "../user/baseDate/Access/UserAccess";
import UserStatus from "../user/baseDate/Status/UserStatus";
import UserTransActionRequests from "../user/baseDate/TransActionRequests/UserTransActionRequests";
import UserCredit from "../user/baseDate/credit/UserCredit";
import UserPlaces from "../user/baseDate/places/UserPlaces";
import UserCorporates from "../user/baseDate/corporates/UserCorporates";
import UserTransActions from "../user/baseDate/TransActions/UserTransActions";
import Notes from "../../partials/content/notes/Notes";
import _reportSettings from "./reportSettings/_reportSettings";

const Reports = () => {
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">گزارشات</Notice>
            <div className="row">
                <div className="col-md-6">
                    <_reportSettings />
                </div>
                <div className="col-md-6">
                </div>
            </div>
        </>
    );
};

export default Reports;
