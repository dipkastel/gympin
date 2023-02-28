import React, {useContext, useState} from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()
    const corporate = useSelector(({corporate}) => corporate.corporate)

    function addCreditToAllPersonel(e) {
        e.preventDefault();
        corporatePersonnel_addCreditToAll({
            CorporateId: corporate.Id,
            CreditAmount: toPriceWithoutComma(e.target.credit.value)
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
                title={"افزایش اعتبار به همه کاربران"}
            />
            <CardContent>
                <Form onSubmit={(e) => addCreditToAllPersonel(e)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="credit"
                        label="مقدار اعتبار"
                        type="text"
                        onChange={(e)=>{
                            e.target.value = toPriceWithComma(e.target.value)
                        }}
                        fullWidth
                        variant="standard"
                    />
                    <Button variant={"outlined"} sx={{margin: 1}} type={"submit"}>ثبت</Button>
                </Form>
            </CardContent>
        </Card>
    );
};

export default IncreaseGroupCredit;
