import React, {useContext, useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import {Button, IconButton, TextField} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import __SelectUser from "../../../partials/selector/__SelectUser";
import {Support_add} from "../../../../network/api/support.api";

const _AddSupportTicket = ({reloadList}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd,setOpenModalAdd] = useState(false)
    const [selectedUser,setSelectedUser] = useState(null)


    function renderModalAdd() {
        function addTicket(e) {
            e.preventDefault()
            setOpenModalAdd(false);

            Support_add({
                Title: e.target.Title.value,
                Status: "AWAITING_USER",
                Message: {
                    Message: e.target.Message.value,
                    IsRead: "false"
                },
                UserId: selectedUser.value
            }).then(result => {
                reloadList()
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
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addTicket(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ایحاد تیکت برای کاربر"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <__SelectUser onChange={(e)=>setSelectedUser(e)} hidden={false} />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="موضوع"
                                type="text"
                                name={"Title"}
                                fullWidth
                                variant={"outlined"}
                            />
                            <TextField
                                margin="dense"
                                label="متن تیکت"
                                type="text"
                                name={"Message"}
                                fullWidth
                                multiline
                                minRows={3}
                                sx={{mb: 2}}
                                variant={"outlined"}
                            />

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
                    </Form>
                </Modal>
            </>
        );
    }


    return (
        <>
            <IconButton onClick={(e) => setOpenModalAdd(true)}>
                <AddIcon/>
            </IconButton>
            {renderModalAdd()}
        </>
    );
};

export default _AddSupportTicket;
