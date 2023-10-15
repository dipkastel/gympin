import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporatePersonnel_add, corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {checkMobileValid, toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const {PersonelCount} = useParams();
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const minCredit = 1000;
    const [credit,setCredit] = useState(0);
    const [openModalConfirm,setOpenModalConfirm] = useState(false);

    useEffect(() => {
        if(openModalConfirm){
            if (credit<minCredit){
                error.showError({message:"حداقل اعتبار قابل افزایش "+toPriceWithComma(minCredit)+" تومان می باشد"})
                setOpenModalConfirm(false);
            }
        }
    }, [openModalConfirm]);



    function RenderModalConfirm() {

        function addPersonnel(e) {
            e.preventDefault()
            corporatePersonnel_addCreditToAll({
                CorporateId: corporate.Id,
                CreditAmount: credit
            }).then(result => {
                navigate('/personnel', {replace: true});
            }).catch(ca => {
                try {
                    error.showError({message: ca.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
                <Form onSubmit={(e) => addPersonnel(e)}>
                    <DialogTitle>افزودن اعتبار برای همه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"افزایش اعتبار برای همه کاربران و هر یک به مبلغ "+toPriceWithComma(credit)+" تومان را تایید میکنم"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"} onClick={() => setOpenModalConfirm(false)}>خیر</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>بله</Button>

                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"افزایش اعتبار به همه پرسنل"}
                />
                <CardContent>
                    <Typography variant={"subtitle1"}>
                        اعتباری که به هر یک از پرسنل اضافه میشود را وارد نمایید.
                    </Typography>
                    <Typography variant={"body2"}>
                        توجه داشته باشید اعتبار افزوده شده به پرسنل قابل بازگشت نمی باشد
                    </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credit"
                            label="مقدار اعتبار"
                            type="text"
                            value={toPriceWithComma(credit)}
                            onChange={(e)=>setCredit(toPriceWithoutComma(e.target.value))}
                            fullWidth
                            variant="standard"
                        />
                        <Typography variant={"body2"}>
                            {'مجموع اعتبار اضافه شده به پرسنل '+toPriceWithComma(credit*PersonelCount)+' تومان می باشد'}
                        </Typography>
                        <Button variant={"outlined"} sx={{margin: 1}} onClick={(e)=>setOpenModalConfirm(true)}>ثبت</Button>
                </CardContent>
            </Card>
            {RenderModalConfirm()}
        </>
    );
};

export default IncreaseGroupCredit;
