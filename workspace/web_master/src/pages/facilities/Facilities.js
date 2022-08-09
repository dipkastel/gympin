import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import _FacilitiesItem from "./_FacilitiesItem";

const Facilities  = () => {
    const [open, setOpen] = React.useState(false);
    function renderAddButton(){
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن امکانات</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalAddFacility(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن امکانات</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن امکانات جدید نام را وارد کنید
                            <br/>
                            مثال : کمد (لاکر)
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام امکانات"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
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
                    title={"مدیریت امکانات"}
                    action={renderAddButton()}/>
            </Card>
            <_FacilitiesItem name={"کمد(لاکر)"}/>
            <_FacilitiesItem name={"دوش"}/>
            <_FacilitiesItem name={"سشوار"}/>

            {ModalAddFacility()}
        </>

    );
};
export default Facilities;
