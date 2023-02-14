import React, {useContext, useEffect, useState} from 'react';
import _ScannerCore from "./scanner/_ScannerCore";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography} from "@mui/material";
import {decryptId} from "../../../helper/utils";
import _UserCard from "./user/_UserCard";
import _ByCode from "./scanner/_ByCode";
import {ticket_addEntryMessage, ticket_scanned} from "../../../network/api/ticket.api";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _GateAwaitingEntry from "./awaiting/_GateAwaitingEntry";
import {PlacesQr_getByPlace} from "../../../network/api/placeQr.api";
import {useSelector} from "react-redux";
import getAccessOf from "../../../helper/accessManager";
import {personnelAccessEnumT} from "../../../helper/enums/personnelAccessEnum";


const _Nqrscan = ({selectedTicket}) => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [scannedCode, SetScannedCode] = useState(null);
    const [ticket, SetTicket] = useState(selectedTicket);
    const [messages, SetMessages] = useState(null);
    const [openModalNewTicket, SetOpenModalNewTicket] = useState(false);
    const [openModalNewUser, SetOpenModalNewUser] = useState(false);


    useEffect(() => {
        if (openModalNewUser || openModalNewTicket) return;
        SetScannedCode(null);
    }, [openModalNewUser, openModalNewTicket]);
    useEffect(() => {
        PlacesQr_getByPlace({Id: place.Id}).then(result => {
            SetMessages(result.data.Data)
        }).catch(e => console.log(e))
    }, []);

    useEffect(() => {
        if (!scannedCode) return;
        function addMessage(codeValue) {
            if(!messages){
                error.showError({message: "پیام ها یافت نشد",})
                return;
            }
            let code = codeValue.split('-');
            let messageString = messages.find(m=>m.Text==code[0]).ReplaceText+" "+ code[1];
            ticket_addEntryMessage({Message:messageString,EntryId:ticket.Entry.Id}).then(result=>{
                SetTicket(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
        }

        var code = decryptId(scannedCode);
        var codeType = code.substring(0, 1);
        var codeValue = code.substring(1, code.length);
        switch (codeType) {
            case "1": {
                if (openModalNewTicket) return;
                if (openModalNewUser) return;
                scanTicket(codeValue);
                break;
            }
            case "2": {
                if(!ticket){
                    error.showError({message: 'بلیطی انتخاب نشده'});
                    return;
                }else {
                    addMessage(codeValue);
                }
                break;
            }
            case "3": {
                alert("User")
                break;
            }

        }
    }, [scannedCode]);

    function scanTicket(codeValue) {
        ticket_scanned({id: codeValue}).then(result => {
            enterAccepted(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }
    function enterAccepted(scannedResult){
        if (scannedResult.ScanResult=="REGISTERED") {
            if (scannedResult.UserPlaceStatus == "NEW_USER") {
                SetOpenModalNewUser(true);
            } else if (scannedResult.UserPlaceStatus == "REGISTER_BEFORE") {
                SetOpenModalNewTicket(true);
            }
        } else if (["ACCEPTED"].includes(scannedResult.ScanResult)) {
            SetTicket(scannedResult);
            error.showError({
                clickable: false,
                message: 'ورود با موفقیت ثبت شد',
            });
            setTimeout(() => {
                SetScannedCode(null);
            }, 10000);
        }

    }

    return (
        <Paper sx={{direction:"rtl"}}>
            <_UserCard ticket={ticket}/>
            <_ScannerCore scannWork={(!scannedCode)} onFind={(e) => {
                SetScannedCode(e);
            }}/>
            <_ByCode/>
            <_GateAwaitingEntry enterAccepted={enterAccepted}/>
            {openModalNewUser && renderModalNewUser()}
            {openModalNewTicket && renderModalNewTicket()}
        </Paper>
    );

    function renderModalNewUser() {
        return (
            <div>
                <Dialog fullWidth open={openModalNewUser} onClose={() => SetOpenModalNewUser(false)}>
                    <DialogTitle>ورزشکار جدید</DialogTitle>
                    <DialogContent>
                        اگر نیاز به ثبت نام روی سامانه های دیگر دارید میتوانید اطلاعات کاربر را از پروفایل او دریافت
                        کنید تا کاربر برای ثبت نام معطل نشود.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            navigate('/users/singleuser/' + ticket.User.Id, {replace: true})
                        }}>اطلاعات کاربر</Button>
                        <Button onClick={() => {
                            SetOpenModalNewUser(false);
                            var code = decryptId(scannedCode);
                            var codeValue = code.substring(1, code.length);
                            scanTicket(codeValue)
                        }}>ثبت ورود</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    function renderModalNewTicket() {
        return (
            <div>
                <Dialog fullWidth open={openModalNewTicket} onClose={() => SetOpenModalNewTicket(false)}>
                    <DialogTitle>بلیط جدید</DialogTitle>
                    <DialogContent>
                        کاربر قبلا از مجموعه شما بلیط تهیه کرده است.
                        <br/>
                        اگر نیاز به اطلاعات کاربر دارید به قسمت پروفایل کاربر مراجعه کنید.
                        <br/>
                        همینطور می توانید با ثبت ورود ادامه دهید.
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => {
                            navigate('/users/singleuser/' + ticket.User.Id, {replace: true})
                        }}>پروفایل کاربر</Button>
                        <Button onClick={() => {
                            SetOpenModalNewTicket(false);
                            var code = decryptId(scannedCode);
                            var codeValue = code.substring(1, code.length);
                            scanTicket(codeValue)
                        }}>ثبت ورود</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default _Nqrscan;
