import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Chip} from "@mui/material";
import {Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {Purchased_query} from "../../../../network/api/purchased.api";
import {BuyableType} from "../../../../helper/enums/BuyableType";
import {genders} from "../../../../helper/enums/genders";

const PurchasedAllManagement = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [purchased, SetPurchased] = useState([]);

    useEffect(() => {
        getSubscribes()
    }, [page, rowsPerPage]);

    function getSubscribes() {
        Purchased_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetPurchased(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function toPage(event, row) {
        event.preventDefault();
        switch (row.PurchasedType) {
            case "SUBSCRIBE":{
                history.push({pathname: "subscribe/data/" + row.Id});
            }
            case "COURSE":{
                history.push({pathname: "course/data/" + row.Id});
            }
        }

    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="خرید ها"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مرکز</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>عضویت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>جنسیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {purchased.content && purchased.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => toPage(event,row)} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.Id}</TableCell>
                                            <TableCell align="right"><Chip label={BuyableType[row.PurchasedType]} color={"primary"}/></TableCell>
                                            <TableCell align="right">{getUserFixedName(row.Customer)}</TableCell>
                                            <TableCell align="right">{row?.Place?.Name || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{row.Name || "ثبت نشده"}</TableCell>
                                            <TableCell align="right">{toPriceWithComma(row.SellPrice)}</TableCell>
                                            <TableCell align="right">{genders[row.Gender]}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(purchased.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={purchased.totalElements || 0}
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
        </>
    );
};

export default PurchasedAllManagement;
