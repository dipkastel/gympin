import React, {useContext, useEffect, useState} from 'react';
import _ScannerCore from "./scanner/_ScannerCore";
import {
    Button,
    Card,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper
} from "@mui/material";
import {decryptId} from "../../../helper/utils";
import _UserCard from "./user/_UserCard";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _HallAwaitingEntry from "./awaitingEnter/_HallAwaitingEntry";
import {PlacesQr_getByPlace} from "../../../network/api/placeQr.api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _HallEntered from "./EnteredUsers/_HallEntered";
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import _ScannedSubscribe from "./partials/_ScannedSubscribe";
import _ScannedUser from "./partials/_ScannedUser";


const ScanPage = ({selectedSubscribe}) => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)


    const [scannedCode, SetScannedCode] = useState(null);
    const [codeResult, SetCodeResult] = useState({});

    const [subscribe, SetSubscribe] = useState(selectedSubscribe);
    const [messages, SetMessages] = useState(null);
    const [openModalNewSubscribe, SetOpenModalNewSubscribe] = useState(false);
    const [openModalNewUser, SetOpenModalNewUser] = useState(false);

    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

    useEffect(() => {
        if (openModalNewUser || openModalNewSubscribe) return;
        SetScannedCode(null);
    }, [openModalNewUser, openModalNewSubscribe]);

    useEffect(() => {
        if (!place) return;
        PlacesQr_getByPlace({Id: place.Id}).then(result => {
            SetMessages(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);

    useEffect(() => {
        if (scannedCode)
            codeChanged();
    }, [scannedCode]);

    function codeChanged() {

        qrCode_getCode({
            Code: scannedCode
        }).then(result => {
             SetCodeResult(result.data.Data);
        }).catch(e => {
            try {
                SetScannedCode(null)
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    // function scanSubscribe(codeValue) {
    //     purchasedSubscribe_scanned({id: codeValue}).then(result => {
    //         selectSubscribe(result.data.Data)
    //     }).catch(e => {
    //         try {
    //             error.showError({message: e.response.data.Message,});
    //         } catch (f) {
    //             error.showError({message: "خطا نا مشخص",});
    //         }
    //     })
    // }

    function selectSubscribe(selectedSubscribe) {

        SetSubscribe(selectedSubscribe);
        // if (scannedResult.ScanResult=="REGISTERED") {
        //     if (scannedResult.UserPlaceStatus == "NEW_USER") {
        //         SetOpenModalNewUser(true);
        //     } else if (scannedResult.UserPlaceStatus == "REGISTER_BEFORE") {
        //         SetOpenModalNewSubscribe(true);
        //     }
        // } else if (["ACCEPTED"].includes(scannedResult.ScanResult)) {
        //     error.showError({
        //         clickable: false,
        //         message: 'ورود با موفقیت ثبت شد',
        //     });
        //     setTimeout(() => {
        //         SetScannedCode(null);
        //     }, 10000);
        // }

    }

    // function renderModalNewUser() {
    //     return (
    //         <div>
    //             <Dialog fullWidth open={openModalNewUser} onClose={() => SetOpenModalNewUser(false)}>
    //                 <DialogTitle>ورزشکار جدید</DialogTitle>
    //                 <DialogContent>
    //                     اگر نیاز به ثبت نام روی سامانه های دیگر دارید میتوانید اطلاعات کاربر را از پروفایل او دریافت
    //                     کنید تا کاربر برای ثبت نام معطل نشود.
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={() => {
    //                         console.log(subscribe);
    //                         navigate('/users/singleuser/' + subscribe.User.Id, {replace: true})
    //                     }}>اطلاعات کاربر</Button>
    //                     <Button onClick={() => {
    //                         SetOpenModalNewUser(false);
    //                         var code = decryptId(scannedCode);
    //                         var codeValue = code.substring(1, code.length);
    //                         scanSubscribe(codeValue);
    //                     }}>ثبت ورود</Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     )
    // }
    //
    // function renderModalNewSubscribe() {
    //     return (
    //         <div>
    //             <Dialog fullWidth open={openModalNewSubscribe} onClose={() => SetOpenModalNewSubscribe(false)}>
    //                 <DialogTitle>عضویت جدید</DialogTitle>
    //                 <DialogContent>
    //                     کاربر قبلا در مجموعه شما عضویت داشته است.
    //                     <br/>
    //                     اگر نیاز به اطلاعات کاربر دارید به قسمت پروفایل کاربر مراجعه کنید.
    //                     <br/>
    //                     همینطور می توانید با ثبت ورود ادامه دهید.
    //                 </DialogContent>
    //
    //                 <DialogActions>
    //                     <Button onClick={() => {
    //                         console.log(subscribe);
    //                         navigate('/users/singleuser/' + subscribe.User.Id, {replace: true})
    //                     }}>پروفایل کاربر</Button>
    //                     <Button onClick={() => {
    //                         SetOpenModalNewSubscribe(false);
    //                         var code = decryptId(scannedCode);
    //                         var codeValue = code.substring(1, code.length);
    //                         scanSubscribe(codeValue);
    //                     }}>ثبت ورود</Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     )
    // }


    function renderScannedCode() {


        function getScannedPage() {

            switch (codeResult.Type){
                case "SUBSCRIBE": return <_ScannedSubscribe codeResult={codeResult}  selectSubscribe={selectSubscribe} SetScannedCode={SetScannedCode}/>
                case "User": return <_ScannedUser codeResult={codeResult} selectSubscribe={selectSubscribe}/>
                case "default": return <Grid sx={{height: "240px"}} className={"rtl"} container
                                             alignContent={"center"}
                                             justifyContent={"center"}
                                             direction={"row"}><CircularProgress/></Grid>
            }
        }

        return getScannedPage();
    }

    return (
        <>
            {!updatePageP &&
            <Paper sx={{direction: "rtl"}}>
                <_UserCard subscribe={subscribe}/>
                {scannedCode ? <Card sx={{m: 1}} elevation={3}><Grid sx={{height: "240px"}} className={"rtl"} container
                                                                     alignContent={"space-around"}
                                                                     justifyContent={"space-around"}
                                                                     direction={"row"}><CircularProgress/></Grid></Card> :
                    <_ScannerCore scannWork={(!scannedCode)} onFind={(e) => {
                        SetScannedCode(e);
                    }}/>}

                <Grid className={"rtl"} container alignContent={"space-around"} justifyContent={"space-around"}
                      direction={"row"}>
                    <Grid item xs={4}>
                        <_HallAwaitingEntry selectSubscribe={selectSubscribe} updatePage={updatePage}/>
                    </Grid>
                    <Grid item xs={4}>
                        <_HallEntered selectSubscribe={selectSubscribe} updatePage={updatePage}/>
                    </Grid>

                </Grid>

                {/*{openModalNewUser && renderModalNewUser()}*/}
                {/*{openModalNewSubscribe && renderModalNewSubscribe()}*/}
                {scannedCode && renderScannedCode()}
            </Paper>}
        </>
    );
};

export default ScanPage;
