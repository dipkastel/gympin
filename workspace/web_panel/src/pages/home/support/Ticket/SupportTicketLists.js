import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Chip} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import {getRppSupport, SetRppSupport} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Support_query} from "../../../../network/api/support.api";

const SupportTicketLists = () => {


    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppSupport());
    const [itemCount, setItemCount] = useState(0);
    const [SupportList, setSupportList] = useState([]);
    const history = useHistory();
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

    useEffect(() => {
        Support_query({
            queryType: "FILTER",
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        })
            .then((data) => {
                setSupportList(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [page, rowsPerPage]);

    return (
        <>
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <Toolbar>
                        <Typography
                            sx={{flex: "1 1 100%"}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            تیکت ها
                        </Typography>
                    </Toolbar>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >
                            <TableHead>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">Owner</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableHead>
                            <TableBody>
                                {SupportList.content&&SupportList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => {
                                                history.push({
                                                    pathname: "/support/details/" + row.Id
                                                });
                                            }}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.Id.toString()}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                align="right"
                                            >
                                                {row.Id}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.Place&&"مجموعه : "+row.Place.Name}
                                                {row.User&&"کاربر : "+row.User.Username}
                                            </TableCell>
                                            <TableCell align="right">{row.Title}</TableCell>
                                            <TableCell align="right">

                                                <Chip
                                                    label={row?.Status}
                                                    color={(row?.Status?.startsWith("AWAITING"))?"error":"success"} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        sx={{direction: "ltr"}}
                        count={SupportList.totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppSupport(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </Paper>
            </Box>
        </>
    );
};

export default SupportTicketLists;
