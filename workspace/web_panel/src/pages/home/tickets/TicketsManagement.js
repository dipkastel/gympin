import React, {useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import {useHistory} from "react-router-dom";
import {Place_query} from "../../../network/api/place.api";
import {ticket_query} from "../../../network/api/tickets.api";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Chip, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {getUserFixedName, toPriceWithComma} from "../../../helper";

const TicketsManagement = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchString, setSearchString] = useState("");
    const [tickets, SetTickets] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);

    useEffect(() => {
        getTickets()
    }, [page, rowsPerPage, searchString]);

    function getTickets() {
        ticket_query({
            queryType: "SEARCH",
            name: searchString,
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then((data) => {
            SetTickets(data.data.Data)
        });
    }
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تیکت یا بلیط ، دسترسی کاربر برای دریافت خدماتی می باشد که خریداری می شود و مجموعه موضف به ارائه آن خدمات می باشد</p>
                <p>کاربر با خرید بلیط شرایط و قوانین جیم پین و مراکز را می پذیرد.</p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="بلیط ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>مرکز</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>پلن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>انقضا</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.content && tickets.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "ticket/data/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            {console.log(row)}
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">{getUserFixedName(row.User)}</TableCell>
                                            <TableCell align="right">{row.Plan.Place.Name||"ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.PlanName||"ثبت نشده"}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row.Price)}</TableCell>
                                            <TableCell align="right">{new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell><TableCell align="right">
                                                <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(tickets.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={tickets.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default TicketsManagement;
