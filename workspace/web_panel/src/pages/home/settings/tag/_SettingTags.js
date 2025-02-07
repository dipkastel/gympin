import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {getRppPhoneBook, SetRppPhoneBook} from "../../../../helper/pocket/pocket";
import {note_delete, note_query, note_update} from "../../../../network/api/note.api";
import {getUserFixedName} from "../../../../helper";
import {Modal, Table} from "react-bootstrap";
import {Button, IconButton, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {DeleteOutline, Edit, Source} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import {tag_query} from "../../../../network/api/Tags.api";

const _SettingTags = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [phoneBook,setPhoneBook] = useState(null);
    const [itemToDelete,setItemToDelete] = useState(null);
    const [searchStringName,setSearchStringName] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppPhoneBook());

    useEffect(() => {
        getData();
    }, [page,rowsPerPage,searchStringName]);



    function getData(){
        tag_query({
            queryType: "FILTER",
            Name:searchStringName||null,
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




    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            note_delete({Id:itemToDelete.Id})
                .then(data=>{
                    setItemToDelete(null)
                    getData();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e)=>DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف تلفن"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete&&"حذف "+itemToDelete.Text}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
    return (
        <>

            <Portlet>
                <PortletHeader
                    title="تگ ها"
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
                                label={"جستجو تگ"}
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تگ</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>اولویت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>زمان ایجاد</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد کننده</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تعداد مجموعه</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {phoneBook?.content && phoneBook?.content?.map((row, index) => (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>

                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Id}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Name}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Priority}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.TagType}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getUserFixedName(row.CreatorUser)}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.PlaceCount}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="left">
                                            <IconButton onClick={()=>setItemToDelete(row)} color={"error"} variant={"contained"}><DeleteOutline /></IconButton>
                                        </TableCell>

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
            {renderModalDelete()}
        </>
    );
};
export default _SettingTags;
