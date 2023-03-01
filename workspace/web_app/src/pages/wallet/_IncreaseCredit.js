import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Card, Divider, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {transactions_getPaymentGateways, transactions_setPaymentRequest} from "../../network/api/transactions.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Image} from "react-bootstrap";

const _IncreaseCredit = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [amountToPay,SetAmountToPay]= useState(null)
    const [paymentGateways,setPaymentGateways] = useState([]);

    useEffect(() => {
        getPaymentGateways();
    }, []);

    function getPaymentGateways(){
        transactions_getPaymentGateways({}).then(result=>{
            setPaymentGateways(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function submitPayment(e){
        e.preventDefault()
        if(!amountToPay||parseInt(amountToPay)<5000){
            error.showError({message: "حداقل مبلغ شارژ 5،000 تومان می باشد",});
            return;
        }
        var selectedGatway = paymentGateways.filter(item=>item.IsDefault == true)[0];
        transactions_setPaymentRequest({
            SelectedPaymentId:selectedGatway.Id,
            TransactionType:"CHARGE_USER",
            Amount:amountToPay,
            UserId:currentUser.Id
        }).then(result=>{
            window.location.href = result.data.Data;
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function changeDefaultTo(selected){
        let items = paymentGateways.map(item=>{
            if(item.IsDefault)item.IsDefault = false;
            return item;
        });
        var newItems = items.map(item=>{
            if(item.Id==selected.Id)
                item.IsDefault = true;
            return item;
        })
        setPaymentGateways(newItems);
    }


    return (<>
            <Card elevation={3} sx={{margin: 1}}>


                <Typography
                    sx={{display: "inline", margin: 1}}
                    component="p"
                    variant="subtitle1"
                    color="text.primary"
                >
                    افزایش اعتبار شخصی
                </Typography>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{padding: 1}}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                    >
                        <Button sx={{m:2}} onClick={()=>SetAmountToPay(200000)} color={"info"} variant={"contained"}>200,000 تومان</Button>
                        <Button sx={{m:2}}  onClick={()=>SetAmountToPay(400000)} color={"info"} variant={"contained"}>400,000 تومان</Button>
                        <Button sx={{m:2}}  onClick={()=>SetAmountToPay(800000)} color={"info"} variant={"contained"}>800,000 تومان</Button>
                        <Button sx={{m:2}}  onClick={()=>SetAmountToPay(1000000)} color={"info"} variant={"contained"}>1,000,000 تومان</Button>
                    </Grid>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                    >

                        {paymentGateways.map(item=>(

                            <Grid
                                xs={3}
                                item
                                onClick={()=>changeDefaultTo(item)}
                            >
                                <Box sx={(item.IsDefault)?{border:"2px solid #37aa60"}:{border:"1px solid #ddd"}}>
                                    <Image width={"100%"}  rounded={"8px"}  src={item.ImageUrl}/>
                                    <Typography sx={{width:"100%",textAlign:"center"}} variant={"subtitle1"}>
                                        {item.Name}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{padding: 1}}
                    >


                        <TextField
                            id="outlined-adornment-password"
                            className="w-100"
                            variant="outlined"
                            margin="normal"
                            name="code"
                            value={toPriceWithComma(amountToPay)}
                            type="text"
                            onChange={e=>SetAmountToPay(toPriceWithoutComma(e.target.value))}
                            label={"مبلغ دلخواه به تومان"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Button
                                            edge="end"
                                            aria-label="Toggle password visibility"
                                            variant={"contained"}
                                            onClick={(e)=>submitPayment(e)}
                                        > پرداخت
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default _IncreaseCredit;
