import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack, TextField,
    Typography
} from "@mui/material";

const _Wallet = () => {
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalDemandPayment(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>درخواست تسویه حساب</DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            درخواست شما طی 24 ساعت کاری به بانک ارسال خواهد شد
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="مبلغ درخواستی"
                            type="number"
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
                <CardContent
                    >
                    اعتبار شما :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6" >
                            14,500,000 تومان
                        </Typography>
                        <Button variant={"contained"} onClick={handleClickOpen}>درخواست تسویه</Button>
                    </Stack>
                    <Typography  variant="caption"
                                 component={"a"}
                                 href={"/finance/demand"}
                                 sx={{textDecoration:"none",color:"#000000"}}>
                        مشاهده لیست درخواست ها
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default _Wallet;
