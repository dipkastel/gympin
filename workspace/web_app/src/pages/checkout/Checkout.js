import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {connect} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography} from "@mui/material";

const Checkout = (params) => {
    const navigate = useNavigate()
    const {formData} = useParams();
    const decodedFormData = decodeURIComponent(formData);
    const error = useContext(ErrorContext);
    const [counter, SetCounter] = useState(null);
    const [transActionTitle, SetTransactionTitle] = useState("لطفا صبر کنید");
    useEffect(() => {
        document.title = 'پرداخت';
        var incounter = 15;
        const interval = setInterval(() => {
            if (incounter <= 0)
                navigate("/wallet");
            SetCounter(incounter--);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    var request = false;
    // useEffect(()=>{
    //     if (request) return;
    //     request = true;
    //     transactions_checkPayment({
    //         Serial:paymentId,
    //     }).then(result=>{
    //         if(result.data.Data){
    //             SetTransactionTitle("تراکنش موفق")
    //         }else{
    //             SetTransactionTitle("تراکنش ناموفق")
    //         }
    //     }).catch(e => {
    //         try {
    //             error.showError({message: e.response.data.Message});
    //         } catch (f) {
    //             error.showError({message: "خطا نا مشخص",});
    //         }
    //     })
    // },[])

    return (
        <>
            <Grid
                sx={{height: "80vh"}}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader title={transActionTitle}/>
                    <CardContent>
                        <Box sx={{position: 'relative', display: 'inline-flex'}}>
                            <CircularProgress variant="determinate" value={(counter * 100) / 15}/>
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant={"subtitle1"} component="div" color="text.secondary">
                                    {`${Math.round(counter)}`}
                                </Typography>
                            </Box>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default connect(null, sagaActions)(Checkout);
