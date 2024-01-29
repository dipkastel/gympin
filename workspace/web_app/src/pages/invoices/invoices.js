import React from 'react';
import {useSelector} from "react-redux";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid, ListItemText,
    Typography
} from "@mui/material";
import {BuyableType} from "../../helper/enums/BuyableType";
import {invoiceStatus} from "../../helper/enums/invocieStatus";
import {toPriceWithComma} from "../../helper/utils";

const Invoices = () => {
    const userBasket = useSelector(state => state.invoice.invoices);
    console.log(userBasket);
    return userBasket?(
        <>
            {userBasket.map(invoice=>(
                <Card elevation={3} sx={{margin: 1}} key={invoice.Id}>
                    <CardHeader sx={{backgroundColor:"#969696",color:"white"}} title={<Typography  variant={"body1"}>{new Date(invoice.CreatedDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography>}
                    action={<Typography  variant={"body2"}>{invoiceStatus[invoice?.Status]}</Typography>}
                    />
                    <CardContent>
                        <Typography sx={{padding:0.5}} variant={"body1"}>{"شماره فاکتور : "+invoice?.Id}</Typography>
                        <Typography sx={{padding:0.5}} variant={"body2"}>{"مبلغ : "+invoice?.PriceToPay}</Typography>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>

                        <Typography sx={{padding:1}}  variant={"body1"}>{"خرید ها : "}</Typography>

                        {invoice?.InvoiceBuyables?.map(buyable=>(

                            <ListItemText
                                key={buyable.Id}
                                primary={buyable.Name}
                                secondary={toPriceWithComma(buyable.UnitPrice)+"  "+buyable.Count +"عدد"}
                                primaryTypographyProps={{variant: "body1"}}
                                secondaryTypographyProps={{variant: "body2"}}
                            />
                        ))}

                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
                    </CardContent>
                    <CardActions>
                        <Typography  variant={"body2"}>{"سریال : "+invoice?.Serial?.Serial}</Typography>

                    </CardActions>
                </Card>
            ))}
        </>

    ):(
        <div>
            asdasd
        </div>
    );
};

export default Invoices;
