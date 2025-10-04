import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Avatar, Chip, Grid, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {invoice_query} from "../../../network/api/invoice.api";
import {InvoiceStatus} from "../../../helper/enums/InvoiceStatus";
import {getRppInvoiceManagement, SetRppInvoiceManagement} from "../../../helper/pocket/pocket";

const InvoiceManagement = () => {
    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppInvoiceManagement());
    const [userList, setUserList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const history = useHistory();

    useEffect(() => {
        invoice_query({
            queryType: "SEARCH",
            FullName: searchString,
            PhoneNumber: searchString,
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((data) => {
            setUserList(data.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [page, rowsPerPage, searchString]);

    function getStatusCollor(row) {
        switch (row.Status) {
            case "PENDING":
                return "info";
            case "PROCESSING":
                return "default";
            case "CANCELLED":
                return "error";
            case "NEED_REVIEW":
                return "warning";
            case "NEED_TO_PAY":
                return "warning";
            case "COMPLETED":
                return "success";
            case "REFUNDED":
                return "secondary";
            case "FAILED":
                return "error";
            case "DRAFT":
                return "primary";
        }
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">مدیریت فاکتور ها</Notice>

            <Portlet>
                <PortletHeader
                    title="فاکتور ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <TextField
                                fullWidth
                                id="outlined-adornment-password"
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={searchString}
                                onChange={(event) => {
                                    setSearchString(event.target.value);
                                    setPage(0);
                                }}
                                label={"جستجو"}
                            />
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => SetOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }

                />

                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تلفن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تعداد
                                        آیتم</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مجموع
                                        قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.content && userList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover  role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/invoice/detail/" + row.Id});
                                            }} component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">
                                                <Grid container direction={"row"} justifyContent={"start"} alignItems={"center"}>
                                                    <Avatar
                                                        alt={row?.User?.Name}
                                                        onClick={() => history.push("/users/details/" + row.User.Id)}
                                                        src={row?.User?.Multimedias ? row?.Corporate?.Multimedias[0]?.Url : ""}
                                                        sx={{width: 20, height: 20,mx:1}}/>
                                                    <Typography variant={"subtitle1"} >
                                                        {row.UserFullName}
                                                    </Typography>
                                                </Grid>
                                            </TableCell>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/invoice/detail/" + row.Id});
                                            }} align="right">{row.UserPhoneNumber}</TableCell>
                                            <TableCell
                                                align="right">{row.InvoiceBuyables.reduce((a, b) => a + b.Count, 0)}</TableCell>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/invoice/detail/" + row.Id});
                                            }} align="right">{row.TotalPrice}</TableCell>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/invoice/detail/" + row.Id});
                                            }} align="right">
                                                <Chip label={InvoiceStatus[row.Status]}
                                                      color={getStatusCollor(row)}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {userList.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={userList.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppInvoiceManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default InvoiceManagement;
