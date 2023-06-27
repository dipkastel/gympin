import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {shallowEqual, useSelector} from "react-redux";
import {Support_add, Support_getAll} from "../../network/api/support.api";
import {getSupportPersianStatus} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Support = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [support, SetSupport] = useState([]);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const place = useSelector(({place}) => place.place)

    useEffect(() => {
        getAllSupport();
    }, []);
    function getAllSupport(){
        Support_getAll({Id: place.Id}).then(result => {
            SetSupport(result.data.Data.reverse());
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    function renderModalAdd() {
        const addSupport = (e)=>{
            e.preventDefault()
            e.target.btnCancel.setAttribute("disabled",true);
            e.target.btnSubmit.setAttribute("disabled",true);
            e.target.Message.setAttribute("disabled",true);
            e.target.Title.setAttribute("disabled",true);
            Support_add({Title:e.target.Title.value,
                Message:{
                    Status:"NEW",
                    Message:e.target.Message.value
                },
                PlaceId:place.Id
            }).then(result=>{
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
                <Dialog open={openModalAdd} onClose={()=>setOpenModalAdd(false)}>
                    <Form onSubmit={(e)=>addSupport(e)}>
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
                            <Button name={"btnCancel"} onClick={()=>setOpenModalAdd(false)}>لغو</Button>
                            <Button name={"btnSubmit"} type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )

    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"پشتیبانی"}
                    action={(
                        <Button variant={"outlined"} onClick={()=>setOpenModalAdd(true)}>ایجاد تیکت جدید</Button>
                    )}
                />
                <CardContent>
                    <Typography variant={"body1"}>شما می توانید سوالات متداول را در <a target={"_blank"} href={"https://gympin.ir/faq"}> اینجا </a>مطالعه کنید .</Typography>
                    <br/>
                    <Typography variant={"body1"}>مشکلات ، پرسش ها و نظرات خود را برای ما ارسال کنید.</Typography>
                    <br/>
                    <Typography variant={"body2"}>همکاران ما در اسرع وقت پاسخگوی تیکت شما خواهند بود</Typography>
                </CardContent>
            </Card>

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"لیست تیکت ها"}
                />
                <CardContent>

                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {support.map(item => (
                            <ListItem key={item.Id} alignItems="flex-start">
                                <Link href={"/management/Support/detail/" + item.Id}
                                      sx={{width: "100%", textDecoration: "none", color: "#666666"}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <ListItemText
                                            className="text-start"
                                            primary={item.Title}
                                            secondary={new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}/>
                                        <Grid>
                                            <Chip size="small"
                                                  color={item.Messages[item.Messages.length - 1].Status === "COMPLETE" ? "success" : "warning"}
                                                  label={getSupportPersianStatus(item.Messages[item.Messages.length - 1].Status)}/>
                                        </Grid>


                                    </Grid>
                                    <Divider variant="inset" component="div"/>
                                </Link>
                            </ListItem>
                        ))}

                    </List>
                </CardContent>
            </Card>
            {renderModalAdd()}
        </>
    );
};

export default Support;
