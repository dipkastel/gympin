import React, {useContext} from 'react';
import {Alert, Button, Card, CardContent, Container, Grid2 as Grid, TextField, Typography} from "@mui/material";
import {Support_add} from "../../network/api/support.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";

const NewSupport = () => {


    const corporate = useSelector(({corporate}) => corporate.corporate)
    const error = useContext(ErrorContext);
    const navigate = useNavigate();


    const addSupport = (e) => {
        e.preventDefault()
        if (e.target.Title.value.length > 30) {
            error.showError({message: "موضوع طولانی است",});
            return;
        }
        if (e.target.Message.value.length > 250) {
            error.showError({message: "متن تیکت طولانی است",});
            return;
        }
        e.target.btnSubmit.setAttribute("disabled", true);
        e.target.Message.setAttribute("disabled", true);
        e.target.Title.setAttribute("disabled", true);
        Support_add({
            Title: e.target.Title.value,
            Message: {
                Status: "AWAITING_EXPERT",
                Message: e.target.Message.value,
                IsRead: "true"
            },
            CorporateId: corporate.Id
        }).then(result => {
            navigate('/Support/detail/' + result.data.Data.Id, {replace: false})
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>

            <Container>

                <title>درخواست جدید پشتیبانی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>درخواست جدید پشتیبانی</Typography></Grid>
                    <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
                </Grid>


                <Grid container direction={"column"} columns={9} alignItems={"center"}>
                    <Card elevation={3} sx={{p: 2, borderRadius: 5, maxWidth: 500, width: "100%", mb: 2}}>
                        <CardContent>
                            <Typography variant={"subtitle1"} sx={{mb: 2}} xs={8}>
                                پیش از ایجاد تیکت جدید سوالات متداول را مطالعه کنید!
                            </Typography>
                            <Button fullWidth xs={4} sx={{mb: 2}} variant={"outlined"} target={"_blank"} size={"small"} href={"https://gympin.ir/faq"}>سوالات
                                متداول</Button>
                            <Alert className={"mt-2"} variant={"standard"} severity={"info"} icon={false}>مشکلات ، پرسش ها و نظرات
                                خود را برای ما ارسال کنید.</Alert>
                            <Alert className={"mt-2"} variant={"standard"} color={"info"} icon={false}>همکاران ما در اسرع وقت پاسخگوی تیکت شما خواهند بود.</Alert>
                        </CardContent>
                    </Card>


                    <Card elevation={3} sx={{p: 2, borderRadius: 5, maxWidth: 500, width: "100%", mb: 2}}>
                        <CardContent>
                            <Form onSubmit={(e) => addSupport(e)}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="موضوع"
                                    type="text"
                                    name={"Title"}
                                    fullWidth
                                    variant={"outlined"}
                                />
                                <TextField
                                    margin="dense"
                                    label="متن تیکت"
                                    type="text"
                                    name={"Message"}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    sx={{mb: 2}}
                                    variant={"outlined"}
                                />
                                <Button variant={"contained"} fullWidth name={"btnSubmit"} type={"submit"}>ایجاد پشتیبانی جدید</Button>
                            </Form>
                        </CardContent>
                    </Card>
                </Grid>


            </Container>
        </>
    );
};

export default NewSupport;
