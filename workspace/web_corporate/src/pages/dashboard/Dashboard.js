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
import _RChargeUsage from "../report/Finance/_RChargeUsage";
import _RUsageByUser from "../report/Usage/_RUsageByUser";
import _RAverageOfUserTickets from "../report/Finance/_RAverageOfUserTickets";
import _DashTotalDeposit from "./_DashTotalDeposit";
import _TotalCredits from "../finance/_TotalCredits";
import _DashTotalCredit from "./_DashTotalCredit";
import _DashSlider from "./_DashSlider";
import _DashCatItem from "../../components/_DashCatItem";

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
                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_DashSlider />
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_DashTotalDeposit totalDeposit={corporate?.FinanceCorporate?.TotalDeposit} navigate={navigate} />
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_DashTotalCredit totalCredit={corporate?.FinanceCorporate?.TotalCredits} navigate={navigate} />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_PersonnelCount />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 5 ,lg:3}}>
                    <_TicketCount />
                </Grid>
            </Grid>
            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 12, md: 12}}>
                    <_RChargeUsage />
                </Grid>
                {/*<Grid  size={{xs: 12, sm: 12, md: 12,lg:12}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"جیم پین"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 12, sm: 4, md: 4,lg:6}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"سلامت"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 12, sm: 4, md: 4,lg:6}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"غذا"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"میان وعده"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"ایونت ها"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"فاکتور ها"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"پرسنل"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 12, sm: 4, md: 4,lg:3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"استخدام"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 12, sm: 4, md: 4,lg:3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"تیم سازی"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"هدایا"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"آموزش"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"بسته هاب ورود"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 4, md: 4,lg:4}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"چالش ها"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                <Grid  size={{xs: 12, sm: 6, md: 6}}>
                    <_RUsageByUser />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6}}>
                    <_RAverageOfUserTickets />
                </Grid>

                {/*<Grid  size={{xs: 6, sm: 6, md: 6}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"پشتیبانی"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
                {/*<Grid  size={{xs: 6, sm: 6, md: 6}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"فاکتور ها"}*/}
                {/*        icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />} />*/}
                {/*</Grid>*/}
            </Grid>
            <Grid container columns={12}>
            </Grid>
            {/*<Container>*/}
            {/*    <Home />*/}
            {/*</Container>*/}
        </>
    );
};

export default connect(null, sagaActions)(Dashboard);
