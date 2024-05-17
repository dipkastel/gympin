import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, Chip, Grid, List, TextField, Typography} from "@mui/material";
import {Alert, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {Support_add, Support_addMessage, Support_getById} from "../../../network/api/support.api";
import {getSupportPersianStatus} from "../../../helper/utils";
import {ErrorContext} from "../../../components/GympinPagesProvider";
const SupportDetail = () => {
    const error = useContext(ErrorContext);
    let {supportId} = useParams()
    const [supportDetail,SetSupportDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'جزئیات پشتیبانی';
        getSupportDetail()
    }, []);
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
        Support_addMessage({
            SupportId:supportId,
            Status:"AWAITING_EXPERT",
            Message:e.target.message.value
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
            Message:"لغو تیکت"
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

    return (
        <Grid height={"100%"}>
            <Card elevation={3} sx={{margin:1}}>
                <CardHeader
                    title={supportDetail&&supportDetail.Title||""}
                    action={(
                        <>
                            <Button onClick={e=>CloseSupport(e)} variant={"outlined"}>لغو تیکت</Button>
                        </>
                    )}
                />
                <CardContent>
                    <Typography variant="body2">در صورتی که مشکل حل شده است و یا دیگر نیاز به پیگیری از سمت جیم پین ندارد میتوانید تیکت را ببندید.</Typography>
                </CardContent>
            </Card>
            <Card elevation={3} sx={{margin:1}}>
                <CardHeader
                    title={"افزودن یادداشت"}
                />
                <CardContent>
                    <Form onSubmit={e=>sendMessage(e)}>
                        <TextField
                            className="w-100"
                            aria-multiline
                            variant="outlined"
                            margin="normal"
                            name="message"
                            type="text"
                            label={"یادداشت جدید"}
                            multiline
                        />
                        <Button type={"submit"} variant={"contained"} fullWidth>ارسال</Button>
                    </Form>
                </CardContent>
            </Card>
            <List>
                {supportDetail&&supportDetail.Messages.reverse().map(item=>(
                        <Alert key={item.id} variant={item.IsAnswer?"info":"warning"} className={"m-2"}>
                            <Typography variant={"body2"}>{item.Message}</Typography>
                            {item?.CreatorUser&&"-"+<Typography variant={"caption"} component={"span"}>{item?.CreatorUser?.Username}</Typography>+"-"}
                                <Typography variant={"caption"} component={"p"}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</Typography>
                        </Alert>
                ))}

            </List>
        </Grid>
    );
};

export default SupportDetail;
