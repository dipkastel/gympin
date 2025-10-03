import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Button, FormControl, FormLabel, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../../../../../network/api/placePersonnel.api";
import {getUserFixedName} from "../../../../../../helper";
import {
    TicketSubscribes_addCoach,
    TicketSubscribes_deleteCoach,
    TicketSubscribes_getTicketSubscribeCoaches
} from "../../../../../../network/api/ticketSubscribes.api";

const TicketSubscribeCoaches = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const [ticketSubscribeCoaches, SetTicketSubscribeCoaches] = useState([])
    const [placePersonnel, SetPlacePersonnel] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    useEffect(() => {
        getPlacePersonnel();
    }, []);

    function getTicketSubscribeCoaches() {
        TicketSubscribes_getTicketSubscribeCoaches({ticketId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribeCoaches(data.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    function getPlacePersonnel() {
        placePersonnel_ByPlace({Id: ticketSubscribe.Place.Id}).then(data => {
            SetPlacePersonnel(data.data.Data);
            getTicketSubscribeCoaches();
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }


    function renderModalAdd() {
        function addCoach(e,item) {
            e.preventDefault()

            TicketSubscribes_addCoach({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceCoach:{Id:item.User.Id}})
                .then(data => {
                    setOpenModalAdd(false)
                    getTicketSubscribeCoaches()
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
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن مربی به عضویت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">مربیان این مجموعه</FormLabel>
                                {placePersonnel.filter(pp=>pp.UserRole.includes("PLACE_COACH")).map(item=>(
                                    <Button variant={"contained"} sx={{m:1}} key={item.Id} onClick={(e)=>addCoach(e,item)}>{getUserFixedName(item.User)}</Button>
                                ))}
                            </FormControl>

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
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            TicketSubscribes_deleteCoach({TicketSubscribe:{Id: ticketSubscribe.Id},PlaceCoach:{Id:itemToDelete.Id}})
                .then(data => {
                    setItemToDelete(null)
                    getTicketSubscribeCoaches()
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
                            <Modal.Title>{"حذف مربی"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && "حذف " + getUserFixedName(itemToDelete)}
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
                    title={"مربی های "+ticketSubscribe.Name}
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
                            {ticketSubscribeCoaches.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{getUserFixedName(row)}</TableCell>
                                    <TableCell align="left">
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

export default TicketSubscribeCoaches;
