import React, {useContext, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid, TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../helper/utils";
import {corporatePersonnel_addPersonnelCredit} from "../../../network/api/corporatePersonnel.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _UserBaseData = ({corporatePersonnel,getCorporatePerson}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);



    function renderModalAddCredit() {
        function addCredit(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: corporatePersonnel.Id},
                CreditAmount: toPriceWithoutComma(e.target.CreditAmount.value)
            })
                .then(result => {
                    getCorporatePerson();
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
                            onChange={(e) => {
                                e.target.value = toPriceWithComma(e.target.value);
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

                                {"اعتبار فعلی : " + toPriceWithComma(corporatePersonnel.TotalCredit)}
                            </Typography>
                        </>
                    )}
                    action={(<>
                        <Button variant={"contained"} onClick={() => setOpenModalAdd(true)} sx={{margin: 1}}>افزایش
                            اعتبار</Button>
                    </>)}
                />
                {corporatePersonnel.User && <CardContent>
                    <Grid container alignItems={"center"}
                          direction="column"
                          justifyContent={"center"}>
                        <Avatar alt={"userImage"} src={(corporatePersonnel.User.Avatar) ? (corporatePersonnel.User.Avatar.Url || "") : ""}
                                sx={{width: 120, height: 120}}/>

                        <Typography
                            sx={{display: "inline"}}
                            component="p"
                            variant="h6"
                            color="text.primary"
                        >
                            {corporatePersonnel.User.FullName ? corporatePersonnel.User.FullName : corporatePersonnel.User.PhoneNumber}
                        </Typography>

                    </Grid>
                </CardContent>}
            </Card>
            {renderModalAddCredit()}
        </>
    );
};

export default _UserBaseData;
