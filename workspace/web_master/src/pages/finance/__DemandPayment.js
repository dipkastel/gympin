import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {SettlementUserDeposit_add, SettlementUserDeposit_query} from "../../network/api/settlement.api";
import {Form, Image} from "react-bootstrap";
import AppBar from "@mui/material/AppBar";

const __DemandPayment = ({place, currentWallet, wallets, getIncomeWalletAmount}) => {
    const error = useContext(ErrorContext);
    const [transactions, SetTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const minPrice = 50000;
    const [openModalRequest, setOpenModalRequest] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState(0);

    useEffect(() => {
        getSettelmentRequests()
    }, [page]);


    function getSettelmentRequests() {
        SettlementUserDeposit_query({
            queryType: "FILTER",
            FinanceUserId: currentWallet,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function Empty() {
        return (<Grid
            container
            sx={{width: "100%", py: 5}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
            <Typography variant={"body"} sx={{m: 2}}>
                درخواستی وجود ندارد!
            </Typography>

        </Grid>);
    }

    function getSeverity(item) {
        switch (item.SettlementStatus) {
            case "CONFIRMED" :
                return "success"
            case "REJECTED" :
                return "error"
            case "REQUESTED" :
                return "warning"
        }
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
                setPage(0)
                getSettelmentRequests()
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
                            <Typography variant={"body2"}>
                                درخواست شما طی 24 ساعت کاری به بانک ارسال خواهد شد
                            </Typography>
                            <TextField
                                autoFocus
                                name={"requestAmount"}
                                sx={{mt: 1}}
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
                            <Button disabled={getIncomeWalletAmount() < minPrice} variant={"contained"} color={"error"}
                                    fullWidth
                                    type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }


    return (
        <>
            <Card sx={{mt: 2}} variant={"outlined"}>
                <CardHeader title={"درخواست های تسویه"}
                            action={<Button variant={"outlined"} onClick={() => setOpenModalRequest(true)}>درخواست تسویه</Button>}
                />
                {(transactions?.content?.length > 0) ? <>

                        <CardContent>

                            <List disablePadding>
                                {transactions.content.map((row) => (

                                    <ListItem key={row.Id + "12"} disablePadding>
                                        <ListItemText>
                                            <Alert severity={getSeverity(row)} sx={{px: 1}}>
                                                <Grid container direction={"column"}>
                                                    <Typography variant={"subtitle1"}
                                                                sx={{px: 1, pt: 1}}>{toPriceWithComma(row.Amount) + " تومان"}</Typography>
                                                    <Typography variant={"body2"} sx={{px: 1, pt: 1}}>{row?.Description}</Typography>
                                                    <Typography variant={"caption"} sx={{
                                                        px: 1,
                                                        pt: 1
                                                    }}>{"تاریخ : " + new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</Typography>
                                                    <Typography variant={"caption"}
                                                                sx={{px: 1, pt: 1}}>{"سریال : " + row.Serial.Serial}</Typography>
                                                </Grid>

                                            </Alert>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                            <Grid sx={{p: 2}} container direction={"column"} alignItems={"center"} justifyContent={"center"}>
                                <Pagination variant="outlined" count={transactions.totalPages} onChange={(f, p) => setPage(p - 1)}
                                            color="primary"/>
                            </Grid>
                        </CardContent>


                    </>

                    : Empty()}
            </Card>
            {ModalDemandPayment()}
        </>
    );
};

export default __DemandPayment;
