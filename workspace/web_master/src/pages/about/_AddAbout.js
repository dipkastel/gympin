import React, {useContext, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {PlaceAbout_add} from "../../network/api/placeAbout.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _AddAbout = ({renewList,place}) => {

    const error = useContext(ErrorContext);
    const [openDialogAdd, SetOpenDialogAdd] = useState(false);

    function RenderModalAdd() {

        function addAbout(e) {
            e.preventDefault()
            PlaceAbout_add({
                Name: e.target.title.value,
                acceptable: false,
                active: true,
                description: "",
                place: {Id: place.Id}
            }).then(result => {
                SetOpenDialogAdd(false)
                e.target.title.value = "";
                renewList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={openDialogAdd} onClose={() => SetOpenDialogAdd(false)}>
                    <Form onSubmit={(e) => addAbout(e)}>
                        <DialogTitle>افزودن قوانین یا اطلاعات</DialogTitle>
                        <DialogContent>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                یک تیتر یا موضوع برای قوانین یا اطلاعات وارد نمایید . مثلا : قوانین استفاده از مجموعه یا راهای تماس با ما.
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                در ادامه میتوانید متن کامل را برای اطلاعات یا قوانین خود وارد نمایید
                            </Typography>
                            <Typography color={"#a2a2a2"} variant={"subtitle2"}>
                                همچنین در ادامه میتوانید انتخاب کنید کاربر برای خرید بلیط باید این قوانین را بپذیرد یا این اطلاعات فقط برای
                                اطلاع رسانی وارد شده.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="title"
                                label="موضوع یا تیتر"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => SetOpenDialogAdd(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }



    return (
        <div>
            <Button variant={"outlined"} title={"btn_add"} onClick={() => SetOpenDialogAdd(true)}>افزودن</Button>
            {RenderModalAdd()}
        </div>
    );
};

export default _AddAbout;
