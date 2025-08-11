import React, {useContext, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, TextField,} from "@mui/material";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router";
import {Support_add} from "../../network/api/support.api";

const _SupportNew = () => {
    const catering = useSelector(({catering}) => catering.catering);
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [text, setText] = useState("");

    function renderModalAdd() {
        const addSupport = (e) => {
            e.preventDefault();
            if (e.target.Title.value.length > 30) {
                error.showError({message: "موضوع طولانی است"});
                return;
            }
            if (e.target.Message.value.length > 250) {
                error.showError({message: "متن تیکت طولانی است"});
                return;
            }
            if (e.target.Title.value.length < 1) {
                error.showError({message: "موضوع الزامی است"});
                return;
            }
            if (e.target.Message.value.length < 1) {
                error.showError({message: "متن تیکت الزامی است"});
                return;
            }
            e.target.btnSubmit.setAttribute("disabled", true);
            e.target.Message.setAttribute("disabled", true);
            e.target.Title.setAttribute("disabled", true);
            Support_add({
                Title: e.target.Title.value,
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: e.target.Message.value,
                    IsRead: "true",
                },
                PlaceId: catering.Id,
            })
                .then((result) => {
                    navigate("/Support/detail/" + result.data.Data.Id, {
                        replace: false,
                    });
                })
                .catch((e) => {
                    try {
                        error.showError({message: e.response.data.Message});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص"});
                    }
                });
        };

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <DialogTitle>افزودن درخواست پشتیبانی جدید</DialogTitle>
                <DialogContent>
                    <Form onSubmit={(e) => addSupport(e)}>
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
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            minRows={3}
                            sx={{mb: 2}}
                            variant={"outlined"}
                            helperText={text.length > 249 ? text.length * -1 : ""}
                            slotProps={{formHelperText: {sx: {color: "primary.main"}}}}
                        />
                        <Button
                            variant={"contained"}
                            fullWidth
                            name={"btnSubmit"}
                            type={"submit"}
                        >
                            ایجاد پشتیبانی جدید
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            <Button onClick={() => setOpenModalAdd(true)} variant={"contained"}>
                درخواست‌ پشتیبانی جدید
            </Button>
            {renderModalAdd()}
        </>
    );
};

export default _SupportNew;
