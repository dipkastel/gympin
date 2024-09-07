import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Alert, AlertTitle, Card, CardContent, CardHeader, Divider, Grid, IconButton, ListItemText} from "@mui/material";
import {User_getMyCredits} from "../../../network/api/user.api";
import {creditTypes} from "../../../helper/enums/creditTypes";
import {toPriceWithComma} from "../../../helper/utils";
import {ArrowDownward} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {getCheckoutType} from "../../../helper/serverSettingsHelper";
import _InvoiceLowBudgentError from "./_InvoiceLowBudgentError";

const _InvoiceHowToPayModirate = ({userBasket, setUserCanPay, invoiceCredits, SetInvoiceCredits}) => {

    const error = useContext(ErrorContext);
    const [userCredits, SetUserCredits] = useState({})

    useEffect(() => {
        User_getMyCredits().then(result => {
            var userC = {
                ...result.data.Data, CreditDetails: result.data.Data.CreditDetails.map((c, n) => {
                    return {...c, Periority: n}
                })
            };
            SetUserCredits(userC);
            computeCredits(userC);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [userBasket]);

    useEffect(() => {
        setUserCanPay(userCredits.TotalCredit >= userBasket.TotalPrice);
    }, [userCredits, userBasket]);


    function computeCredits(userC) {
        var newCredit = [];
        var remainedPrice = userBasket.PriceToPay;
        var reducedPrice = 0;
        if (!userC.CreditDetails) return SetInvoiceCredits(newCredit);
        userC.CreditDetails.sort((a, b) => a.Periority - b.Periority).map(credit => {
            var remainedCredit;
            if (remainedPrice <= credit.CreditPayableAmount) {
                reducedPrice = remainedPrice;
                remainedCredit = credit.CreditPayableAmount - remainedPrice;
                remainedPrice = 0;
            } else {
                reducedPrice = credit.CreditPayableAmount;
                remainedPrice = remainedPrice - credit.CreditPayableAmount;
                remainedCredit = 0;
            }
            newCredit.push({
                Periority: credit.Periority,
                Source: credit.CreditType == "PERSONAL" ? creditTypes[credit.CreditType] : credit.Corporate.Name,
                Credit: credit,
                CreditAmount: credit.CreditAmount,
                CreditPayableAmount: credit.CreditPayableAmount,
                ReducedPrice: reducedPrice,
                RemainedPrice: remainedPrice,
                RemainedCredit: remainedCredit,
            });
        })
        SetInvoiceCredits(newCredit);
    }

    function changePriority(item) {
        var newUserCredit = [];
        userCredits.CreditDetails.map(p => {
            if (p.Periority == item.Periority)
                newUserCredit.push({...p, Periority: ++p.Periority});
            else if (p.Periority == (item.Periority + 1))
                newUserCredit.push({...p, Periority: --p.Periority});
            else
                newUserCredit.push(p);
        });
        computeCredits({...userCredits, CreditDetails: newUserCredit});
    }


    function getPayableCreditsOfUser() {
        return invoiceCredits.sort((a, b) => a.Periority - b.Periority).filter(a => a.CreditAmount != 0);
    }

    return (
        <>
            <Card elevation={3} sx={{m: 1}}>
                <CardHeader sx={{backgroundColor: "#969696", p: "8px !important", color: "#ffffff"}}
                            title={"نحوه پرداخت"}/>


                {userCredits && userBasket && <CardContent>
                {invoiceCredits && getPayableCreditsOfUser().map((item, number) => (
                    <Grid
                        container
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        key={"walet" + number}>

                        <ListItemText
                            primary={item.Source}
                            secondary={<>{"اعتبار : " + toPriceWithComma(item.CreditAmount)}<br/>{"قابل پرداخت : " + toPriceWithComma(item.CreditPayableAmount)}</>}
                            primaryTypographyProps={{variant: "h6"}}
                            secondaryTypographyProps={{variant: "subtitle1"}}
                        />
                        <ListItemText
                            primary={<>
                                {"مبلغ کسر شده : " + toPriceWithComma(item.ReducedPrice)}<br/>
                                {"باقی مانده خرید : " + toPriceWithComma(item.RemainedPrice)}<br/>
                                {"اعتبار باقی مانده : " + toPriceWithComma(item.RemainedCredit)}
                            </>}
                            primaryTypographyProps={{variant: "subtitle2"}}
                            sx={{backgroundColor: (item.ReducedPrice > 0) ? "#b6f6e3" : "#e8e8e8", p: 1}}
                        />

                        {(getPayableCreditsOfUser().length - 1 > number) &&
                        <IconButton aria-label="down" color={"inherit"}
                                    disabled={(invoiceCredits.length - 1 == number)}
                                    onClick={() => changePriority(item)}>
                            <ArrowDownward/>
                        </IconButton>}
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                 component="div"/>
                    </Grid>
                ))}
            </CardContent>}
            </Card>
            {userCredits.TotalCredit < userBasket.TotalPrice&&<_InvoiceLowBudgentError/>}
        </>

    );
};

export default _InvoiceHowToPayModirate;
