import React, {useContext, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import {Add, DeleteOutline, Remove} from "@mui/icons-material";
import {toPriceWithComma} from "../../../helper/utils";
import {invoice_changeInvoiceBuyableCount, invoice_deleteBuyable} from "../../../network/api/invoice.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {useSelector} from "react-redux";

const _InvoiceBuyableCard = ({buyable, updatePage}) => {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [loading, SetLoading] = useState(false)

    function deleteItem(item) {
        SetLoading(true);
        invoice_deleteBuyable({id: item.Id})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                updatePage();
                SetLoading(false);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateCount(newCount, action) {
        if (newCount > 5 && action === "plus") {
            error.showError({message: "حداکثر تعداد بلیط",});
            return;
        }

        SetLoading(true);
        invoice_changeInvoiceBuyableCount({
            Id: buyable.Id,
            Count: newCount
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            updatePage();
            SetLoading(false);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getMinusButton(buyable) {
        if (buyable.Count > 1) {
            return (
                <Button sx={{border: "0px solid #fff !important"}}
                        onClick={(e) => updateCount(buyable.Count - 1, "minus")}><Remove/></Button>)
        } else {
            return (
                <Button sx={{border: "0px solid #fff !important"}}
                        onClick={(e) => deleteItem(buyable)}><DeleteOutline/></Button>)
        }
    }

    return (
        <Card elevation={6} sx={{m: 1, borderRadius: 4}}>
            <CardHeader
                component={"a"}
                sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                title={buyable.Name}
                subheader={<><Typography component={"span"} variant={"subtitle2"}>
                    {"مرکز : " + buyable.Place.Name}
                </Typography>
                    <Typography variant={"subtitle1"}>
                        {"قیمت واحد : " + toPriceWithComma(buyable.UnitPrice)}
                    </Typography>
                </>}
            />
            <CardContent sx={{mx: 0, mt: 0, mb: 0, py: "0px !important"}}>
                <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid>

                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>

                            <ButtonGroup size={"small"} sx={{
                                mb: 2,
                                direction: "ltr",
                                borderColor: "#000",
                                borderRadius: 2,
                                border: "1px solid #e2e2e2"
                            }} variant="outlined"
                                         aria-label="Basic button group">
                                {!loading && <Button sx={{border: "0px solid #fff !important"}}
                                                     onClick={(e) => updateCount(buyable.Count + 1, "plus")}><Add/></Button>}
                                {!loading &&
                                <Button sx={{border: "0px solid #fff !important"}}>{buyable.Count}</Button>}
                                {!loading && getMinusButton(buyable)}
                                {loading && <LinearProgress sx={{width: "90px", m: 1.8}}/>}
                            </ButtonGroup>
                            {/*{loading&&}*/}
                            {/*{buyable.Count>1&&<IconButton size={"small"} >*/}
                            {/*    <Remove color={"error"}/>*/}
                            {/*</IconButton>}*/}
                            {/*<Typography variant={"subtitle1"}>*/}
                            {/*    {buyable.Count}*/}
                            {/*</Typography>*/}
                            {/*<IconButton size={"small"} >*/}
                            {/*    <Add color={"success"}/>*/}
                            {/*</IconButton>*/}
                        </Grid>
                    </Grid>

                </Grid>

            </CardContent>
            {buyable.Count > 1 &&
            <CardActions sx={{borderTop: "2px dashed #C2C2C2", flexDirection: "column"}}>
                <Typography variant={"h6"} color={"#C2C2C2"}>
                    {"قابل پرداخت : " + toPriceWithComma(buyable.UnitPrice * buyable.Count)}
                </Typography>
            </CardActions>
            }
        </Card>
    );
};

export default _InvoiceBuyableCard;
