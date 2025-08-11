import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {Add, Upload} from "@mui/icons-material";
import {Form} from "react-bootstrap";
import {invoice_sendOrderToCorporate} from "../../../../network/api/invoice.api";
import {useNavigate} from "react-router";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _EditPreOrderAction = ({invoice}) => {

    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    function renderModalConfirm() {
        function invoiceChangeStatus(e) {
            e.preventDefault();
            invoice_sendOrderToCorporate({id:invoice.Id}).then(result=>{
                navigate("/PreOrders");
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalConfirm} onClose={() => setOpenModalConfirm(null)}>
                <Form onSubmit={(e) => invoiceChangeStatus(e)}>
                    <DialogTitle>ارسال فاکتور پرداخت به سازمان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"body2"}>
                                {"با ارسال فاکتور به سازمان دیگر امکان تغییر از سمت شما وجود نخواهد داشت."}
                            </Typography>
                            <Typography variant={"body2"}>
                                {" پس از پرداخت فاکتور توسط سازمان آیتم ها در بخش سفارشات برای آماده سازی و تحویل قابل مشاهده می‌باشد."}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => setOpenModalConfirm(null)}
                        >
                            لغو
                        </Button>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            ارسال
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }

    return (
        <>
            <Card elevation={10} sx={{m:2}}>
                <CardHeader sx={{borderBottom:"1px solid #909090"}} title={"عملیات"}/>
                <CardContent>
                    <Button variant={"contained"} fullWidth color={"success"} onClick={(e)=>setOpenModalConfirm(true)} endIcon={<Upload />} >ارسال فاکتور برای پرداخت سازمان</Button>
                </CardContent>
            </Card>
            {renderModalConfirm()}
        </>
    );
};

export default _EditPreOrderAction;
