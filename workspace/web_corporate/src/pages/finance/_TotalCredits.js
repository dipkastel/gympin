import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack, TextField,
    Typography
} from "@mui/material";
import {corporatePersonnel_getTotalUserCredits} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {toPriceWithComma} from "../../helper/utils";

const _TotalCredits = () => {
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [totalCredit,setTotlaCredit] = useState(0);
    useEffect(() => {
        corporatePersonnel_getTotalUserCredits({CorporateId:corporate.Id}).then(result=>{
            setTotlaCredit(result.data.Data);
        }).catch(e=>console.log(e));
    }, [corporate]);

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent
                    >
                    مجموع اعتبار پرسنل :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography width={"100%"} variant={"h6"} noWrap={true} textAlign={"left"} component="div" sx={{
                            marginY:0.1
                        }}>
                            {toPriceWithComma(totalCredit) + " تومان"}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};

export default _TotalCredits;
