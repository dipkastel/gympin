import React, {useContext, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Button, Card, CardContent, CardHeader, Grid, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporate_sendContractCode, corporate_SignContract} from "../../../network/api/corporate.api";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";

const _WizardSignContract = ({contract,corporate,onNext}) => {

    const error = useContext(ErrorContext);
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");

    function sendCode(e) {
        e.preventDefault()
        corporate_sendContractCode({
            CorporateId: corporate.Id
        }).then(result => {
            if (result.data.Data)
                setCodeSent(result.data.Data);
            else
                error.showError({message: "این سرویس موقتا قطع می باشد لطفا یک ساعت دیگر مجدد تلاش نمایید",});

        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function confirmCode(e) {
        e.preventDefault();
        corporate_SignContract({
            Id: corporate.Id,
            SignCode: code,
            HasContract:true
        }).then(result => {
            if (result.data.Data){
                store.dispatch(sagaActions.RequestCorporate(corporate));
                onNext()
                return;
            }
            error.showError({message: "کد نامعتبر",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
    return (
        <>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{borderRadius: 3, margin: 1}}>
                    <CardHeader
                        sx={{backgroundColor: "#e7333e", color: "#ffffff"}}
                        title={"ارسال کد"}/>
                    <CardContent>
                        <Typography sx={{mt: 1, mb: 3}} variant={"subtitle1"}>
                            {"برای امضای دیجیتال لازم است یک کد 4 رقمی به شماره "}
                            {contract.ownerPhoneNumber}
                            {" ارسال شود"}
                        </Typography>
                        <Button disabled={codeSent} onClick={(e) => sendCode(e)} fullWidth variant={"contained"} color={"primary"}>ارسال کد</Button>
                    </CardContent>
                </Card>
            </Grid>
            {codeSent && <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="امضا"/>
                    <CardContent>

                        <Form onSubmit={(e) => confirmCode(e)}>

                            <Typography sx={{mt: 1, mb: 3}} variant={"subtitle1"}>
                                {"کد ارسال شده به شماره "}
                                {contract.ownerPhoneNumber}
                                {" را در فیلد زیر وارد نمایید"}
                            </Typography>


                            <TextField
                                autoFocus
                                margin="dense"
                                label="opt code"
                                type={"number"}
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                fullWidth
                                variant={"outlined"}
                            />

                            <Button type={"submit"} fullWidth variant={"contained"} color={"primary"}>تایید نهایی</Button>
                        </Form>
                    </CardContent>
                </Card>
            </Grid>}
        </>
    );
};

export default _WizardSignContract;
