import React, {useContext} from 'react';
import {Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";
import {toPriceWithComma} from "../../../helper/utils";
import {
    invoice_addBuyable,
    invoice_changeInvoiceBuyableCount,
    invoice_deleteBuyable
} from "../../../network/api/invoice.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {useSelector} from "react-redux";

const _InvoiceBuyableCard = ({buyable, updatePage}) => {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);

    function deleteItem(item) {
        invoice_deleteBuyable({id: item.Id})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                store.dispatch(sagaActions.RequestUserInvoices(currentUser))
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateCount(newCount) {
        invoice_changeInvoiceBuyableCount({
            Id: buyable.Id,
            Count: newCount
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            store.dispatch(sagaActions.RequestUserInvoices(currentUser))
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <Card elevation={3} sx={{m: 1}}>
            <CardHeader
                component={"a"}
                sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                title={buyable.Name}
                subheader={<><Typography component={"span"} variant={"subtitle2"}>
                    {"مرکز : " + buyable.Place.Name}
                </Typography></>}
                action={
                    <IconButton color={"error"} aria-label="add to shopping cart"
                                onClick={(e) => deleteItem(buyable)}>
                        <Delete/>
                    </IconButton>
                }
            />
            <CardContent sx={{m: 0, py: 0}}>

                <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid>

                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography variant={"subtitle1"}>
                                تعداد :
                            </Typography>
                            {buyable.Count>1&&<IconButton size={"small"} onClick={(e)=>updateCount(buyable.Count-1)}>
                                <ArrowDownward/>
                            </IconButton>}
                            <Typography variant={"subtitle1"}>
                                {buyable.Count}
                            </Typography>
                            <IconButton size={"small"} onClick={(e)=>updateCount(buyable.Count+1)}>
                                <ArrowUpward/>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Typography variant={"subtitle1"}>
                        {"قیمت واحد : " + toPriceWithComma( buyable.UnitPrice)}
                    </Typography>

                </Grid>

                <Typography variant={"subtitle1"} color={"#489391"}>
                    {"قابل پرداخت : " + toPriceWithComma(buyable.UnitPrice*buyable.Count)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default _InvoiceBuyableCard;
