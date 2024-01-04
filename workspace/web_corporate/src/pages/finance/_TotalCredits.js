import React, {useEffect} from 'react';
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {toPriceWithComma} from "../../helper/utils";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

const _TotalCredits = (props) => {
    const corporate = useSelector(({corporate}) => corporate.corporate)

    useEffect(() => {
        if (!corporate) return;
        props.RequestCorporate(corporate);
    }, []);

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    مجموع اعتبار پرسنل :
                    <Stack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        direction="row"
                        spacing={0}
                    >
                        <Typography width={"100%"} variant={"h6"} noWrap={true} textAlign={"left"} component="div" sx={{
                            marginY: 0.1
                        }}>
                            {toPriceWithComma(corporate.FinanceCorporate.TotalCredits) + " تومان"}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};

export default connect(null, sagaActions)(_TotalCredits);
