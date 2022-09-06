import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel, FormGroup, Switch, TextField,
    Typography
} from "@mui/material";
import _GatePrice from "./_GatePrice";

const Gate = () => {
    const [open, setOpen] = React.useState(false);

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن پلن ها</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalAddPlan(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن پلن جدید نام پلن را وارد کنید
                            <br/>
                            مثال : عضویت 12 جلسه در ماه
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام پلن"
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
                    sx={{paddingBottom: 0}}
                    title={"مدیریت پلن ها"}
                    action={renderAddButton()}/>
                <CardContent sx={{margin: 0}}>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        بدنسازی
                    </Typography>
                    <br/>
                    <Typography
                        sx={{display: 'inline', margin: 2}}
                        component="P"
                        variant="caption"
                        color="text.primary"
                    >
                        توجه داشته باشید قیمت ها هر ساعت 24:00 در سیستم بروز میشود
                    </Typography>
                </CardContent>
            </Card>
            <_GatePrice name={"تک جلسه"}/>
            <_GatePrice name={"8 جلسه در ماه"}/>
            <_GatePrice name={"12 جلسه در ماه"}/>
            <_GatePrice name={"16 جلسه در ماه"}/>
            {ModalAddPlan()}
        </>

    );
};

export default Gate;
