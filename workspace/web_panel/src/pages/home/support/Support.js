import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import {useHistory} from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import {Support_getAll} from "../../../network/api/support.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";


const Support = () => {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [itemCount, setItemCount] = useState(0);
    const [SupportList, setSupportList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const history = useHistory();
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

    useEffect(() => {
        Support_getAll()
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
    }, [page, rowsPerPage, searchString]);

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">تیکت ها</Notice>
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
                                {SupportList.map((row, index) => {
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
                                            <TableCell align="right">{row.Messages[row.Messages.length-1].Status}</TableCell>
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
                        count={itemCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </Paper>
            </Box>
        </>
    );
};

export default Support;
