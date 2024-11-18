import React, {useEffect} from 'react';
import {
    Button,
    Card, CardContent, CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, Typography
} from "@mui/material";
import _StallPrice from "./_ManageStallPrice";

const ManageStall = () => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        document.title = 'مدیریت بوفه';
        }, []);



    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن منو ها</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalAddMenu(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن منو</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن منو جدید نام آیتم را وارد کنید
                            <br/>
                            مثال : آب معدنی بزرگ
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام منو"
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
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"مدیریت منو فروشگاه"}
                    action={renderAddButton()}/>
                <CardContent sx={{margin: 0}}>
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
            <_StallPrice name={"سیب زمینی آب پز"}/>
            <_StallPrice name={"تخم مرغ آب پز"}/>
            <_StallPrice name={"فیله مرغ آب پز"}/>
            <_StallPrice name={"ماهی"}/>
            {ModalAddMenu()}
        </>

    );
};

export default ManageStall;
