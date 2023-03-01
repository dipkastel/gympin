import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {ticket_enterRequest} from "../../../network/api/tickets.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _PhoneLessEnter = ({ticket,getTicket}) => {
    const error = useContext(ErrorContext);
    const [entryList,setEntryList] = useState([]);
    const [openModalRequestEnter,setOpenModalRequestEnter] = useState(false);
    useEffect(() => {
        if(ticket.EntryList)
            setEntryList(ticket.EntryList)
    }, [ticket]);

    function renderModalRequestEnter() {
        function onConfirm(e){
            e.preventDefault();
            ticket_enterRequest(ticket).then(result=>{
                setOpenModalRequestEnter(false)
                getTicket();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return(<Dialog
            className={"w-100"}
            open={openModalRequestEnter} onClose={() => setOpenModalRequestEnter(false)}>
            <DialogTitle>تایید درخواست ورود</DialogTitle>
            <DialogContent className={"w-100"}>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    با تایید درخواست ورود به مجموعه ، یک ورود از ورود های شما کاسته میشود و درخواست برای مجموعه ارسال میگردد.
                    <br/>
                    این درخواست فقط تا 3 ساعت اعتبار دارد ، پس از آن به صورت سیستمی لغو میگردد.
                    <br/>
                    شما دیگر نیاز به همراه داشتن تلفن همراه ، برای اسکن بارکد ندارید.
                    <br/>
                    توجه داشته باشید امکان لغو درخواست ارسال شده وجود ندارد.
                    <br/>
                    درصورتی که درخواست شما ثبت گردد ، در لیست ورود ، درخواست خود را میتوانید مشاهده کنید.
                    <br/>
                    حتما از ثبت شدن درخواست خود اطمینان حاصل نمایید. در صورت ثبت نشدن درخواست ، مرکز میتواند از پذیرفتن ورود خودداری کند.
                </Typography>
                <Typography sx={{paddingBottom:1}} variant={"subtitle1"}>
                    آیا از ارسال درخواست به مجموعه اطمینان دارید؟
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"success"}
                        onClick={(e) => onConfirm(e)}>تایید درخواست</Button>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} onClick={() => setOpenModalRequestEnter(false)}> لغو </Button>
            </DialogActions>
        </Dialog>)
    }

    function canRequest() {
        if(!ticket.EntryList) return true;
        return !ticket.EntryList.some(E=>E.TicketEntryStatus=="REQUESTED");
    }

    return (
    <>
        {(ticket.Status=="ACTIVE")&&canRequest()&& <Card elevation={3} sx={{margin:1}}>
                <CardContent>

                    <Button variant={"contained"} fullWidth color={"primary"} onClick={()=>setOpenModalRequestEnter(true)} >درخواست ورود بدون تلفن همراه</Button>
                </CardContent>
            </Card>
        }
        {renderModalRequestEnter()}
    </>
    );
};

export default _PhoneLessEnter;
