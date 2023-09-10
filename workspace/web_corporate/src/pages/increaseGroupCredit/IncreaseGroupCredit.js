import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const {PersonelCount} = useParams();
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [credit,setCredit] = useState(0);

    function addCreditToAllPersonel(e) {
        e.preventDefault();
        corporatePersonnel_addCreditToAll({
            CorporateId: corporate.Id,
            CreditAmount: credit
        }).then(result => {
            navigate('/personnel', {replace: true});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
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
                <Form onSubmit={(e) => addCreditToAllPersonel(e)}>
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
                    <Button variant={"outlined"} sx={{margin: 1}} type={"submit"}>ثبت</Button>
                </Form>
            </CardContent>
        </Card>
    );
};

export default IncreaseGroupCredit;
