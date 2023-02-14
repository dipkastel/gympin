import React, {useEffect, useState} from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {creditTypes} from "../../../helper/enums/creditTypes";
import {toPriceWithComma} from "../../../helper/utils";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useNavigate} from "react-router-dom";

export function CalculatePay(ticket, creditToPay, i) {
    if (!ticket) return 0;
    if (!creditToPay) return 0;
    var result = 0;
    var ticketPrice = ticket.Price;
    creditToPay.sort((a, b) => a.priority - b.priority).map((item, Number) => {
        if (ticketPrice <= 0) return 0
        var reminderPrice = ticketPrice - Math.min(item.credit.CreditPayableAmount, ticketPrice);
        if (i.priority == item.priority) {
            result = ticketPrice-reminderPrice;
        }
        ticketPrice = reminderPrice;

    })
    return result;
}



const _invoiceHowToPay = ({credits, ticket, creditSortToPay, setCreditSortToPay}) => {

    const [openHelp, SetOpenHelp] = useState(false)
    const [creditToPay, SetCreditToPay] = useState(creditSortToPay)
    const navigate = useNavigate()
    useEffect(() => {
        if(JSON.stringify(creditSortToPay)!=JSON.stringify(creditToPay))
            SetCreditToPay(creditSortToPay);
    }, [creditSortToPay]);
    useEffect(() => {
        if(JSON.stringify(creditSortToPay)!=JSON.stringify(creditToPay))
            setCreditSortToPay(creditToPay);
    }, [creditToPay]);

    function changePriority(item) {
        var tempCreadits = [];
        var newCreadits = [];
        creditToPay.sort((a, b) => a.priority - b.priority).map((i, Number) => {
            if (item.priority == i.priority) {
                tempCreadits.push({...i, priority: i.priority+1});
            } else if (item.priority+1 == i.priority) {
                tempCreadits.push({...i, priority: i.priority - 1});
            } else {
                tempCreadits.push({...i});
            }
        })
        tempCreadits.sort((a, b) => a.priority - b.priority).map((i, Number) => {
                newCreadits.push({...i,payment:CalculatePay(ticket,tempCreadits,i)});
        })
        SetCreditToPay(newCreadits);
        SetOpenHelp(false);
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={"نحوه پرداخت"}
                            action={<IconButton aria-label="up" color="info" onClick={() => SetOpenHelp(!openHelp)}>
                                <HelpOutlineIcon/>
                            </IconButton>}
                />

                <Collapse in={openHelp} timeout="auto" unmountOnExit>
                    <Alert severity="info">
                        <AlertTitle>نحوه محاسبه پرداخت</AlertTitle>

                        <Typography
                            component="p"
                            variant="body2"

                        >

                            هزینه بلیط از منابع زیر ، با اولویت بالا به پایین کسر خواهد شد.

                        </Typography>
                        <Typography
                            component="p"
                            variant="body2"

                        >
                            شما میتوانید با تغییر اولویت منابع ، نحوه پرداخت را تغییر دهید.
                        </Typography>
                    </Alert>
                </Collapse>
                <CardContent>

                    {creditToPay.sort((a, b) => a.priority - b.priority).map((item, Number) => (
                        <div key={Number}>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                aria-label="Disabled elevation buttons"
                            >

                                <IconButton aria-label="down" color={"inherit"}
                                            disabled={(creditToPay.length - 1 == Number)}
                                            onClick={() => changePriority(item)}>
                                    <ArrowDownwardIcon/>
                                </IconButton>
                                <Grid sx={{mb: 1}}><Typography
                                    sx={{display: "inline"}}
                                    component="p"
                                    variant="subtitle2"
                                    color="text.primary"
                                >
                                    {item.credit.CreditType == "SPONSOR" && creditTypes[item.credit.CreditType] + " (" + item.credit.Corporate.Name + ") "}
                                    {item.credit.CreditType == "PERSONAL" && creditTypes[item.credit.CreditType]}
                                    {toPriceWithComma(item.credit.CreditAmount) + " تومان"}



                                </Typography>
                                    <br/>
                                    <Typography
                                        sx={{display: "inline"}}
                                        component="p"
                                        variant="body2"

                                        color={"green"}
                                    >
                                        {" قابل پرداخت : " + toPriceWithComma(item.credit.CreditPayableAmount) + " تومان"}

                                    </Typography>
                                    <br/>
                                    <Typography
                                        sx={{display: "inline"}}
                                        component="p"
                                        variant="body1"

                                        color={"darkred"}
                                    >
                                        {" برداشت : " + item.payment + " تومان"}

                                    </Typography>
                                </Grid>
                            </ButtonGroup>
                        </div>
                    ))}
                </CardContent>

                {ticket && (ticket.Price > credits.TotalCredit) &&
                <Alert action={<Button fullWidth variant={"contained"} onClick={() => navigate("/wallet")}> کیف
                    پول</Button>} severity="warning">
                    <AlertTitle>مجموع اعتبار های شما کمتر از هزینه بلیط می باشد.</AlertTitle>
                    میتوانید از بخش کیف پول اعتبار خود را افزایش دهید.

                </Alert>}

            </Card>

        </>
    );
};

export default _invoiceHowToPay;
