import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Avatar, Chip, Grid, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
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
import {serial_query} from "../../../network/api/serial.api";
import {ProcessTypeEnum} from "../../../helper/enums/ProcessTypeEnum";
import {getUserFixedName} from "../../../helper";

const ProcessManagement = () => {
    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppInvoiceManagement());
    const [processList, setProcessList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);
    const history = useHistory();

    useEffect(() => {
         var invoiceStatus = (selectedTab==="TRA_CHECKOUT_BASKET")?"COMPLETED":null
        serial_query({
            queryType: "FILTER",
            Serial: searchString,
            InvoiceStatus:invoiceStatus,
            ProcessType:selectedTab,
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            setProcessList(result.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [page, rowsPerPage, searchString,selectedTab]);

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
            <Notice icon="flaticon-warning kt-font-primary">مدیریت فرآیند ها</Notice>

            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"scrollable"}
                    aria-label="full width tabs example"
                >
                    <Tab label="همه" value={null}/>
                    {Object.keys(ProcessTypeEnum).map(item=>(
                            <Tab key={item} label={ProcessTypeEnum[item]} value={item}/>
                        )
                    )}
                </Tabs>
            </Paper>

            <Portlet>
                <PortletHeader
                    title="فرآیند ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>زمان</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>سریال</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>توسط</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {processList.content && processList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover  role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/process/detail/" + row.Id});
                                            }} component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell onClick={(event) => {
                                                history.push({pathname: "/process/detail/" + row.Id});
                                            }} align="right">{ProcessTypeEnum[row.ProcessType]}</TableCell>
                                            <TableCell
                                                align="right">{new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell
                                                align="right">{row?.Serial}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">
                                                <Grid container direction={"row"} justifyContent={"start"} alignItems={"center"}>
                                                    <Avatar
                                                        alt={row?.CreatorUser?.Name}
                                                        onClick={() => history.push("/users/details/" + row?.CreatorUser?.Id)}
                                                        src={row?.CreatorUser?.Multimedias ? row?.CreatorUser?.Multimedias[0]?.Url : ""}
                                                        sx={{width: 20, height: 20,mx:1}}/>
                                                    <Typography variant={"subtitle1"} >
                                                        {getUserFixedName(row?.CreatorUser)}
                                                    </Typography>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {processList.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={processList.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        rowsPerPage={rowsPerPage}
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

export default ProcessManagement;
