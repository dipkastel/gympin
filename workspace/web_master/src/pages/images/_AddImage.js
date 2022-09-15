import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Input,
    TextField
} from "@mui/material";

const _AddImage = () => {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function ModalAddImage() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن تصویر</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن تصویر جدید نام آن را وارد کنید
                            <br/>
                            مثال : درب ورودی
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام تصویر"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <Input
                            accept="image/*"
                            className={"input"}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" className={"button"}>
                                انتخاب تصویر
                            </Button>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>ثبت</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت تصاویر"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن
                        تصویر</Button>}/>
            </Card>
            {ModalAddImage()}
        </>
    )
};

export default _AddImage;
