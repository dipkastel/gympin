import React, {useContext, useEffect} from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";
import {SettlementUserDeposit_add} from "../../network/api/settlement.api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {user_getMyPlaceWallet} from "../../network/api/user.api";
import AppBar from "@mui/material/AppBar";

const _Wallet = ({place, user, onRequestComplete}) => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);
    const [wallets, setWallets] = React.useState(false);
    const minPrice = 50000;
    const [openModalRequest, setOpenModalRequest] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState(0);

    useEffect(() => {
        if (!place || !user)
            return;
        getUserWallet();
    }, []);

    if (!place || !user)
        return (<></>);


    function getUserWallet() {
        user_getMyPlaceWallet({Id: place?.Id}).then(result => {
            setWallets(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function ModalDemandPayment() {
        if (!place) return;


        function request(e) {
            e.preventDefault()
            if (toPriceWithoutComma(e.target.requestAmount.value) < minPrice) {
                error.showError({message: "مبلغ درخواست تسویه باید بیش از " + toPriceWithComma(minPrice) + " تومان باشد",});
                return;
            }
            setOpenModalRequest(false)
            SettlementUserDeposit_add({
                Amount: toPriceWithoutComma(e.target.requestAmount.value),
                UserFinanceId: wallets?.CreditDetails?.find(w => w.CreditType === "INCOME")?.Id
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
                <Dialog open={openModalRequest} onClose={() => setOpenModalRequest(false)}>
                    <AppBar position="static">
                        <Tabs
                            value={selectedTab}
                            onChange={(e, n) => setSelectedTab(n)}
                            aria-label="usersTab"
                            textColor="inherit"
                            indicatorColor="secondary"
                            variant="fullWidth"
                        >

                            <Tab label="تسویه حساب" id={"user-tab-0"} aria-controls={"user-tabpanel-0"}/>
                            {/*<Tab label="انتقال وجه" disabled={true} id={"user-tab-1"} aria-controls={"user-tabpanel-1"}/>*/}
                        </Tabs>
                    </AppBar>
                    <Form onSubmit={e => request(e)}>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant={"body2"}>
                                    درخواست شما طی 24 ساعت کاری به بانک ارسال خواهد شد
                                </Typography>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                name={"requestAmount"}
                                sx={{mt:1}}
                                label="مبلغ درخواستی (تومان)"
                                onChange={e => e.target.value = toPriceWithComma(e.target.value)}
                                type="text"
                                disabled={getIncomeWalletAmount() < minPrice}
                                fullWidth
                                variant="outlined"
                            />
                            {getIncomeWalletAmount() < minPrice &&
                            <Typography color={"red"} variant={"body2"}>حساب شما کمتر از میزان قابل تسویه می
                                باشد</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={getIncomeWalletAmount() < minPrice} variant={"outlined"} color={"success"}
                                    type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    function getIncomeWalletAmount() {
        return wallets?.CreditDetails?.find(w => w.CreditType === "INCOME")?.CreditPayableAmount || 0;
    }

    function getUserWalletAmount() {
        return wallets?.CreditDetails?.find(w => w.CreditType === "PERSONAL")?.CreditPayableAmount || 0;
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems={"center"}
                        direction="row"
                        spacing={0}
                    >
                        <Grid item>

                            <Typography sx={{mt: 1, lineHeight: 0.6}} variant={"subtitle1"}>
                                {" کیف پول " + place.Name + " : "}
                                {`${toPriceWithComma(getIncomeWalletAmount())} تومان`}
                            </Typography>
                            {getUserWalletAmount() > 0 && <Typography sx={{mr: 1}} variant={"overline"}>
                                {" کیف پول شخصی  : "}
                                {`${toPriceWithComma(getUserWalletAmount())} تومان`}
                            </Typography>}
                        </Grid>
                        <Grid item>
                            {getAccessOf(personnelAccessEnumT?.FinanceAction) &&
                            <Button variant={"contained"} onClick={() => setOpenModalRequest(true)}>تسویه</Button>}
                        </Grid>
                    </Grid>
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
