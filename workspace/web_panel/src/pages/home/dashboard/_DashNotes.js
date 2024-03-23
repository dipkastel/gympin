import React, {useContext, useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {note_query} from "../../../network/api/note.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {getUserFixedName} from "../../../helper";

const _DashNotes = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [note, setNotes] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getNotes()
    }, [page,rowsPerPage]);

    function getNotes() {
        note_query({
            queryType: "FILTER",
            Type: "NOTE",
            IsToDo: true,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then(result => {
            setNotes(result.data.Data);
            console.log(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getSourceUrl(row) {
        if (row.Corporate)
            return "/corporate/details/" + row.Corporate.Id;
        if (row.Place)
            return "/place/data/"+row.Place.Id;
        if (row.User)
            return "/users/details/"+row.User.Id;
        return "/";

    }

    function getSourceName(row) {
        if (row.Corporate)
            return "سازمان ◄ " + row.Corporate.Name;
        if (row.Place)
            return "مرکز ◄ " + row.Place.Name;
        if (row.User)
            return "کاربر ◄ " + getUserFixedName(row.User);
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title="یادداشت های قابل انجام"
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>متن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>منبع</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد
                                        کننده</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {note.content && note.content.map((row, index) => (
                                    <TableRow hover onClick={(event) => history.push({pathname: getSourceUrl(row)})}
                                              role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Text}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getSourceName(row)}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getUserFixedName(row.CreatorUser)}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(note.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={note.totalElements || 0}
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

export default _DashNotes;
