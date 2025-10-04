import React, {useContext, useEffect, useState} from 'react';
import {Button, TableCell, TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {placeOption_add, placeOption_delete, placeOption_query, placeOption_update} from "../../../../network/api/placeOptions.api";
import Notice from "../../../partials/content/Notice";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import {Form, Modal} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {getRppPlaceOptionManagement, SetRppPlaceOptionManagement} from "../../../../helper/pocket/pocket";

const PlaceOptions = () => {
    const error = useContext(ErrorContext);
    const [placeOptions, SetPlaceOptions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppPlaceOptionManagement());
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    useEffect(() => {
        getPlaceOption()
    }, [page, rowsPerPage]);

    function getPlaceOption() {
        placeOption_query({
            queryType: "SEARCH",
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then(data => {
            SetPlaceOptions(data.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }


    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            placeOption_add({Name:e.target.formName.value,Weight:e.target.formWeight.value})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setOpenModalAdd(false)
                    getPlaceOption()
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e)=>addOption(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن امکانات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>



                            <Form.Group controlId="formOptionName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    placeholder="نام امکانات"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    min="0"
                                    max="10"
                                    name={"formWeight"}
                                    placeholder="وزن"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
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
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            placeOption_delete({Id:itemToDelete.Id})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getPlaceOption()
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
                            <Modal.Title>{"حذف امکانات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete&&"حذف "+itemToDelete.Name}
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
        function EditOption(e) {
            e.preventDefault()
            placeOption_update({Id:itemToEdit.Id,Name:e.target.formName.value,Weight:e.target.formWeight.value})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setItemToEdit(null)
                    getPlaceOption()
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
                <Modal show={itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e)=>EditOption(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش "+itemToEdit.Name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>



                            <Form.Group controlId="formOptionName">
                                <Form.Control
                                    name="formName"
                                    type="text"
                                    value={itemToEdit.Name}
                                    placeholder="نام امکانات"
                                    onChange={(e)=>setItemToEdit({...itemToEdit,Name:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    min="0"
                                    max="10"
                                    value={itemToEdit.Weight}
                                    name={"formWeight"}
                                    placeholder="وزن"
                                    onChange={(e)=>setItemToEdit({...itemToEdit,Weight:e.target.value})}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToEdit(null)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
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
            <Notice icon="flaticon-warning kt-font-primary">مدیریت امکانات قابل ارائه در مراکز</Notice>

            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    <Toolbar>
                        <Typography
                            sx={{flex: "1 1 100%"}}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            امکانات
                        </Typography>
                        <Tooltip title="Filter list">
                            <IconButton>
                                <AddIcon onClick={() => setOpenModalAdd(true)}/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <TableContainer>
                        <Table className={"table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">id</TableCell>
                                    <TableCell align="right">name</TableCell>
                                    <TableCell align="right">weight</TableCell>
                                    <TableCell align="left">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {placeOptions&&placeOptions.content&&placeOptions.content.map(row => (
                                    <TableRow key={row.Id}>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.Id}
                                        </TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right">{row.Weight}</TableCell>
                                        <TableCell align="left">
                                            <Button variant={"contained"} color={"primary"} onClick={(e)=>setItemToEdit(row)}>ویرایش</Button>
                                            <Button variant={"contained"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {placeOptions&&(placeOptions.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={placeOptions.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppPlaceOptionManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </Paper>
            </Box>
            {renderModalAdd()}
            {renderModalEdit()}
            {renderModalDelete()}
        </>
    );
};

export default PlaceOptions;
