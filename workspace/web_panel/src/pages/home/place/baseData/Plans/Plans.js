import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Plans_add, Plans_delete, Plans_getByPlaceId} from "../../../../../network/api/plans.api";

const Plans = ({place}) => {
    const [placePlans,SetPlacePlans] = useState([])
    const [openModalAdd,setOpenModalAdd] = useState(false)
    const [itemToDelete,setItemToDelete] = useState(null)
    useEffect(() => {
        getPlansOpPlace();
    }, []);
    function getPlansOpPlace(){
        Plans_getByPlaceId({Id:place.Id}).then(data=>{
            SetPlacePlans(data.data.Data);
        }).catch(e=>console.log(e))
    }

    function renderModalAdd() {

        function addOption(e) {
            e.preventDefault()
            Plans_add({Place:{Id:place.Id},Name:e.target.Name.value,EntryTotalCount:1})
                .then(data=>{
                    setOpenModalAdd(false)
                    getPlansOpPlace()
                }).catch(e=>console.log(e))
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e)=>addOption(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن پلن "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام پلن"
                                />
                                <Form.Text className="text-muted">
                                    پلن مجموعه ای از خدمات است که کاربر برای آن ها هزینه پرداخت میکند
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
            Plans_delete({Id:itemToDelete.Id})
                .then(data=>{
                    setItemToDelete(null)
                    getPlansOpPlace()
                }).catch(e=>console.log(e))
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e)=>DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف پلن"}</Modal.Title>
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
            <Portlet>
                <PortletHeader
                    title="پلن ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) =>setOpenModalAdd(true)}
                            >
                                <AddIcon />
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
                            {placePlans.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"} size={"small"} color={"primary"} href={"/place/plan/"+row.Id }>جزئیات</Button>
                                        <Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button>
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

export default Plans;
