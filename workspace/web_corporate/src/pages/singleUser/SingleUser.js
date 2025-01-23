import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {corporatePersonnel_addPersonnelCredit, corporatePersonnel_getById} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import _UserDelete from "./partials/_UserDelete";
import _UserGroup from "./partials/_UserGroup";
import _UserCredits from "./partials/_UserCredits";
import _UserBaseData from "./partials/_UserBaseData";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2 as Grid,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "react-bootstrap";

const SingleUser = () => {

    const navigate = useNavigate();
    const {PersonnelId} = useParams();
    const error = useContext(ErrorContext);
    const [corporatePersonnel, setCorporatePersonnel] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        document.title = 'اعتبارهای کاربر';
        getCorporatePerson();
    }, [PersonnelId]);


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


    function getCorporatePerson() {
        if (!PersonnelId) return;
        corporatePersonnel_getById({id: PersonnelId}).then(result => {
            setCorporatePersonnel(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (
        <>

            <Container>
                <title>مشخصات کارمند</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid sx={{p: 4}} textAlign={"start"} size={{md: 6, lg: 6, xl: 6}}>
                        <Typography variant={"h4"}>
                            {corporatePersonnel.User.FullName ? corporatePersonnel.User.FullName : corporatePersonnel.User.PhoneNumber}
                        </Typography>
                        <Typography variant={"body2"}>
                            {"اعتبار فعلی : " + toPriceWithComma(corporatePersonnel.TotalCredit)}
                        </Typography>
                    </Grid>
                    <Grid sx={{p: 4}} textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}>
                        <Button onClick={() => setOpenModalAdd(true)} variant={"contained"}>افزایش اعتبار</Button>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid size={{md: 6}}>

                        <Grid container>
                            <Grid size={{md: 6}}>

                                {corporatePersonnel &&
                                <_UserBaseData corporatePersonnel={corporatePersonnel} getCorporatePerson={getCorporatePerson}/>}

                            </Grid>
                            <Grid size={{md: 6}}>
                                {corporatePersonnel && <_UserGroup corporatePersonnel={corporatePersonnel}/>}
                                {corporatePersonnel && <_UserDelete corporatePersonnel={corporatePersonnel}/>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className={"col-md-6"}>
                        {corporatePersonnel && <_UserCredits corporatePersonnel={corporatePersonnel} updatePage={getCorporatePerson}/>}
                    </div>
                </Grid>
            </Container>
            {renderModalAddCredit()}
        </>
    );
};

export default SingleUser;
