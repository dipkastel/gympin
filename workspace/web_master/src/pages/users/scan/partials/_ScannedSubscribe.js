import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    ListItemText,
    Typography
} from "@mui/material";
import {
    purchasedSubscribe_addEnterToSubscribe,
    purchasedSubscribe_getById
} from "../../../../network/api/subscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const _ScannedSubscribe = ({codeResult, SetScannedCode,selectSubscribe}) => {

    const [purchasedSubscribe, setPurchasedSubscribe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);


    useEffect(() => {
        purchasedSubscribe_getById({id: codeResult.ReferenceId}).then(result => {
            setLoading(false);
            setPurchasedSubscribe(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, [codeResult])

    function setUserEnter() {
        setLoading(true);
        purchasedSubscribe_addEnterToSubscribe({
            Id: purchasedSubscribe.Id,
            User: {Id: currentUser.Id}
        }).then(result => {
            selectSubscribe(purchasedSubscribe);
            SetScannedCode(null);
        }).catch(e => {
            selectSubscribe(null);
            SetScannedCode(null);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function selectThisSubscribe(){
        selectSubscribe(purchasedSubscribe);
        SetScannedCode(null);
    }

    return (
        <>


            <Dialog fullWidth maxWidth={"xl"} open={!!codeResult} onClose={() => SetScannedCode(null)}>
                {!loading ? <>
                    <DialogTitle sx={{m: 0, p: 1, backgroundColor: "gray", color: "white"}}>
                        <Grid sx={{px: 2}} direction={"row"} container alignContent={"center"}
                              alignItems={"center"}
                              justifyContent={"space-between"}>
                            <Grid item>عضویت</Grid>
                            <Grid item><Typography variant="body2">{codeResult.QrCode}</Typography></Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent sx={{m: 0, p: 1}} dividers>
                        <Grid onClick={() => {
                            navigate('/users/singleuser?id=' + purchasedSubscribe.User.Id, {replace: true})
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
                                      secondary={SubscribeStatusEnum[purchasedSubscribe.Status]}/>
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
                                      secondary={`جلسه ${purchasedSubscribe.EntryList.length} از ${purchasedSubscribe.EntryTotalCount}`}
                        />
                        {purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.EntryMessageList?.map((item, number) => (
                            <Typography sx={{width: "100%"}} key={"message-" + number}
                                        variant="body2">{item.Message}</Typography>
                        ))}
                    </DialogContent>

                    <DialogActions sx={{m: 0, p: 1}}>

                        <Grid wrap="nowrap" sx={{mb: 1, px: 2}} direction={"column"} container alignContent={"center"}
                              alignItems={"center"}
                              justifyContent={"space-around"}>

                            <Button
                                variant={"contained"}
                                fullWidth
                                sx={{mb: 1}}
                                hidden={purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.EnterDate&&!purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.ExitDate}
                                onClick={() => setUserEnter()}>ثبت ورود</Button>
                            <Button
                                variant={"contained"}
                                fullWidth
                                hidden={!(purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.EnterDate&&!purchasedSubscribe?.EntryList?.slice(-1)?.[0]?.ExitDate)}
                                onClick={() => {selectThisSubscribe()
                                }}>انتخاب کاربر</Button>

                        </Grid>
                    </DialogActions>
                </> : <Grid sx={{height: "180px"}} container
                            alignContent={"center"}
                            justifyContent={"center"}
                            direction={"row"}><CircularProgress/></Grid>

                }
            </Dialog>
        </>
    );
};

export default _ScannedSubscribe;
