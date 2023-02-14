import React, {useEffect, useState} from 'react';
import {Button, TableCell, TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {placeOption_add, placeOption_delete, placeOption_getAll} from "../../../../network/api/placeOptions.api";
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

const PlaceOptions = () => {
    const [placeOptions, SetPlaceOptions] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    useEffect(() => {
        getPlaceOption()
    }, []);

    function getPlaceOption() {
        placeOption_getAll().then(data => {
            SetPlaceOptions(data.data.Data)
        }).catch(e => console.log(e))
    }


    function renderModalAdd() {
        function addOption(e) {
            e.preventDefault()
            placeOption_add({Name:e.target.formName.value})
                .then(data=>{
                    setOpenModalAdd(false)
                    getPlaceOption()
                }).catch(e=>console.log(e))
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
                    setItemToDelete(null)
                    getPlaceOption()
                }).catch(e=>console.log(e))
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e)=>DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن امکانات "}</Modal.Title>
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
                                    <TableCell align="left">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {placeOptions.map(row => (
                                    <TableRow key={row.Id}>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.Id}
                                        </TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="left"><Button variant={"contained"}
                                                                        color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        sx={{direction: "ltr"}}
                    />
                    {/*    count={itemCount}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={page}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                </Paper>
            </Box>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default PlaceOptions;
