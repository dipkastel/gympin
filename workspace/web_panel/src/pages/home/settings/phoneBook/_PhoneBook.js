import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, FormGroup, TextField, Typography} from "@mui/material";
import {note_query} from "../../../../network/api/note.api";
import {getRppDashNote, getRppPhoneBook, SetRppDashNote, SetRppPhoneBook} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";

const _PhoneBook = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [phoneBook,setPhoneBook] = useState(null);
    const [itemToDelete,setItemToDelete] = useState(null);
    const [searchStringName,setSearchStringName] = useState("");
    const [searchStringPlace,setSearchStringPlace] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppPhoneBook());

    useEffect(() => {
        getData();
    }, [page,rowsPerPage,searchStringName,searchStringPlace]);



    function getData(){
        note_query({
            queryType: "FILTER",
            Type: "CONTACT",
            Text:searchStringName||null,
            Place:searchStringPlace||null,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then(result => {
            setPhoneBook(result.data.Data);
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
                    title="دفترچه تلفن"
                    toolbar={
                        <PortletHeaderToolbar>
                            <TextField
                                fullWidth
                                id="outlined-adornment-password"
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={searchStringName}
                                onChange={(event) => {
                                    setSearchStringName(event.target.value);
                                    setPage(0);
                                }}
                                label={"جستجو نام"}
                            />
                            <TextField
                                fullWidth
                                id="outlined-adornment-password"
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={searchStringPlace}
                                onChange={(event) => {
                                    setSearchStringPlace(event.target.value);
                                    setPage(0);
                                }}
                                label={"جستجو مجموعه"}
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>متن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>منبع</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد
                                        کننده</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {phoneBook?.content && phoneBook?.content?.map((row, index) => (
                                    <TableRow hover onClick={(event) => history.push({pathname: getSourceUrl(row)})}
                                              role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Text}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getSourceName(row)}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getUserFixedName(row.CreatorUser)}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right"><FormGroup><Button onClick={()=>setItemToDelete(row)} color={"error"} variant={"contained"}>حذف</Button> </FormGroup></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(phoneBook?.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={phoneBook.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppPhoneBook(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}

                </PortletBody>
            </Portlet>
            {/*{RenderModalDelete()}*/}
        </>
    );
};

export default _PhoneBook;
