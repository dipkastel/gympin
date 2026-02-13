import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, CircularProgress, TableCell, Tooltip, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {service_deleteCorruptedItems, service_query} from "../../../../network/api/service.api";
import {getRppSettingActivities, SetRppSettingActivities} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {serviceEnum} from "../../../../helper/enums/serviceEnum";
import TablePagination from "@mui/material/TablePagination";
import SystemSecurityUpdateWarningIcon from '@mui/icons-material/SystemSecurityUpdateWarning';
import {useHistory} from "react-router-dom";
import {getUserFixedName} from "../../../../helper";
import __SelectUser from "../../../partials/selector/__SelectUser";
import {FormatListBulleted} from "@mui/icons-material";
import __SelectService from "../../../partials/selector/__SelectService";
import PopoverUser from "../../../../components/popover/PopoverUser";

const __SettingActivitiesDetails = () => {

    const history = useHistory();
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSettingActivities());
    const [service, setService] = useState([]);
    const [selectedService,setSelectedService] = useState(null);
    const [selectedUser,setSelectedUser] = useState(null);

    useEffect(() => {
        getActivities();
    }, [page, rowsPerPage,selectedUser,selectedService]);




    function getActivities() {
        setService(null);
        service_query({
            queryType: "FILTER",
            Service:selectedService?.value,
            User:selectedUser?.value,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            setService(data.data.Data)
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
                    title="فیلتر"
                />

                <PortletBody>
                    <__SelectUser value={selectedUser} onChange={setSelectedUser} />
                    <br/>
                    <__SelectService value={selectedService} onChange={setSelectedService}  />
                </PortletBody>
            </Portlet>

            <Portlet>
                <PortletHeader
                    title="فعالیت های کاربران"
                />

                <PortletBody>

                    {service&&<Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right">کاربر</TableCell>
                                <TableCell align="right">نام اکشن</TableCell>
                                <TableCell align="right">زمان</TableCell>
                                <TableCell align="right">data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {service?.content && service?.content.map(item => (
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
                                            {item.ExecutorUser.FullName ? <PopoverUser user ={item.ExecutorUser} /> :
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
                                    <TableCell align="right" component="th"
                                               scope="row">
                                        <Tooltip title={item.Dto} placement="left">
                                            <FormatListBulleted color={"secondary"}/>
                                        </Tooltip></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                    {!service&&<><CircularProgress /></>}

                    {(service?.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={service?.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
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

export default __SettingActivitiesDetails;
