import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, ListItemText, Typography} from "@mui/material";
import {invoiceStatus} from "../../helper/enums/invocieStatus";
import {toPriceWithComma} from "../../helper/utils";
import _InvoiceEmptyTransaction from "./partials/_InvoiceEmptyTransaction";

const Invoices = () => {
    const userBasket = useSelector(state => state.invoice.invoices);

    useEffect(() => {
        document.title = 'تراکنش ها';
    }, []);
    console.log("userBasket",userBasket);
    console.log(userBasket.toReversed());
    return userBasket?.length>0 ? (
        <>
            {userBasket.toReversed().map(invoice => (
                <Card elevation={3} sx={{margin: 1}} key={invoice.Id}>
                    <CardHeader sx={{backgroundColor: invoice?.Status == "COMPLETED" ? "#488a6f" : "#814646", color: "white"}}
                                title={<Typography variant={"body1"}>{new Date(invoice.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</Typography>}
                                action={<Typography variant={"body2"}>{invoiceStatus[invoice?.Status]}</Typography>}
                    />
                    <CardContent>
                        <Typography sx={{padding: 0.5}} variant={"body1"}>{"شماره فاکتور : " + invoice?.Id}</Typography>
                        <Typography sx={{padding: 0.5}}
                                    variant={"body2"}>{"مبلغ : " + toPriceWithComma(invoice?.PriceToPay) + " تومان"}</Typography>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}} component="div"/>

                        <Typography sx={{padding: 1}} variant={"body1"}>{"خرید ها : "}</Typography>

                        {invoice?.InvoiceSubscribe?.map(buyable => (

                            <ListItemText
                                key={buyable.Id}
                                primary={buyable.Name + " از مجموعه " + buyable?.Place?.Name}
                                secondary={toPriceWithComma(buyable.UnitPrice) + " تومان برای " + buyable.Count + " عدد"}
                                primaryTypographyProps={{variant: "body1"}}
                                secondaryTypographyProps={{variant: "body2"}}
                            />
                        ))}

                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0, width: "100%"}} component="div"/>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent={"space-between"}>

                            <Grid>

                                <Typography variant={"body2"}>{"سریال : " + invoice?.Serial?.Serial?.split("-")[0]}</Typography>
                            </Grid>
                            <Grid>
                                {invoice?.Status == "COMPLETED"&&<Button variant={"outlined"} onClick={(e)=>alert("این عملکرد فعلا در دسترس نمی باشد")} >ارسال به سازمان</Button>}
                            </Grid>
                        </Grid>

                    </CardActions>
                </Card>
            ))}
        </>

    ) : (
        <_InvoiceEmptyTransaction/>
    );
};

export default Invoices;
