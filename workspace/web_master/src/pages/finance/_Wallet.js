import React, {useContext, useEffect} from 'react';
import {Card, CardContent, CardHeader, Grid2 as Grid, Typography} from "@mui/material";
import {getFixPlaceName, toPriceWithComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {user_getMyPlaceWallet} from "../../network/api/user.api";

const _Wallet = ({user,place,getIncomeWalletAmount,getUserWalletAmount}) => {

    return (
        <>
            <Card sx={{mt: 2}} variant={"outlined"}>
                <CardHeader
                    title={"کیف پول "+user.FullName+" - "+getFixPlaceName(place, 30)}
                    action={
                        <Typography sx={{mt: 1, lineHeight: 0.6, color: getIncomeWalletAmount() > 0 ? "#0000ff" : "#ff0000"}}
                                    variant={"subtitle1"}>
                            {getIncomeWalletAmount() < 0 && "-"}
                            {`${toPriceWithComma(getIncomeWalletAmount())} تومان`}
                        </Typography>
                    }
                />
            </Card>
        </>
    );
};

export default _Wallet;
