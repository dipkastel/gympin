import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {transaction_increaseQuery} from "../../network/api/transactions.api";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
    IconButton,
    ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Typography
} from "@mui/material";
import {getUserFixedName, toPriceWithComma} from "../../helper/utils";
import {Form, Image} from "react-bootstrap";
import {Delete, Notes, Receipt} from "@mui/icons-material";
import {
    increaseCorporateDeposit_completeRequestIncreaseCorporateDeposits,
    increaseCorporateDeposit_delete,
    increaseCorporateDeposit_getProFromaInvoice
} from "../../network/api/increaseCorporateDeposit.api";

const _ChargeInvoices = ({refreshCode}) => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    const [transactions, SetTransactions] = useState([])
    const [itemToPay, SetItemToPay] = useState(null)
    const [itemToCancel, setItemToCancel] = useState(null)
    const [transactionReference, SetTransactionRefrence] = useState(null);


    useEffect(() => {
        getInvoiceList()
    }, [refreshCode]);

    function getInvoiceList() {
        transaction_increaseQuery({
            queryType: "FILTER",
            CorporateId: corporate.Id,
            DepositStatus: "DRAFT",
            paging: {Page: 0, Size: 10, Desc: true}
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

    function getProFormaInvoice(item) {
        increaseCorporateDeposit_getProFromaInvoice({
            Id: item.Id
        }).then((response) => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getlabelOfRefrence() {
        if (!itemToPay)
            return "نوع تراکنش انتخاب نشده";
        console.log(itemToPay)
        switch (itemToPay?.GatewayType) {
            case 'CARD_TRANSFER':
                return "کد مرجع تراکنش";
                break;
            case 'BANK_TRANSFER':
                return "کد رهگیری پرداخت";
                break;
            case 'CHEQUE':
                return "شماره سریال چک";
                break;
            default:
                return "شناسایی ربات";
                break;
        }

    }

    function renderModalPay() {

        function pay(e) {
            e.preventDefault()
            if(!transactionReference){
                error.showError({message: getlabelOfRefrence()+" الزامی است.",});
                return;
            }
            error.showError({message: "صبر کنید",});
            SetItemToPay(null);
            increaseCorporateDeposit_completeRequestIncreaseCorporateDeposits({
                Id:itemToPay.Id,
                TransactionReference: transactionReference,
            }).then(result => {
                error.showError({message: "با موفقیت ثبت شد",});
                getInvoiceList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (<Dialog  open={!!itemToPay} onClose={() => SetItemToPay(null)}>
            <Form onSubmit={(e) => pay(e)}>
                <DialogTitle>تکمیل پرداخت</DialogTitle>
                <DialogContent>
                    <TableContainer fullWidth>
                        <Table aria-label="invoice">
                            <TableBody>
                                <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}, bgcolor: "primary.boxBg"}}>
                                    <TableCell colSpan={2} align="start">مبالغ پرداخت شده برای بررسی توسط جیم پین ثبت می‌شود و این بررسی گاها تا 24 ساعت به زمان نیاز دارد.</TableCell>
                                </TableRow>
                                <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}, bgcolor: "primary.boxBg"}}>
                                    <TableCell colSpan={2} align="start">همچنین میتوانید از طریق تاریخچه تراکنش ها وضعیت درخواست خود را پیگیری نمایید.</TableCell>
                                </TableRow>
                                <TableRow key={1} sx={{'&:last-child td, &:last-child th': {border: 0}, bgcolor: "primary.boxBg"}}>
                                    <TableCell align="start">قابل پرداخت</TableCell>
                                    <TableCell align="right">{toPriceWithComma(itemToPay?.Amount)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"space-between"}
                        alignItems="center"
                        sx={{padding: 1}}
                    >

                        <TextField
                            variant="outlined"
                            margin="normal"
                            sx={{flex: "auto"}}
                            type="text"
                            name="code"
                            value={transactionReference || ""}
                            onChange={e => SetTransactionRefrence(e.target.value)}
                            label={getlabelOfRefrence()}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"error"}
                            onClick={() => SetItemToPay(null)}>لغو</Button>
                    <Button type={"submit"} variant={"contained"} color={"success"}>پرداخت</Button>

                </DialogActions>
            </Form>
        </Dialog>)
    }
    function renderModalCancel() {

        function cancelPreFormaInvoce(e) {
            e.preventDefault()
            setItemToCancel(null);
            error.showError({message: "صبر کنید",});
            increaseCorporateDeposit_delete({
                Id: itemToCancel.Id
            }).then((response) => {
                error.showError({message: "انجام شد",});
                getInvoiceList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={!!itemToCancel} onClose={() => setItemToCancel(null)}>
                <Form onSubmit={(e) => cancelPreFormaInvoce(e)}>
                    <DialogTitle>حذف پیش فاکتور</DialogTitle>
                    <DialogContent>
                        <Typography variant={"body2"}>
                            پیش فاکتور صادر شده را لغو می کنید؟
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"success"}
                                onClick={() => setItemToCancel(null)}>خیر</Button>
                        <Button type={"submit"} variant={"contained"} color={"error"}>بله</Button>

                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <>
            {transactions?.content?.length > 0 && <Grid container textAlign={"center"} columns={2} size={6}>
                {transactions?.content && transactions.content.map((row, index) => {
                    return (
                        <Grid key={"tr-" + row.Serial} size={2} textAlign={"center"}>
                            <Card elevation={3} sx={{m: 1, borderRadius: 3, maxWidth: 500, width: "100%", justifySelf: "center"}}>
                                <CardContent>
                                    <Grid container justifyContent={"space-between"} alignItems={"start"}>
                                        <Typography variant={"subtitle1"} textAlign={"start"}>
                                            <Receipt sx={{mr: 1}} color={"warning"}/>
                                            پیش فاکتور
                                        </Typography>
                                        <ListItemText
                                            primaryTypographyProps={{variant: "caption", textAlign: "end"}}
                                            secondaryTypographyProps={{variant: "overline", textAlign: "end"}}
                                            primary={<>{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}<IconButton onClick={(e) => setItemToCancel(row)} size={"small"}><Delete
                                                color={"error"}/></IconButton></>}
                                            secondary={row.Serial.Serial.split("-")[0]}
                                        />
                                    </Grid>

                                    <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"start"}>
                                        <ListItemText
                                            primary={toPriceWithComma(row.Amount) + " تومان"}
                                            primaryTypographyProps={{textAlign: "start"}}
                                            secondaryTypographyProps={{variant: "overline", textAlign: "start"}}
                                            secondary={row?.CreatorUser && ('توسط : ' + getUserFixedName(row.CreatorUser))}
                                        />
                                        <ListItemText
                                            primary={<Button variant={"contained"} onClick={() => getProFormaInvoice(row)}>دانلود پیش
                                                فاکتور</Button>}
                                            primaryTypographyProps={{textAlign: "end"}}
                                            secondary={row.Description &&
                                            <IconButton size={"small"}><Notes fontSize={"12px"}/></IconButton>}
                                            secondaryTypographyProps={{variant: "overline", textAlign: "end"}}
                                        />
                                    </Grid>
                                    <Button onClick={(e)=>SetItemToPay(row)} variant={"contained"} fullWidth>پرداخت</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>}
            {transactions?.content && transactions?.content?.length < 1 && <>
                <Grid
                    container
                    size={6}
                    sx={{height: "60vh"}}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Image src={"/assets/images/icons/ic-empty-transaction.svg"} width={"30%"}/>
                    <Typography variant={"body"} sx={{m: 2}}>
                        پیش فاکتور یافت نشد
                    </Typography>
                </Grid>

            </>}
            {renderModalCancel()}
            {renderModalPay()}
        </>

    );
};

export default _ChargeInvoices;
