import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip, CircularProgress,
    Grid,
    IconButton,
    List,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {
    Support_add,
    Support_addMessage,
    Support_getById,
    Support_setMessagesRead
} from "../../../network/api/support.api";
import {getSupportPersianStatus} from "../../../helper/utils";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {ChevronLeft, Send} from "@mui/icons-material";
const SupportDetail = () => {
    const error = useContext(ErrorContext);
    let {supportId} = useParams()
    const [supportDetail,SetSupportDetail] = useState(null);
    const [loading,SetLoading] = useState(true);
    const navigate = useNavigate();
    const listRef = useRef(null);

    useEffect(() => {
        document.title = 'جزئیات پشتیبانی';
        setReadMessages();
    }, []);
    useEffect(() => {
        //scroll down
        window.scrollBy(0,1500000);
    }, [supportDetail]);
    function setReadMessages() {
        Support_setMessagesRead({id:supportId}).then(result=>{
            getSupportDetail();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getSupportDetail(){

        Support_getById({id:supportId}).then(result=>{
            SetSupportDetail(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function sendMessage(e){
        e.preventDefault()
        if(!e.target.message.value){
            error.showError({message: "پیام را وارد نمایید",});
            return;
        }
        Support_addMessage({
            SupportId:supportId,
            Status:"AWAITING_EXPERT",
            Message:e.target.message.value,
            IsRead:true
        }).then(result=>{
            e.target.message.value = ""
            getSupportDetail()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function CloseSupport(e){
        e.preventDefault()
        Support_addMessage({
            SupportId:supportId,
            Status:"CANCEL",
            Message:"لغو تیکت",
            IsRead:true
        }).then(result=>{
            navigate('/management/support', {replace: true});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return !supportDetail?(<>
        <Grid
            container
            sx={{width:"100%",height:"80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CircularProgress />
        </Grid>
    </>):(

        <Grid>

            {(supportDetail?.Status!=="COMPLETE"&&supportDetail?.Status!=="CANCEL")&&<Alert icon={false} variant={"standard"} color={"info"} className={"m-2"}>
                <Typography variant="body2">در صورتی که مشکل حل شده است و یا دیگر نیاز به پیگیری از سمت جیم پین ندارد
                    میتوانید تیکت را ببندید.</Typography>

                <Button sx={{mt: 1}} fullWidth onClick={e => CloseSupport(e)} variant={"outlined"}>لغو تیکت</Button>
            </Alert>}
            {supportDetail&&<div>
                <div className={"section-title mt-3 me-3"}>
                    <Typography variant={"body2"}>{supportDetail.Title}</Typography>

                </div>
            </div> }
            <List ref={listRef} sx={supportDetail?.Status!=="COMPLETE"&&{mb:8}}>
                {supportDetail&&supportDetail.Messages.map(item=>(
                    <div key={item.id}>
                        <Alert sx={item.IsAnswer?{m:"10px 30px 0px 3px",backgroundColor:"#dde5db",color:"#5c725c"}:{margin:"10px 3px 0px 30px",backgroundColor:"#ddebee",color:"#687b88"}}   variant={"filled"} icon={false}>
                            <Typography variant={"body2"}>{item.Message}</Typography>
                            {item?.CreatorUser&&"-"+<Typography variant={"caption"} component={"span"}>{item?.CreatorUser?.Username}</Typography>+"-"}

                        </Alert>
                        <Typography variant={"overline"} sx={{mt:-0.6,ml:5,mr:5,textAlign:item.IsAnswer?"start":"end"}} component={"p"}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</Typography>
                    </div>
                ))}

            </List>
            {(supportDetail?.Status!=="COMPLETE"&&supportDetail?.Status!=="CANCEL")&&<div className={"messagebox"}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent sx={{p: 1, paddingBottom: "8px !important"}}>
                        <Form onSubmit={e => sendMessage(e)}>
                            <Grid container direction={"row"} spacing={1} alignItems={"center"}>
                                <Grid item xs={10}>
                                    <TextField
                                        className={"rtl m-0"}
                                        fullWidth
                                        aria-multiline
                                        variant="outlined"
                                        margin="normal"
                                        name="message"
                                        size={"small"}
                                        type="text"
                                        label={"پیام جدید"}
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button sx={{mt: 0, minWidth: 0}} type={"submit"} size={"large"}
                                            variant={"contained"} fullWidth><ChevronLeft/></Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </CardContent>
                </Card>
            </div>}

        </Grid>
    );
};

export default SupportDetail;
