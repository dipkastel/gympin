import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Alert,
    Button,
    Card,
    CardContent, CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    List,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {Support_add, Support_query} from "../../network/api/support.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {SupportStatus} from "../../helper/enums/SupportStatus";

const Support = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [support, SetSupport] = useState(null);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const corporate = useSelector(({corporate}) => corporate.corporate)

    useEffect(() => {
        document.title = 'پشتیبانی';
        getAllSupport();
    }, []);

    function getAllSupport() {
        Support_query({
            queryType: "FILTER",
            CorporateId: corporate.Id,
            paging: {Page: 0, Size: 50, orderBy: "Id", Desc: true}
        }).then(result => {
            SetSupport(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    function renderModalAdd() {
        const addSupport = (e) => {
            e.preventDefault()
            if(e.target.Title.value.length>30){
                error.showError({message: "موضوع طولانی است",});
                return;
            }
            if(e.target.Message.value.length>250){
                error.showError({message: "متن تیکت طولانی است",});
                return;
            }
            e.target.btnCancel.setAttribute("disabled", true);
            e.target.btnSubmit.setAttribute("disabled", true);
            e.target.Message.setAttribute("disabled", true);
            e.target.Title.setAttribute("disabled", true);
            Support_add({
                Title: e.target.Title.value,
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: e.target.Message.value,
                    IsRead:"true"
                },
                CorporateId: corporate.Id
            }).then(result => {
                navigate('/management/Support/detail/' + result.data.Data.Id, {replace: false})
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        return (
            <div>
                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form onSubmit={(e) => addSupport(e)}>
                        <DialogTitle>ایجاد تیکت جدید</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="موضوع"
                                type="text"
                                name={"Title"}
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                label="متن تیکت"
                                type="text"
                                name={"Message"}
                                fullWidth
                                multiline
                                minRows={3}
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button name={"btnCancel"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                            <Button name={"btnSubmit"} type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )

    }

    function getCollorByStatus(Status) {
        switch (Status) {
            case "COMPLETE": return "#bddcd1";
            case "CANCEL": return "#c2c2c2";
            case "AWAITING_EXPERT": return "#bdcfdc";
            case "AWAITING_USER": return "#cebddc";
            case "PROCESSING": return "#bebddc";
        }
    }

    return (
        <>

            <div>
                <div className={"section-title mt-3"}>
                    پشتیبانی
                </div>
            </div>
            <Card elevation={3} sx={{margin: 1}} >
                <CardContent>
                    <Typography item variant={"subtitle1"} xs={8}>
                        پیش از ایجاد تیکت جدید سوالات متداول را مطالعه کنید!
                    </Typography>
                    <Button fullWidth item xs={4} variant={"outlined"} size={"small"} href={"https://gympin.ir/faq"} >سوالات متداول</Button>
                    <Alert className={"mt-2"} variant={"standard"} color={"info"} icon={false} >مشکلات ، پرسش ها و نظرات خود را برای ما ارسال کنید.همکاران ما در اسرع وقت پاسخگوی تیکت شما خواهند بود.</Alert>
                    <Button className={"mt-2"} variant={"contained"} fullWidth onClick={() => setOpenModalAdd(true)}>ایجاد
                        تیکت جدید</Button>
                </CardContent>
            </Card>

            {support?.content && <>
                <div>
                    <div className={"section-title mt-4 mb-1"}>
                        پیام های پشتیبانی
                    </div>
                </div>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {support?.content.map(item => (
                        <div key={item.Id}>
                            <Link href={"/management/Support/detail/" + item.Id}
                                  sx={{width: "100%", textDecoration: "none", color: "#666666"}}>
                                <Card elevation={3} sx={{marginX: 1,mt:1,borderRadius:3}}>
                                    <CardHeader sx={{backgroundColor:getCollorByStatus(item.Status)}}
                                                title={item.Title}
                                                titleTypographyProps={{variant:"body1"}}
                                                action={item.UnreadCount>0 &&<Chip sx={{pt:"3px"}} size="small"
                                                                                   color={"error"}
                                                                                   label={item.UnreadCount}/>}
                                    />
                                </Card>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems={"top"}
                                    sx={{px:2}}
                                >
                                    <Typography sx={{color:"gray"}} variant={"overline"} >
                                        {SupportStatus[item.Status]}
                                    </Typography>
                                    <Typography sx={{color:"gray"}} variant={"overline"} >
                                        {new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </Typography>
                                </Grid>
                            </Link>
                        </div>

                    ))}

                </List>
            </>}

            {renderModalAdd()}
        </>
    );
};

export default Support;
