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
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                    <_DashCatItem
                        title={"ورزش"}
                        // bgColor={"rgba(23,171,97,0.4)"}
                        description={"جیم پین : پل ارتباطی مراکز ورزشی و سازمان ها"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/sports.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/sportIcon.png"/>}
                        onClick={() => {
                            navigate("/sport")
                        }}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                    <_DashCatItem
                        title={"غذاو میان وعده"}
                        description={"بهترین کترینگ‌ها و میان وعده‌های سازمانی"}
                        // bgColor={"rgba(90,23,171,0.4)"}

                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/food.jpg"/>}
                        icon={<img alt="icon" width={180} height={80} src="/assets/images/btn/foodIcons.png"/>}
                        onClick={() => {
                            navigate("/food")
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container columns={12}>
                <Card sx={{m: 2, p: 2, width: "100%"}} variant={"outlined"}>
                    <Grid container direction={"row"} justifyContent={"space-between"}>
                        <Typography>درخواست خدمات دیگر</Typography>
                    </Grid>
                </Card>
            </Grid>

            <Grid container columns={12}>
                {/*<Grid size={{xs: 6, sm: 6, md: 4, lg: 3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"سلامت"}*/}
                {/*        description={"آزمایشگاه‌ها ، سبک زندگی و رژیم ها"}*/}
                {/*        header={<img width={"100%"} alt="icon" src="/assets/images/btn/health.jpg"/>}*/}
                {/*        icon={<img alt="icon" width={80} src="/assets/images/btn/healthIcon.png"/>}*/}
                {/*        onClick={() => {*/}
                {/*            navigate("/health")*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 3}}>
                    <_DashCatItem
                        title={"رویداد ها"}
                        description={"تست و نظرسنجی، بازی‌های گروهی، مناسبت ها"}
                        // bgColor={"rgba(171,23,151,0.4)"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/event.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/eventIcon.png"/>}
                        onClick={() => {
                            navigate("/event")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6,  md: 6, lg: 3}}>
                    <_DashCatItem
                        title={"مشاوره"}
                        description={"بیمه، مالیات، حقوقی، تیم سازی و مدیریتی"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/consulting.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/consultingIcon.png"/>}
                        onClick={() => {
                            navigate("/consult")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 4, lg: 3}}>
                    <_DashCatItem
                        title={"هدایای سازمانی"}
                        description={"بسته‌های خوش‌آمد، تولد، اعیاد و مناسبت ها"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/gift.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/giftIcon.png"/>}
                        onClick={() => {
                            navigate("/gift")
                        }}
                    />
                </Grid>
                {/*<Grid size={{xs: 12, sm: 6, md: 4, lg: 3}}>*/}
                {/*    <_DashCatItem*/}
                {/*        title={"آموزش و توسعه"}*/}
                {/*        description={"کلاس ها و دوره ها، ایونت های آموزش گروهی"}*/}
                {/*        header={<img width={"100%"} alt="icon" src="/assets/images/btn/learn.jpg"/>}*/}
                {/*        icon={<img alt="icon" width={80} src="/assets/images/btn/learnIcon.png"/>}*/}
                {/*        onClick={() => {*/}
                {/*            navigate("/gift")*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid size={{xs: 6, sm: 6, md: 4, lg: 3}}>
                    <_DashCatItem
                        title={"اقساط و تسهیلات"}
                        description={"خرید اقساطی، فروشگاه‌ها و کثر از حقوق"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/loan.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/loanIcon.png"/>}
                        onClick={() => {
                            navigate("/loan")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 4, lg: 4}}>
                    <_DashCatItem
                        title={"حمل و نقل"}
                        description={"وانت، پیک، خودرو، حمل و نقل سازمانی"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/transportation.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/transportationIcon.png"/>}
                        onClick={() => {
                            navigate("/transport")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6, lg: 4}}>
                    <_DashCatItem
                        title={"سفر و گردشگری"}
                        description={"تور‌های یک روزه، مسافرت و بلیط"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/travel.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/travelIcon.png"/>}
                        onClick={() => {
                            navigate("/travel")
                        }}
                    />
                </Grid>
                <Grid size={{xs: 6, sm: 6, md: 6, lg: 4}}>
                    <_DashCatItem
                        title={"فرهنگ و هنر"}
                        description={"سینما، تئاتر، موزه، گالری، کافه"}
                        header={<img width={"100%"} alt="icon" src="/assets/images/btn/cultural.jpg"/>}
                        icon={<img alt="icon" width={80} src="/assets/images/btn/culturalIcon.png"/>}
                        onClick={() => {
                            navigate("/cult")
                        }}
                    />
                </Grid>
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
