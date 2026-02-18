import React, {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import _Wallet from "./_Wallet";
import _transactions from "./_Transactions";
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import __DemandPayment from "./__DemandPayment";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {user_getMyPlaceWallet} from "../../network/api/user.api";


function Finance(props) {
    const error = useContext(ErrorContext);
    const currentPlace = useSelector(({place}) => place.place);
    const currentUser = useSelector(({auth}) => auth.user);
    const [user, SetUser] = useState(currentUser);
    const [currentWallet, setCurrentWallet] = useState(null);
    const [wallets, setWallets] = React.useState(false);

    useEffect(() => {
        if (!currentPlace || !user)
            return;
        getUserWallet();
    }, []);

    useEffect(() => {
        SetUser(currentUser);
    }, [currentUser]);

    if (!currentPlace || !user)
        return (<></>);


    function getUserWallet() {
        user_getMyPlaceWallet({Id: currentPlace?.Id}).then(result => {
            setWallets(result.data.Data);
            setCurrentWallet(result?.data?.Data?.CreditDetails?.find(w => w.CreditType === "INCOME")?.Id)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function getIncomeWalletAmount() {
        return wallets?.CreditDetails?.find(w => w.CreditType === "INCOME")?.CreditPayableAmount || 0;
    }

    function getUserWalletAmount() {
        return wallets?.CreditDetails?.find(w => w.CreditType === "PERSONAL")?.CreditPayableAmount || 0;
    }


    return (
        <>

            <Container>
                <title>مالی</title>
                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <DashboardIcon/>
                            <Typography sx={{px: 1}}>{"مالی"}</Typography>
                        </Grid>
                    </Card>
                </Grid>


                <Grid sx={{p: 1}} container columns={12}>
                    <Grid sx={{p: 1}} size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                        <_Wallet user={currentUser} place={currentPlace} getUserWalletAmount={getUserWalletAmount} getIncomeWalletAmount={getIncomeWalletAmount}/>
                        {currentWallet && <__DemandPayment place={currentPlace} currentWallet={currentWallet} wallets={wallets} getIncomeWalletAmount={getIncomeWalletAmount}/>}
                    </Grid>

                    <Grid sx={{p: 1}} size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                        <_transactions place={currentPlace} />
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}

export default Finance;
