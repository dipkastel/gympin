import React, {useContext, useEffect, useState} from 'react';
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    ListItemText,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router";
import {purchasedSubscribe_addEnterToSubscribe, purchasedSubscribe_getByKey} from "../../../network/api/subscribe.api";
import {SubscribeStatusEnum} from "../../../helper/enums/SubscribeStatusEnum";
import {useSelector} from "react-redux";

const _UserEnterRequest = ({enterRequestCode, SetEnterRequestCode}) => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const currentUser = useSelector(({auth}) => auth.user);
    const [codeResult, SetCodeResult] = useState(null)
    const [purchasedSubscribe, setPurchasedSubscribe] = useState(null)

    useEffect(() => {
        if (enterRequestCode)
            getCodeResult();
    }, [enterRequestCode]);

    useEffect(() => {
        if(codeResult)
            getPurchasedFromCodeResult();
    }, [codeResult]);

    function getCodeResult() {
        qrCode_getCode({
            Code: enterRequestCode
        }).then(result => {
            SetCodeResult(result.data.Data);
        }).catch(e => {
            try {
                SetEnterRequestCode(null)
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getPurchasedFromCodeResult() {
        purchasedSubscribe_getByKey({key: codeResult?.Description}).then(result => {
            setPurchasedSubscribe(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
    function isUserInPlace() {
        return !!purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.EnterDate && !purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.ExitDate;
    }

    function setUserEnter() {
        purchasedSubscribe_addEnterToSubscribe({
            Id: purchasedSubscribe.Id,
            User: {Id: currentUser.Id}
        }).then(result => {
            SetEnterRequestCode(null);
            setPurchasedSubscribe(null);
            SetCodeResult(null);
        }).catch(e => {
            SetEnterRequestCode(null);
            setPurchasedSubscribe(null);
            SetCodeResult(null);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function closeModal(){
        SetEnterRequestCode(null);
        setPurchasedSubscribe(null);
        SetCodeResult(null);
    }

    return (
        <>

            <Dialog open={!!codeResult}  onClose={() => closeModal()}>
                {!!purchasedSubscribe ? <>
                    <DialogTitle sx={{m: 0, p: 1, backgroundColor: "gray", color: "white"}}>
                        <Grid sx={{px: 2}} direction={"row"} container alignContent={"center"}
                              alignItems={"center"}
                              justifyContent={"space-between"}>
                            <Grid item>عضویت</Grid>
                            <Grid item><Typography variant="body2">{codeResult?.QrCode}</Typography></Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent sx={{m: 0, p: 1}} dividers>
                        <Grid onClick={() => {
                            navigate('/users/singleuser/' + purchasedSubscribe?.User?.Username, {replace: true})
                        }} wrap="nowrap" sx={{mb: 1, px: 2}} direction={"row"} container alignContent={"center"}
                              alignItems={"center"}
                              justifyContent={"start"}>
                            <Avatar sx={{width: "70px", height: "70px"}} alt={purchasedSubscribe?.User?.FullName}
                                    src={purchasedSubscribe?.User?.Avatar?.Url}/>
                            <ListItemText sx={{m: 1}} primaryTypographyProps={{variant: "body2"}}
                                          secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                          primary={purchasedSubscribe?.User?.FullName}
                                          secondary={purchasedSubscribe?.User?.Username}/>

                        </Grid>

                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>


                        <ListItemText primary={purchasedSubscribe?.Name}
                                      secondary={SubscribeStatusEnum[purchasedSubscribe?.Status]}/>
                        <ListItemText primaryTypographyProps={{variant: "body2"}}
                                      primary={`انقضا : ${new Date(purchasedSubscribe.ExpireDate).toLocaleDateString('fa-IR', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: "2-digit",
                                          minute: "2-digit"
                                      })}`}
                                      secondary={purchasedSubscribe?.Serial?.Serial}/>
                        <ListItemText primaryTypographyProps={{variant: "body2"}}
                                      secondaryTypographyProps={{variant: "body2"}} display={"contents"}
                                      secondary={`جلسه ${isUserInPlace() ? purchasedSubscribe?.EntryList?.length : purchasedSubscribe?.EntryList?.length + 1} از ${purchasedSubscribe?.EntryTotalCount}`}
                        />
                        {purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.EntryMessageList?.map((item, number) => (
                            <Typography sx={{width: "100%"}} key={"message-" + number}
                                        variant="body2">{item?.Message}</Typography>
                        ))}
                        <Button
                            variant={"contained"}
                            fullWidth
                            sx={{mt: 3,}}
                            hidden={isUserInPlace()}
                            onClick={() => setUserEnter()}>ثبت ورود</Button>
                    </DialogContent>

                </> : <Grid sx={{height: "180px"}} container
                            alignContent={"center"}
                            justifyContent={"center"}
                            direction={"row"}><CircularProgress/></Grid>

                }
            </Dialog>

        </>
    );
};

export default _UserEnterRequest;
