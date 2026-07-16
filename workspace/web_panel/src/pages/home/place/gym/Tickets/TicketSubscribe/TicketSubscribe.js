import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {TicketSubscribes_add, TicketSubscribes_getByPlace} from "../../../../../../network/api/TicketSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";

const TicketSubscribe = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeTicketSubscribes, SetPlaceTicketSubscribes] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    useEffect(() => {
        getTicketSubscribesOfPlace();
    }, []);

    function getTicketSubscribesOfPlace() {
        TicketSubscribes_getByPlace({Id: place.Id}).then(data => {
            SetPlaceTicketSubscribes(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {

        function addTicketSubscribe(e) {
            e.preventDefault()
            TicketSubscribes_add({Place: {Id: place.Id}, Name: e.target.Name.value, EntryTotalCount: 1})
                .then(data => {
                    setOpenModalAdd(false)
                    getTicketSubscribesOfPlace()
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
                    <form onSubmit={(e) => addTicketSubscribe(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن عضویت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام عضویت"
                                />
                                <Form.Text className="text-muted">
                                    عضویت مجموعه ای از خدمات است که کاربر برای آن ها هزینه پرداخت میکند
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


    return (
        <>
            <Portlet>
                <PortletHeader
                    title="عضویت ها"
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

                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">نام بلیط</TableCell>
                                <TableCell align="right">قیمت مرکز</TableCell>
                                <TableCell align="right">جنسیت</TableCell>
                                <TableCell align="left">عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {placeTicketSubscribes.map(row => (
                                <_PlaceSubscribeListItem place={place} subscribe={row} reloadList={getTicketSubscribesOfPlace} />
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default TicketSubscribe;
