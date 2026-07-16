import React, {useContext, useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button, TableCell} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import _CounselingAppointmentListItem from "./_CounselingAppointmentListItem";
import {TicketAppointments_add, TicketAppointments_getByCounseling} from "../../../../../../network/api/TicketAppointments.api";

const TicketAppointment = ({counseling}) => {
    const error = useContext(ErrorContext);
    const [counselingTicketAppointment, SetCounselingTicketAppointment] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    useEffect(() => {
        getTicketAppointmentOfCounseling();
    }, []);

    function getTicketAppointmentOfCounseling() {
        TicketAppointments_getByCounseling({Id: counseling.Id}).then(data => {
            SetCounselingTicketAppointment(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function renderModalAdd() {

        function addTicketAppointment(e) {
            e.preventDefault()
            TicketAppointments_add({Counseling: {Id: counseling.Id}, Name: e.target.Name.value, EntryTotalCount: 1})
                .then(data => {
                    setOpenModalAdd(false)
                    getTicketAppointmentOfCounseling()
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
                    <form onSubmit={(e) => addTicketAppointment(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن نوبت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formCounselingName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    counselingholder="نام عضویت"
                                />
                                <Form.Text className="text-muted">
                                    نام خدمات مشاوره‌ای که گویای نوع خدمات می باشد. ( 45 دقیقه مشاوره آنلاین )
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
                    title="مدیریت نوبت ها"
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
                                <TableCell align="right">نام نوبت</TableCell>
                                <TableCell align="right">قیمت مرکز</TableCell>
                                <TableCell align="right">جنسیت</TableCell>
                                <TableCell align="left">عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {counselingTicketAppointment.map(row => (
                                <_CounselingAppointmentListItem counseling={counseling} appointment={row} reloadList={getTicketAppointmentOfCounseling} />
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default TicketAppointment;
