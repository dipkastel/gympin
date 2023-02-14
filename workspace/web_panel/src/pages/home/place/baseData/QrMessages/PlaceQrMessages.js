import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
    placeAbout_add,
    placeAbout_delete,
    placeAbout_getByPlace,
    placeAbout_update
} from "../../../../../network/api/placeAbout.api";
import {
    placeQrMessages_add,
    placeQrMessages_delete,
    placeQrMessages_getByPlace,
    placeQrMessages_update
} from "../../../../../network/api/placeQrMessages.api";


const PlaceQrMessages = ({place}) => {
    const [placeQrMessages, SetPlaceQrMessages] = useState([])
    const [itemToDelete, setItemToDelete] = useState(null)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [newAboutItem, setNewAboutItem] = useState(null)
    useEffect(() => {
        getQrMessagesOfPlace();
    }, []);

    function getQrMessagesOfPlace() {
        placeQrMessages_getByPlace({Id: place.Id}).then(data => {
            SetPlaceQrMessages(data.data.Data);
        }).catch(e => console.log(e))
    }


    function renderModalAdd() {

        function addQrMessage(e) {
            e.preventDefault()
            placeQrMessages_add(newAboutItem)
                .then(data => {
                    setNewAboutItem(null)
                    getQrMessagesOfPlace()
                }).catch(e => console.log(e))
        }

        function setFormValues(lable,Value){
            setNewAboutItem({...newAboutItem,[lable]:Value})
        }

        return (
            <>
                <Modal show={newAboutItem!=null} onHide={() => setNewAboutItem(null)}>
                    <form onSubmit={(e) => addQrMessage(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن یادداشت جایگزین qr "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>متن</Form.Label>
                                <Form.Control
                                    name="Text"
                                    type="text"
                                    placeholder="متن"
                                    onChange={(e)=>setFormValues("Text",e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>جایگزین</Form.Label>
                                <Form.Control
                                    name="ReplaceText"
                                    type="text"
                                    placeholder="جایگزین"
                                    onChange={(e)=>setFormValues("ReplaceText",e.target.value)}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setNewAboutItem(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                onClick={(e)=>addQrMessage(e)}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalEdit() {
        function UpdateAbout(e) {
            e.preventDefault()
            placeQrMessages_update(itemToEdit)
                .then(data => {
                    setItemToEdit(null)
                    getQrMessagesOfPlace()
                }).catch(e => console.log(e))
        }

        function setFormValues(lable,Value){
            setItemToEdit({...itemToEdit,[lable]:Value})
        }

        return (
            <>

                <Modal show={itemToEdit!=null} onHide={() => setItemToEdit(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش یادداشت جایگزین qr"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group>
                                <Form.Label>متن</Form.Label>
                                <Form.Control
                                    name="Text"
                                    type="text"
                                    placeholder="متن"
                                    value={itemToEdit.Text}
                                    onChange={(e)=>setFormValues("Text",e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>جایگزین</Form.Label>
                                <Form.Control
                                    name="ReplaceText"
                                    type="text"
                                    placeholder="جایگزین"
                                    value={itemToEdit.ReplaceText}
                                    onChange={(e)=>setFormValues("ReplaceText",e.target.value)}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToEdit(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                onClick={e=>UpdateAbout(e)}
                            >
                                ویرایش
                            </Button>
                        </Modal.Footer>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            console.log(itemToDelete)
            placeQrMessages_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getQrMessagesOfPlace()
                }).catch(e => console.log(e))
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف یادداشت جایگزین qr"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + itemToDelete.Text}
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
                    title="یادداشت جایگزین qr"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setNewAboutItem({Place: {Id: place.Id}})}
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
                                <TableCell align="right">متن</TableCell>
                                <TableCell align="right">جایگزین</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placeQrMessages.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Text}</TableCell>
                                    <TableCell align="right">{row.ReplaceText}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"}
                                                size={"small"}
                                                color={"primary"}
                                                onClick={(e) => setItemToEdit(row)}>ویرایش</Button>
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
            {itemToEdit&&renderModalEdit()}
            {itemToDelete&&renderModalDelete()}
        </>
    );
};

export default PlaceQrMessages;
