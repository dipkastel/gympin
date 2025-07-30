import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    ListItemText,
    Typography
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {invoice_getHowToPay} from "../../../network/api/invoice.api";
import _InvoiceLowBudgentError from "./_InvoiceLowBudgentError";
import {toPriceWithComma} from "../../../helper/utils";

const _InvoiceHowToPayModirate = ({userBasket, setUserCanPay, invoiceCredits, SetInvoiceCredits}) => {

    const error = useContext(ErrorContext);
    const [Credits, setCreadits] = useState({})
    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        invoice_getHowToPay({CheckoutType: "SIMPLE", Invoice:{id:userBasket.Id}}).then(result => {
            setCreadits(result.data.Data);
            setLoading(false);
            setUserCanPay(result?.data?.Data?.CreditCover);
            SetInvoiceCredits(result?.data?.Data?.CreditDetails);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [userBasket]);

    // useEffect(() => {
    //     setUserCanPay(userCredits.TotalCredit >= userBasket.TotalPrice);
    // }, [userCredits, userBasket]);


    function getCreditName(item) {
        return (<>
            {item?.CreditType ==="SPONSOR"&&
                <Typography variant={"subtitle1"} >
                    {item?.Corporate?.Name+" ( انقضا : "+new Date(item?.ExpireDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })+" )"}</Typography>
            }
            {item?.CreditType ==="PERSONAL"&&
                <Typography variant={"subtitle1"} >کیف پول شخصی</Typography>
            }
            {item?.CreditType ==="NON_WITHDRAWABLE"&&
                <Typography variant={"subtitle1"} >اعتبار خرید</Typography>
            }
        </>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{m: 1, borderRadius: 3}}>
                {loading && <CardContent>
                    <LinearProgress/>
                </CardContent>}
                {!loading && <CardContent sx={{m: 0, p: "8px !important"}}>
                    <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                          onClick={(e) => setExpand(!expand)}>
                        <Typography variant={"h5"} color={"#888888"}>
                            {"نحوه پرداخت"}
                        </Typography>
                        <IconButton size={"small"}>
                            {expand ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </IconButton>
                    </Grid>
                    <Collapse in={expand}>
                        {Credits?.CreditDetails?.filter(c=>c.CreditPayableAmount>0&&c.CreditAmount>0)?.map((item, number) => (
                            <Grid
                                container
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                key={"walet" + number}>
                                <ListItemText
                                    primary={getCreditName(item)}
                                    secondary={<>{"پرداخت : " + toPriceWithComma(item?.CreditPayableAmount)+" تومان از " + toPriceWithComma(item?.CreditAmount)+" تومان"}</>}
                                    primaryTypographyProps={{variant: "h6"}}
                                    secondaryTypographyProps={{variant: "subtitle1"}}
                                />
                                {/*<ListItemText*/}
                                {/*    primary={<>*/}
                                {/*        {"مبلغ کسر شده : " + toPriceWithComma(item.ReducedPrice)}<br/>*/}
                                {/*        {"باقی مانده خرید : " + toPriceWithComma(item.RemainedPrice)}<br/>*/}
                                {/*        {"اعتبار باقی مانده : " + toPriceWithComma(item.RemainedCredit)}*/}
                                {/*    </>}*/}
                                {/*    primaryTypographyProps={{variant: "subtitle2"}}*/}
                                {/*    sx={{backgroundColor: (item.ReducedPrice > 0) ? "#b6f6e3" : "#e8e8e8", p: 1}}*/}
                                {/*/>*/}

                                {/*{(getPayableCreditsOfUser().length - 1 > number) &&*/}
                                {/*<IconButton aria-label="down" color={"inherit"}*/}
                                {/*            disabled={(invoiceCredits.length - 1 == number)}*/}
                                {/*            onClick={() => changePriority(item)}>*/}
                                {/*    <ArrowDownward/>*/}
                                {/*</IconButton>}*/}
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}}
                                         component="div"/>
                            </Grid>
                        ))}
                    </Collapse>


                </CardContent>}
            </Card>
            {!loading&&!Credits?.CreditCover && <_InvoiceLowBudgentError/>}
        </>

    );
};

export default _InvoiceHowToPayModirate;
