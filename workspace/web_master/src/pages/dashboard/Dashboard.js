import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {connect, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import _TicketCount from "./_TicketCount";
import _DashPlaceIncome from "./_DashTotalDeposit";
import _DashCatItem from "../../components/_DashCatItem";
import _DashAlerts from "./alerts/_DashAlerts";
import {user_getMyPlaceWallet} from "../../network/api/user.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Card, Container, Typography} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import _DashMyPlace from "./_DashMyPlace";
import _RViews from "../report/reports/_RViews";
import _MonthSellCount from "./_MonthSellCount";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place?.place);
    const currentUser = useSelector((state) => state.auth.user);
    const [wallets, setWallets] = useState(null);

    useEffect(() => {
        if (place)
            props.RequestPlace(place);

    }, []);


    useEffect(() => {
        if (currentUser)
            props.RequestServerSettings(currentUser);
    }, [currentUser]);


    useEffect(() => {
        if (place)
            getUserWallet()
    }, [place]);


    function getUserWallet() {
        user_getMyPlaceWallet({Id: place?.Id}).then(result => {
            setWallets(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>

            <Container>
                <title>پیشخوان</title>
                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <DashboardIcon/>
                            <Typography sx={{px: 1}}>{"پیشخوان"}</Typography>
                        </Grid>
                    </Card>
                </Grid>


                <Grid container columns={12}>
                    <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                        <_DashAlerts/>
                    </Grid>

                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                        <_DashPlaceIncome
                            place={place}
                            wallet={wallets}
                            navigate={navigate}
                            currentUser={currentUser}
                        />
                    </Grid>

                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                        <_DashMyPlace
                            place={place}
                            wallet={wallets}
                            navigate={navigate}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                        <_MonthSellCount place={place}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                        <_TicketCount
                            place={place}
                            navigate={navigate}
                        />
                    </Grid>

                </Grid>

                <Grid container columns={2} alignItems={"start"}>
                    <Grid size={{xs: 2, md: 2, lg: 2, xl: 2}}>
                        <_RViews/>
                    </Grid>
                </Grid>
                <Grid container columns={12}>
                    <Grid size={{xs: 12, sm: 12, md: 12}}>
                    </Grid>
                </Grid>

                <Grid sx={{mb: 10}} container columns={12}>
                    <Grid size={{xs: 12, sm: 6, md: 6}}>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, md: 6}}>
                    </Grid>

                    <Grid size={{xs: 6, sm: 6, md: 6}}>
                        <_DashCatItem
                            title={"پشتیبانی"}
                            bgColor={"rgba(90,23,171,0)"}
                            icon={
                                <img
                                    alt="icon"
                                    width={64}
                                    src="/assets/images/icons/004-help-desk.png"
                                />
                            }
                            onClick={() => {
                                navigate("/support");
                            }}
                        />
                    </Grid>
                    <Grid size={{xs: 6, sm: 6, md: 6}}>
                        <_DashCatItem
                            title={"فاکتور ها"}
                            bgColor={"rgba(90,23,171,0)"}
                            icon={
                                <img
                                    width={64}
                                    alt="icon"
                                    src="/assets/images/icons/005-shopping-list.png"
                                />
                            }
                            onClick={() => {
                                navigate("/invoices");
                            }}
                        />
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

export default connect(null, sagaActions)(Dashboard);
