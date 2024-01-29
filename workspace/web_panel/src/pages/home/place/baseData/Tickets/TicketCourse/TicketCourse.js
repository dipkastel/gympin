import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {
    TicketCourses_add,
    TicketCourses_delete,
    TicketCourses_getByPlaceId
} from "../../../../../../network/api/ticketCourses.api";
import {Form, Modal} from "react-bootstrap";

const TicketCourse = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeTicketCourses,SetPlaceTicketCourses] = useState([])
    const [openModalAdd,setOpenModalAdd] = useState(false)
    const [itemToDelete,setItemToDelete] = useState(null)
    useEffect(() => {
        getTicketCoursesOfPlace();
    }, []);
    function getTicketCoursesOfPlace(){
        TicketCourses_getByPlaceId({Id:place.Id}).then(data=>{
            SetPlaceTicketCourses(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {

        function addTicketCourses(e) {
            e.preventDefault()
            TicketCourses_add({Place:{Id:place.Id},Name:e.target.Name.value,EntryTotalCount:1})
                .then(data=>{
                    setOpenModalAdd(false)
                    getTicketCoursesOfPlace()
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
                    <form onSubmit={(e)=>addTicketCourses(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن کلاس "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام کلاس"
                                />
                                <Form.Text className="text-muted">
                                    کلاس دارای مربی و زمان شروع و پایان است.
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
            TicketCourses_delete({Id:itemToDelete.Id})
                .then(data=>{
                    setItemToDelete(null)
                    getTicketCoursesOfPlace()
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
                            <Modal.Title>{"حذف کلاس"}</Modal.Title>
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
                    title="کلاس ها"
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
                            {placeTicketCourses.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left">
                                        <Button variant={"contained"} size={"small"} color={"primary"} href={"/place/ticketCourse/"+row.Id }>جزئیات</Button>
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

export default TicketCourse;
