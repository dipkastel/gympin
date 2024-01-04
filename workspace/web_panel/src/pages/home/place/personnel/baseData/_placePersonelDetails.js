import React from 'react';
import Notice from "../../../../partials/content/Notice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {Avatar, Button, Grid, TableCell, TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {toPriceWithComma} from "../../../../../helper";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";

const _placePersonelDetails = ({personel}) => {
    return (
        <>

            <Portlet >

                <PortletBody>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"space-around"}
                        alignItems="center">
                        <div>
                            <p>{("نام و نام خانوادگی : "+personel.User.FullName)}</p>
                            <p>{("نام کاربری : "+personel.User.Username)}</p>
                            <p>{("تلفن : "+personel.User.PhoneNumber)}</p>
                        </div>

                        <Avatar  alt="userImage" src={(personel.User.Avatar)?(personel.User.Avatar.Url||""):""}  sx={{width:130,height:130}} />
                    </Grid>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _placePersonelDetails;
