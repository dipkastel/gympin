import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import {useHistory} from "react-router-dom";
import {ticket_add, ticket_query} from "../../../network/api/tickets.api";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Button, Chip, Grid, IconButton, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {getUserFixedName, toPriceWithComma} from "../../../helper";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _ticketFilter, {defaultFilterTicket} from "./_ticketFilter";
import {FilterAlt} from "@mui/icons-material";
import AsyncSelect from "react-select/async";
import {user_query} from "../../../network/api/user.api";
import {Label} from "reactstrap";
import {Plans_query} from "../../../network/api/plans.api";
import _financeFilter from "../finance/_financeFilter";
import {TicketStatus} from "../../../helper/enums/TicketStatus";

const TicketsManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tickets, SetTickets] = useState([]);
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const [filter, SetFilter] = useState(defaultFilterTicket);
    const [openModalFilter, setOpenModalFilter] = useState(false);

    useEffect(() => {
        getTickets()
    }, [page, rowsPerPage,filter]);

    function getTickets() {
        ticket_query({
            queryType: "FILTER",
            UserId:filter.userId,
            PlanId:filter.planId,
            Status:filter.status,
            PlaceId:filter.placeId,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            console.log(data)
            SetTickets(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RenderModalAdd() {
        function addTicket(e) {
            e.preventDefault()
            ticket_add({Plan: {Id: e.target.Select_plan.value}, User: {Id: e.target.Select_user.value}})
                .then((data) => {
                    error.showError({message: "با موفقیت افزوده شد",});
                    SetOpenModalAdd(false);
                    getTickets();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        const promiseUserOptions = (inputValue) => {
            return new Promise((resolve) => {
                function getLabelOfUser(itm) {
                    return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant={"body2"}>{itm.Username}</Typography>
                        <Typography variant={"body2"}>{((itm.FullName) ? `(${itm.FullName})` : "")}</Typography>
                        <Typography variant={"body2"}>{itm.PhoneNumber}</Typography>
                    </Grid>)
                }

                user_query({
                    queryType: "SEARCH",
                    Username: inputValue,
                    FullName: inputValue,
                    PhoneNumber: inputValue,
                    paging: {Page: 0, Size: 50, Desc: true}
                }).then((data) => {
                    resolve(data.data.Data.content.map(itm => {
                        return {label: getLabelOfUser(itm), value: itm.Id}
                    }));
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
            });
        }
        const promisePlansOptions = (inputValue) => {
            return new Promise((resolve) => {
                Plans_query({
                    queryType: "SEARCH",
                    name:inputValue,
                    paging: {Page: 0, Size: 50, Desc: true}
                }).then((data) => {
                    resolve(data.data.Data.content.map(itm => {
                        return {label: itm.Name+" - "+itm.Place.Name, value: itm.Id}
                    }));
                }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
            });
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addTicket(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن بلیط "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Label for={"Select-user"}>کاربر</Label>
                            <AsyncSelect id={"Select-user"} cacheOptions defaultOptions
                                         name={"Select_user"}
                                         loadOptions={promiseUserOptions}/>
                            <Label for={"Select-plan"}>بلیط</Label>
                            <AsyncSelect id={"Select-plan"} cacheOptions defaultOptions
                                         name={"Select_plan"}
                                         loadOptions={promisePlansOptions}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => SetOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تیکت یا بلیط ، دسترسی کاربر برای دریافت خدماتی می باشد که خریداری می شود و مجموعه موضف به ارائه آن
                    خدمات می باشد</p>
                <p>کاربر با خرید بلیط شرایط و قوانین جیم پین و مراکز را می پذیرد.</p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="بلیط ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton aria-label="fingerprint"
                                        color={JSON.stringify(filter) == JSON.stringify(defaultFilterTicket) ? "default" : "secondary"}
                                        onClick={() => setOpenModalFilter(true)}>
                                <FilterAlt fontSize={"large"}/>
                            </IconButton>
                            <IconButton aria-label="fingerprint"
                                        color={"default"}
                                        onClick={(e) => SetOpenModalAdd(true)}>
                                <AddIcon fontSize={"large"}/>
                            </IconButton>
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
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">{getUserFixedName(row.User)}</TableCell>
                                            <TableCell align="right">{row.Plan.Place.Name || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.PlanName || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row.Price)}</TableCell>
                                            <TableCell
                                                align="right">{((new Date(row.ExpireDate)).getHours()==0&(new Date(row.ExpireDate)).getMinutes()==0)?new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }):new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell align="right">
                                            <Chip label={TicketStatus[row.Status]}
                                                  color={(row.Status.startsWith("ACTIVE")) ? "success" : "error"}/>
                                        </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(tickets.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={tickets.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
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
            <_ticketFilter filter={filter} setFilter={SetFilter} openModal={openModalFilter} setOpenModal={(e)=>setOpenModalFilter(e)}/>
            {RenderModalAdd()}
        </>
    );
};

export default TicketsManagement;
