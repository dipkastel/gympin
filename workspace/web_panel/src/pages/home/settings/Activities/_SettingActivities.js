import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, TableCell, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {service_deleteCorruptedItems, service_query} from "../../../../network/api/service.api";
import {getRppSettingActivities, SetRppSettingActivities} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {serviceEnum} from "../../../../helper/enums/serviceEnum";
import TablePagination from "@mui/material/TablePagination";
import SystemSecurityUpdateWarningIcon from '@mui/icons-material/SystemSecurityUpdateWarning';
import {useHistory} from "react-router-dom";
import {getUserFixedName} from "../../../../helper";

const _SettingActivities = () => {

    const history = useHistory();
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSettingActivities());
    const [service, setService] = useState([]);

    useEffect(() => {
        getActivities();
    }, [page, rowsPerPage]);


    function getActivities() {
        service_query({
            queryType: "SEARCH",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            setService(data.data.Data)
            console.log(data.data.Data.content[0])
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function DeleteCorruptItems() {
        service_deleteCorruptedItems().then((data) => {
            alert("success");
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="فعالیت های کاربران"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => DeleteCorruptItems()}
                            >
                                <SystemSecurityUpdateWarningIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right">کاربر</TableCell>
                                <TableCell align="right">نام اکشن</TableCell>
                                <TableCell align="right">زمان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {service.content && service.content.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        {item.ExecutorUser &&
                                        <Avatar alt="gatewayImage"
                                                src={(item.ExecutorUser.Avatar?.Url) ? (item.ExecutorUser.Avatar?.Url || "") : ""}
                                                onClick={(e) => history.push({pathname: "/users/details/" + item.ExecutorUser.Id})}
                                                sx={{width: 40, height: 40}}/>
                                        }
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        {item.ExecutorUser && <Typography>
                                            {item.ExecutorUser.FullName ? getUserFixedName(item.ExecutorUser) :
                                                <Chip label={item.ExecutorUser.Username} color={"error"}/>}
                                        </Typography>}


                                    </TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{serviceEnum[item.Service] ? serviceEnum[item.Service] : item.Service}</TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{new Date(item.ExecutionDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {(service.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={service.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppSettingActivities(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _SettingActivities;
