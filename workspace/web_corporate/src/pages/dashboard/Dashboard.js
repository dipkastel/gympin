import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import {connect, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import _PersonnelCount from "./_PersonnelCount";
import _TicketCount from "./_TicketCount";
import _RChargeUsage from "../report/Finance/_RChargeUsage";
import _RUsageByUser from "../report/Usage/_RUsageByUser";
import _RAverageOfUserTickets from "../report/Finance/_RAverageOfUserTickets";
import _DashTotalDeposit from "./_DashTotalDeposit";
import _DashTotalCredit from "./_DashTotalCredit";
import _DashSlider from "./_DashSlider";
import _DashCatItem from "../../components/_DashCatItem";
import {Card, Typography} from "@mui/material";
import _DashAlerts from "./_DashAlerts";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import _HallReservation from "../sport/Gympin/Reserve/_HallReservation";
import _SendCouch from "../sport/Gympin/Couch/_SendCouch";
import _NeedNewService from "../../components/_NeedNewService";

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
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <_DashAlerts />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <_DashSlider/>
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                    <_DashTotalDeposit totalDeposit={corporate?.FinanceCorporate?.TotalDeposit} navigate={navigate}/>
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                    <_DashTotalCredit totalCredit={corporate?.FinanceCorporate?.TotalCredits} navigate={navigate}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                    <_PersonnelCount/>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}}>
                    <_TicketCount corporate={corporate} />
                </Grid>
            </Grid>
            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 12, md: 12}}>
                    <_RChargeUsage/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"جیم پین"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/gympin1.png"}/>}
                        describe={"جیم پین پل ارتباطی مراکز ورزشی و سازمان ها. اعتبار دهی گروهی و شخصی به کارمندان برای استفاده از مجموعه‌های ورزشی در اپلیکیشن جیم پین."}
                        onClick={() => navigate("/sport/gympin")}
                        status={"ACTIVE"}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_HallReservation  />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_SendCouch  />
                </Grid>
            </Grid>

            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 6, md: 6}}>
                    <_RUsageByUser/>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6}}>
                    <_RAverageOfUserTickets/>
                </Grid>

                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <_DashCatItem
                        title={"پشتیبانی"}
                        bgColor={"rgba(90,23,171,0)"}
                        icon={<img alt="icon" width={64} src="/assets/images/icons/004-help-desk.png"/>}
                        onClick={() => {
                            navigate("/support")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6}}>
                    <_DashCatItem
                        title={"فاکتور ها"}
                        bgColor={"rgba(90,23,171,0)"}
                        icon={<img width={64} alt="icon" src="/assets/images/icons/005-shopping-list.png"
                        />} onClick={() => {
                        navigate("/invoices")
                    }}/>
                </Grid>
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
