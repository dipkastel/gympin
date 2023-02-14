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


const PlaceAbout = ({place}) => {
    const [placeAbouts, SetPlaceAbouts] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [itemToEdit, setItemToEdit] = useState(null)
    useEffect(() => {
        getAboutsOfPlace();
    }, []);

    function getAboutsOfPlace() {
        placeAbout_getByPlace({Id: place.Id}).then(data => {
            SetPlaceAbouts(data.data.Data);
        }).catch(e => console.log(e))
    }


    function renderModalAdd() {
        var newAboutItem={
            Place: {Id: place.Id},
            Name: "",
            Acceptable: false,
            Active: false,
            Description: ""};
        function addAbout(e) {
            e.preventDefault()
            placeAbout_add(newAboutItem)
                .then(data => {
                    setOpenModalAdd(false)
                    getAboutsOfPlace()
                }).catch(e => console.log(e))
        }

        function setFormValues(lable,Value){
            newAboutItem = {...newAboutItem,[lable]:Value}
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addAbout(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن قوانین - اطلاعات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>نام</Form.Label>
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام"
                                    onChange={(e)=>setFormValues("Name",e.target.value)}
                                />
                            </Form.Group>

                            <FormGroup>

                                <FormLabel component="legend">وضعیت :</FormLabel>
                                <FormControlLabel
                                    control={<Switch
                                        defaultChecked={newAboutItem.Active}
                                        onChange={(e)=>setFormValues('Active',e.target.checked)} />}
                                    label="فعال"
                                />
                            </FormGroup>


                            <FormGroup>

                                <FormLabel component="legend">آیا باید توسط کاربر قبل از خرید بلیط تایید شود؟</FormLabel>
                                <FormControlLabel
                                    control={<Switch
                                        defaultChecked={newAboutItem.Acceptable}
                                        onChange={(e)=>setFormValues('Acceptable',e.target.checked)}/>}
                                    label="بله"
                                />
                            </FormGroup>

                            <Form.Group controlId="formAddress">
                                <Form.Label>متن</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="exampleTextarea"
                                    rows="3"
                                    onChange={(e)=>setFormValues("Description",e.target.value)}
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
                                onClick={e=>addAbout(e)}
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
            placeAbout_update(itemToEdit)
                .then(data => {
                    setItemToEdit(null)
                    getAboutsOfPlace()
                }).catch(e => console.log(e))
        }

        function setFormValues(lable,Value){
            setItemToEdit({...itemToEdit,[lable]:Value})
        }

        return (
            <>

                <Modal show={itemToEdit!=null} onHide={() => setItemToEdit(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش قوانین - اطلاعات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>نام</Form.Label>
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام"
                                    value={itemToEdit.Name}
                                    onChange={(e)=>setFormValues("Name",e.target.value)}
                                />
                            </Form.Group>

                            <FormGroup>

                                <FormLabel component="legend">وضعیت :</FormLabel>
                                <FormControlLabel
                                    control={<Switch
                                        defaultChecked={itemToEdit.Active}
                                        onChange={(e)=>setFormValues('Active',e.target.checked)} />}
                                    label="فعال"
                                />
                            </FormGroup>


                            <FormGroup>

                                <FormLabel component="legend">آیا باید توسط کاربر قبل از خرید بلیط تایید شود؟</FormLabel>
                                <FormControlLabel
                                    control={<Switch
                                        defaultChecked={itemToEdit.Acceptable}
                                        onChange={(e)=>setFormValues('Acceptable',e.target.checked)}/>}
                                    label="بله"
                                />
                            </FormGroup>

                            <Form.Group controlId="formAddress">
                                <Form.Label>متن</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="exampleTextarea"
                                    rows="3"
                                    value={itemToEdit.Description}
                                    onChange={(e)=>setFormValues("Description",e.target.value)}
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
            placeAbout_delete({Id: itemToDelete.Id})
                .then(data => {
                    setItemToDelete(null)
                    getAboutsOfPlace()
                }).catch(e => console.log(e))
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف قوانین - اطلاعات "}</Modal.Title>
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
                    title="قوانین و اطلاعات"
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
                            {placeAbouts.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
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

export default PlaceAbout;
