import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import AnalyticsBox from "../../components/AnalyticsBox";
import {Container, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {connect, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import _PersonnelCount from "./_PersonnelCount";
import _TicketCount from "./_TicketCount";
import Home from "../home/Home";

const Dashboard = (props) => {

    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate)

    useEffect(() => {
        props.RequestCorporate(corporate);
    }, []);


    return (
        <>
            <title>پیشخوان</title>
            <Grid container columns={12}>
                <Grid sx={{m:3}} size={{xs: 12, sm: 12, md: 12}}>
                    <Typography variant={"subtitle1"}>به پیشخوان خوش آمدید 👋</Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <AnalyticsBox
                        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />}
                        title="شارژ باقی مانده"
                        onClick={()=>navigate("/finance/increaseCharge")}
                        color={"quaternary"}
                        total={toPriceWithComma(corporate?.FinanceCorporate?.TotalDeposit || 0) + " تومان"}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <AnalyticsBox
                        icon={<img alt="icon" src="/assets/images/icons/ic-glass-mob.svg" />}
                        title="مجموع اعتبارها"
                        color={"tertiary"}
                        onClick={()=>navigate("/personnel/increaseGroups")}
                        total={toPriceWithComma(corporate?.FinanceCorporate?.TotalCredits||0) + " تومان"}

                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_PersonnelCount />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_TicketCount />
                </Grid>
            </Grid>
            <Container>
                <Home />
            </Container>
        </>
    );
};

export default connect(null, sagaActions)(Dashboard);
