import React, {useContext, useEffect} from 'react';
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
import {ErrorContext} from "../../components/GympinPagesProvider";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";
import {SettlementUserDeposit_add} from "../../network/api/settlement.api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

const _Wallet = ({place,user,onRequestComplete}) => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);
    const minPrice = 50000;
    const [openModalRequest, setOpenModalRequest] = React.useState(false);



    if(!place)
        return (<></>);

    if(!user)
        return (<></>);

    function ModalDemandPayment() {
        if(!place) return;
        function request(e) {
            e.preventDefault()
            if(toPriceWithoutComma(e.target.requestAmount.value)<minPrice){
                error.showError({message: "مبلغ درخواست تسویه باید بیش از "+toPriceWithComma(minPrice)+" تومان باشد",});
                return;
            }
            setOpenModalRequest(false)
            SettlementUserDeposit_add({
                Amount: toPriceWithoutComma(e.target.requestAmount.value),
                UserId: currentUser.Id
            }).then(result => {
                navigate('/finance/demand', {replace: true});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
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
                                label="مبلغ درخواستی (تومان)"
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
                    {" مجموع کیف پول :"}
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography variant="h6">
                            {`${toPriceWithComma(user.FinanceUser.TotalDeposit)} تومان`}
                        </Typography>
                        {getAccessOf(personnelAccessEnumT.FinanceAction)&&<Button variant={"contained"} onClick={()=>setOpenModalRequest(true)}>درخواست تسویه</Button>}
                    </Stack>
                    {/*<Typography variant={"body2"}>*/}
                    {/*    مجموع کیف پول :*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body2">*/}
                    {/*    {`${toPriceWithComma(user.FinanceUser.TotalDeposit)} تومان`}*/}
                    {/*</Typography>*/}
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
