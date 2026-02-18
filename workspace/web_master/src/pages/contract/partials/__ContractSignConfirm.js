import React, {useContext, useState} from 'react';
import {Form} from "react-bootstrap";
import {Button, Dialog, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {gym_sendContractCode, gym_SignContract} from "../../../network/api/place.api";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const __ContractSignConfirm = ({contract,place,setCurrentMood}) => {

    const error = useContext(ErrorContext);
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");

    function sendCode(e) {
        e.preventDefault()
        gym_sendContractCode({
            PlaceId: place.Id
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
        gym_SignContract({
            Id: place.Id,
            SignCode: code,
            HasContract:true
        }).then(result => {
            if (result.data.Data){
                setCurrentMood("done")
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

    const signItem = (e)=>{
        e.preventDefault()
    }
    return (
        <Dialog open={true} >
            <Form onSubmit={(e)=>signItem(e)}>
                <DialogContent>
                    <Grid>
                        {codeSent &&
                        <>
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
                                <Button onClick={(e)=> confirmCode(e)} fullWidth variant={"contained"} color={"primary"}>تایید نهایی</Button>
                        </>
                        }
                        {!codeSent &&
                        <>
                            <Typography sx={{mt: 1, mb: 3}} variant={"subtitle1"}>
                                {"برای امضای دیجیتال لازم است یک کد 4 رقمی به شماره "}
                                {contract.ownerPhoneNumber}
                                {" ارسال شود"}
                            </Typography>
                            <Button onClick={(e) => sendCode(e)} fullWidth variant={"contained"} color={"primary"}>ارسال کد</Button>
                        </>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setCurrentMood('')}>لغو</Button>
                    <Button type={"submit"}>تایید</Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default __ContractSignConfirm;
