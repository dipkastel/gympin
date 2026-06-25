import React, {useContext, useState} from 'react';
import {EditNote} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Form, Modal} from "react-bootstrap";
import {Support_updateMessage} from "../../../../network/api/support.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _EditSupportTicket = ({message,reloadList}) => {

    const error = useContext(ErrorContext);
    const [openModal,setOpenModal]= useState(false);
    const [inMessage,setInMessage]= useState(message.Message);


    function renderModalEdit() {
        function UpdateMessage(e) {
            e.preventDefault()
            Support_updateMessage({...message,Message:inMessage})
                .then((data) => {
                    reloadList();
                    setOpenModal(false);
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });

        }


        return (
            <>

                <Modal show={openModal} onHide={() => setOpenModal(false)}>

                    <Form onSubmit={(e) => UpdateMessage(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="formDescription">
                                <Form.Control
                                    as="textarea"
                                    name="formDescription"
                                    rows={3}
                                    placeholder="توضیحات"
                                    value={inMessage}
                                    onChange={(e)=>setInMessage(e.target.value)}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModal(false)}
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
                    </Form>

                </Modal>
            </>
        );
    }

    return (
        <>
            <EditNote sx={{m:0,cursor:"pointer"}} onClick={(e)=>setOpenModal(true)} />
            {renderModalEdit()}
        </>
    );
};

export default _EditSupportTicket;
