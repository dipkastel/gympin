import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {gates_add, gates_delete, gates_getByPlaceId} from "../../../../../network/api/gates.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const Gates = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeGates, SetPlaceGates] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getGatesOfPlace();
    }, []);

    function getGatesOfPlace() {
        gates_getByPlaceId({Id: place.Id}).then(data => {
            SetPlaceGates(data.data.Data);
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
            gates_add({Place: {Id: place.Id}, Name: e.target.Name.value})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setOpenModalAdd(false)
                    getGatesOfPlace()
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
                    <form onSubmit={(e) => addOption(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن گیت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام گیت"
                                />
                                <Form.Text className="text-muted">
                                    گیت را میتوان خدمات قابل ارائه به کاربر در زمان های مشخص نیز بیان کرد اما دید کلی
                                    ورودی های متفاوت برای کاربرد های مختلف است
                                </Form.Text>
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
            gates_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getGatesOfPlace()
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
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف گیت"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Name}
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
                    title="گیت ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">name</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placeGates.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"primary"}
                                                href={"/place/gate/" + row.Id}>جزئیات</Button>
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"error"}
                                                onClick={(e) => setItemToDelete(row)}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default Gates;
