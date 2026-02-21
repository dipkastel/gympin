import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, IconButton, TextField} from "@mui/material";
import {note_delete, note_query, note_update} from "../../../../network/api/note.api";
import {getRppPhoneBook, SetRppPhoneBook} from "../../../../helper/pocket/pocket";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName} from "../../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {DeleteOutline, Edit, Source} from "@mui/icons-material";
import PopoverUser from "../../../../components/popover/PopoverUser";

const _PhoneBook = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [phoneBook,setPhoneBook] = useState(null);
    const [itemToDelete,setItemToDelete] = useState(null);
    const [itemToEdit,setItemToEdit] = useState(null);
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
            return <PopoverUser user ={row.User} />;
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
    function renderModalEdit(){
        if(!itemToEdit) return ;
        function EditItem(e) {
            e.preventDefault()
            setItemToEdit(null);
            note_update({
                Id:itemToEdit.Id,
                Text:e.target.Name.value+ " : " + e.target.Phone.value
            })
                .then((result) => {
                    getData();
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e) => EditItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش تلفن "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                label="نام"
                                type={"text"}
                                fullWidth
                                name="Name"
                                margin="normal"
                                defaultValue={itemToEdit.Text.split(':')[0].trim()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="تلفن"
                                type={"text"}
                                name="Phone"
                                defaultValue={itemToEdit.Text.split(':')[1].trim()}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button sx={{m: 1}} variant={"contained"} color={"secondary"} type={"submit"}>
                                ویرایش
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
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {phoneBook?.content && phoneBook?.content?.map((row, index) => (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>

                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{row.Text}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{getSourceName(row)}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="right">{<PopoverUser user ={row.CreatorUser} />}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal"
                                                   align="left">
                                           <IconButton onClick={(event) => history.push({pathname: getSourceUrl(row)})} color={"secondary"} variant={"contained"}><Source /></IconButton>
                                            <IconButton onClick={()=>setItemToEdit(row)} color={"info"} variant={"contained"}><Edit /></IconButton>
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
                        rowsPerPage={parseInt(rowsPerPage)}
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
            {renderModalEdit()}
        </>
    );
};

export default _PhoneBook;
