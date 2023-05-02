import React, {useContext} from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {transaction_settlementRequest} from "../../network/api/transaction.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";

const _Wallet = ({place,onRequestComplete}) => {
    const error = useContext(ErrorContext);
    const [openModalRequest, setOpenModalRequest] = React.useState(false);



    if(!place)
        return (<></>);

    function ModalDemandPayment() {
        if(!place) return;
        function request(e) {
            e.preventDefault()
            transaction_settlementRequest({PlaceId:place.Id,Amount:toPriceWithoutComma(e.target.requestAmount.value)}).then(result=>{
                setOpenModalRequest(false);
                onRequestComplete();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        return (
            <div>
                <Dialog open={openModalRequest} onClose={()=>setOpenModalRequest(false)}>
                    <Form onSubmit={e => request(e)}>
                        <DialogTitle>درخواست تسویه حساب</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                درخواست شما طی 24 ساعت کاری به بانک ارسال خواهد شد
                            </DialogContentText>
                            <TextField
                                autoFocus
                                name={"requestAmount"}
                                label="مبلغ درخواستی"
                                onChange={e=>e.target.value=toPriceWithComma(e.target.value)}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setOpenModalRequest(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                >
                    موجودی :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6">
                            {`${toPriceWithComma(place.Balance)} تومان`}
                        </Typography>
                        {getAccessOf(personnelAccessEnumT.FinanceAction)&&<Button variant={"contained"} onClick={()=>setOpenModalRequest(true)}>درخواست تسویه</Button>}
                    </Stack>
                    <Typography variant="caption"
                                component={"a"}
                                href={"/finance/demand"}
                                sx={{textDecoration: "none", color: "#000000"}}>
                        مشاهده لیست درخواست ها
                    </Typography>
                </CardContent>
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default _Wallet;
