import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography} from "@mui/material";
import {transactions_checkPayment} from "../../network/api/transactions.api";

const Checkout = () => {

    const navigate = useNavigate()
    const {paymentId} = useParams();
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [counter,SetCounter] = useState(null);
    const [transActionTitle,SetTransactionTitle] = useState("لطفا صبر کنید");
    useEffect(() => {
        var incounter = 15;
        const interval = setInterval(() => {
            if(incounter<=0)
                navigate("/wallet");
            SetCounter(incounter--);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    var request = false;
    useEffect(()=>{
        if (request) return;
        request = true;
        transactions_checkPayment({
            Serial:paymentId,
        }).then(result=>{
            if(result.data.Data){
                SetTransactionTitle("تراکنش موفق")
            }else{
                SetTransactionTitle("تراکنش ناموفق")
            }
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    },[])

    return (
        <>
            <Grid
                sx={{height:"80vh"}}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={transActionTitle}/>
                <CardContent>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={(counter*100)/15} />
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
