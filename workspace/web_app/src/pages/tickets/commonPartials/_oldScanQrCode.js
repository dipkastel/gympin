import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {CropFree} from "@mui/icons-material";
import {link_getByCode} from "../../../network/api/link.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {purchasedSubscribe_addEnterToSubscribe} from "../../../network/api/purchasedSubscribe.api";
import {useSelector} from "react-redux";
import Lottie from "react-lottie";
import check from "./check.json";
import done from "./done.json";
import _ScannerCore from "../../qrCode/scanner/_ScannerCore";

const _ScanQrCode = ({ticket,userCanEnter,type}) => {

    const error = useContext(ErrorContext);
    const {firstLogin} = useState(ticket?.EntryList?.length>0)
    const [scannedCode, SetScannedCode] = useState(null);
    const [placeId, SetPlaceId] = useState(null);
    const [paymentSerial, SetpaymentSerial] = useState(null);
    const currentUser = useSelector(state => state.auth.user)

    const checkOptions = {
        loop: true,
        autoplay: true,
        animationData: check,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const doneOptions = {
        loop: false,
        autoplay: true,
        animationData: done,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        if(!!scannedCode)
            getPlaceId();
    }, [scannedCode]);

    useEffect(() => {
        if(placeId&&placeId.toString()!=ticket.TicketSubscribe.Place.Id.toString()){
            SetPlaceId(null);
            SetScannedCode(null);
            error.showError({message: "بلیط مربوط به این مرکز نیست !",});
        }else {

        }
    }, [placeId]);


    function getPlaceId(){
        link_getByCode({code:scannedCode}).then(result => {
            SetPlaceId(result.data.Data.Value1)
        }).catch(e => {
            SetScannedCode(null);
            SetPlaceId(null);
            try {
                error.showError({message: "کد نامعتبر",});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function actionOnScan(scanText){
        if(scanText.startsWith("http"))
            return scanText.split('/')[scanText.split('/').length-1]
        return scanText;
    }



    function renderModalScan() {
        function handleSubmit(e){
            e.preventDefault();
            SetPlaceId(null);
            error.showError({message: "لطفا صبر کنید",});
            purchasedSubscribe_addEnterToSubscribe({
                Id: ticket.Id,
                User: {Id: currentUser.Id}
            }).then(result => {
                SetScannedCode(null);
                SetpaymentSerial(result.data.Data.Serial.filter(s=>s.ProcessType=="TRA_USE_TICKET")[0]);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }
        function handleNewSubmit(e){
            e.preventDefault();
            SetPlaceId(null);
            error.showError({message: "لطفا صبر کنید",});
            purchasedSubscribe_addEnterToSubscribe({
                Id: ticket.Id,
                User: {Id: currentUser.Id}
            }).then(result => {
                SetPlaceId(null);
                SetScannedCode(null);
                error.showError({message: "ورود شما با موفقیت ثبت شد",});
            }).catch(e => {
                SetPlaceId(null);
                SetScannedCode(null);
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        return(
            <Dialog
                open={!!scannedCode}
                onClose={() => SetScannedCode(null)}
            >
                {placeId&&firstLogin&&<>
                    <DialogTitle>ثبت اولین ورود و پرداخت به مجموعه</DialogTitle>
                    <DialogContent>
                        <Alert sx={{mt:1}} severity={"warning"} variant={"outlined"} >تایید این پیام به منزله پرداخت به مجموعه میباشد و پس از آن وجه پرداختی به هیچ عنوان عودت نخواهد شد!</Alert>
                        <Alert sx={{mt:1}} severity={"info"} variant={"outlined"} >آیا از ثبت اولین ورود و پرداخت به مجموعه اطمینان دارید؟</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ m: 1,p:3 }} fullWidth variant="contained" color="success" onClick={handleSubmit}>
                            تایید و ثبت اولین ورود
                        </Button>
                    </DialogActions>
                </>}
                {placeId&&!firstLogin&&<>
                    <DialogTitle>ثبت ورود</DialogTitle>
                    <DialogContent>
                        <Alert sx={{mt:1}} severity={"success"} variant={"outlined"} >ورزش خوبی داشته باشید!</Alert>
                        <Lottie
                            options={doneOptions}
                            height={400}
                            width={400}>
                        </Lottie>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ m: 1,p:3 }} fullWidth variant="contained" color="success" onClick={handleNewSubmit}>
                            تایید و ثبت ورود
                        </Button>
                    </DialogActions>
                </>}
                {!placeId&&<>
                    <DialogTitle>صبر کنید...</DialogTitle>
                    <DialogContent>
                        <Typography variant={"subtitle1"}>در حال دریافت اطلاعات بلیط و مجموعه ...</Typography>
                        <Grid container justifyContent={"center"}>
                            <CircularProgress sx={{p: 1,m:2}} size={"3rem"} color={"inherit"}/>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ m: 1,p:3 }} disabled fullWidth variant="contained" color="success" onClick={handleSubmit}>
                            ثبت اولین ورود
                        </Button>
                    </DialogActions>
                </>}
            </Dialog>)
    }

    function renderModalSuccessPay() {
        return(
            <Dialog
                open={!!paymentSerial}
            >
                    <DialogTitle>پرداخت موفق</DialogTitle>
                    <DialogContent>
                        <Alert sx={{mt:1}} severity={"success"} variant={"outlined"} >
                            {"پرداخت شما با موفقیت انجام شد"}
                        </Alert>
                        <Lottie
                            options={checkOptions}
                            height={400}
                            width={400}>
                        </Lottie>

                        <Alert sx={{mt:1,"& .MuiAlert-message": {
                                width: "100%",
                            }}} severity={"success"} variant={"outlined"} >
                            {"کد پیگیری پرداخت : "}
                            <Typography variant={"h3"} sx={{mt:1,width:"100%",textAlign:"center",fontWeight: 900}} >{paymentSerial?.Serial?.split('-')[paymentSerial.Serial.split('-').length-1]}</Typography>
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ m: 1,p:3 }} fullWidth variant="contained" color="success" onClick={(e)=>SetpaymentSerial(null)}>
                            بستن
                        </Button>
                    </DialogActions>
            </Dialog>)
    }

    return (
        <div>
            <Alert sx={{m:1}} variant={"outlined"} severity={"info"} icon={<CropFree />} >لطفا qr کد جیم پین داخل مجموعه را اسکن کنید</Alert>
            <_ScannerCore scannWork={(!scannedCode)} actionOnScan={actionOnScan} onFind={(e) => {
                if(!scannedCode)
                    SetScannedCode(e);
            }}/>
            {renderModalScan()}
            {renderModalSuccessPay()}
        </div>
    );
};

export default _ScanQrCode;
