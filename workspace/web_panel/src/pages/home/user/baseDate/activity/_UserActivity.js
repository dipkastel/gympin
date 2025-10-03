import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {service_query} from "../../../../../network/api/service.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {getRppUserActivity, SetRppUserActivity} from "../../../../../helper/pocket/pocket";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {serviceEnum} from "../../../../../helper/enums/serviceEnum";
import TablePagination from "@mui/material/TablePagination";

const _UserActivity = ({currentUser}) => {


    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppUserActivity());
    const [service, setService] = useState([]);

    useEffect(() => {
        getActivities();
    }, [page, rowsPerPage]);

    function getActivities() {
        service_query({
            queryType: "SEARCH",
            User:currentUser.Id,
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
        <div>
            <Portlet>
                <PortletHeader title="فعالیت های کاربر" />
                <PortletBody>


                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">نام اکشن</TableCell>
                                <TableCell align="right">زمان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {service?.content && service?.content.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{serviceEnum[item?.Service] ? serviceEnum[item.Service] : item.Service}</TableCell>
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
                            SetRppUserActivity(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </div>
    );
};

export default _UserActivity;
