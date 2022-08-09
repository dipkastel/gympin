import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField
} from "@mui/material";

const _AddPersonel = () => {
    const [open, setOpen] = React.useState(false);

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن فرد جدید</Button>
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function ModalAddPerson() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدبد شماره همراه و دسترسی هارا وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="شماره موبایل"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت پرسنل"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مشاهده گزارشات"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه بدنسازی"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه تکواندو"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه پیلاتس"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه استخر"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه ایروبیک"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه trx"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت مالی"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت ترافیک"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درباره"/>
                            <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت کاربران"/>
                        </FormGroup>
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
                    title={"افزودن پرسنل"}
                    action={renderAddButton()}/>
            </Card>
            {ModalAddPerson()}
        </>
    );
};
export default _AddPersonel;
