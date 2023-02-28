import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    corporatePersonnel_add,
    corporatePersonnel_addPersonnelCredit,
    corporatePersonnel_getById
} from "../../network/api/corporatePersonnel.api";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider,
    Grid,
    List,
    ListItem, TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";

const SingleUser = (props) => {
    const error = useContext(ErrorContext);
    const {PersonnelId} = useParams();
    const [person,setPerson] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    useEffect(() => {
        getPerson();
    }, [PersonnelId]);

    function getPerson(){
        corporatePersonnel_getById({id:PersonnelId}).then(result=>{
            setPerson(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function renderModalAdd() {
        function addCredit(e) {
            e.preventDefault()
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: person.Id},
                CreditAmount: toPriceWithoutComma(e.target.CreditAmount.value)
            })
                .then(result => {
                    setOpenModalAdd(false);
                    getPerson();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addCredit(e)}>
                    <DialogTitle>افزودن اعتبار</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن اعتبار مبلغ را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name={"CreditAmount"}
                            label="تومان"
                            type="text"
                            onChange={(e)=>{
                                e.target.value=toPriceWithComma(e.target.value);
                            }}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }



    return (
        <>

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={(
                        <>
                            <Typography
                                sx={{display: "inline"}}
                                component="p"
                                variant="body1"
                                color="text.primary"
                            >

                                {"اعتبار فعلی : "+toPriceWithComma(person.CreditBalance)}
                            </Typography>
                        </>
                    )}
                    action={(<>
                        <Button variant={"outlined"} onClick={()=>setOpenModalAdd(true)} sx={{margin:1}}>افزایش اعتبار</Button>
                    </>)}
                />
                {person.User&&<CardContent>
                    <Grid container alignItems={"center"}
                          direction="column"
                          justifyContent={"center"}>
                        <Avatar alt={"userImage"} src={(person.User.Avatar)?(person.User.Avatar.Url||""):""}  sx={{width:120,height:120}} />

                        <Typography
                            sx={{display: "inline"}}
                            component="p"
                            variant="h6"
                            color="text.primary"
                        >
                            {person.User.FullName?person.User.FullName:person.User.PhoneNumber}
                        </Typography>

                    </Grid>
                </CardContent>}
            </Card>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"تاریخچه شارژهای کاربر"}
                />
                <CardContent>
                    <List>
                        {person.CreditList&&person.CreditList.reverse().map(item => (
                            <ListItem key={item.Id}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant={"subtitle1"}>{"افزایش : "+toPriceWithComma(item.CreditAmount)+" تومان"}</Typography>

                                    <Typography variant={"overline"}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</Typography>
                                </Grid>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>

                            </ListItem>))}
                    </List>
                </CardContent>
            </Card>
            {renderModalAdd()}
        </>
    );
};

export default SingleUser;
