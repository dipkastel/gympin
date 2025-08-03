import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, IconButton, Typography} from "@mui/material";
import _ActivePersonnelCount from "./Base/_ActivePersonnelCount";
import _SportTicketCount from "./Base/_SportTicketCount";
import GympinUsageReport from "./Report/GympinUsageReport";
import _SportTotalCredit from "./Base/_SportTotalCredit";
import _UserAddCredit from "./Actions/_UserAddCredit";
import _UserAddGroupCredit from "./Actions/_UserAddGroupCredit";
import {LinkedIn, Telegram, WhatsApp,Instagram} from "@mui/icons-material";
import _UserAddSelectedCredit from "./Actions/_UserAddSelectedCredit";
import {useSelector} from "react-redux";

const Gympin = () => {


    const corporate = useSelector(({corporate}) => corporate.corporate)

    return (
        <>

            <Grid container columns={12}>
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            جیم پین چیست؟
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            جیم پین در حوزه رفاهیات پرسنل، به طور اختصاصی ورزش و سلامت کارمندان فعالیت می‌کند و پل ارتباطی شرکت‌ها و مراکز
                            ورزشی است. جیم پین به نمایندگی از طرف سازمان‌ها، با تعداد زیادی مجموعه‌ی ورزشی همکاری می‌کند تا کارمندان
                            شرکت‌های طرف قرارداد، در هر نقطه از شهر به مراکز ورزشی، دسترسی ارزان و آسان داشته باشند؛ این مراکز ورزشی دارای
                            پراکندگی محاسبه شده بر روی نقشه و همچنین رشته‌های بسیار متنوع هستند.
                        </Typography>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                    <_SportTotalCredit corporate={corporate}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                    <_ActivePersonnelCount corporate={corporate}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
                    <_SportTicketCount corporate={corporate}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
                    <_UserAddCredit/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
                    <_UserAddGroupCredit />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
                    <_UserAddSelectedCredit />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                    <GympinUsageReport/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                    <GympinUsageReport/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            تلفن:
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            021-77162191
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            021-77162192
                        </Typography>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography sx={{mb:3}} variant={"h3"} color={"info"}>
                            شبکه های اجتماعی:
                        </Typography>

                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://wa.me/+989221496746"}>
                            <WhatsApp sx={{fontSize: "2rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://t.me/gympin_info"}>
                            <Telegram sx={{fontSize: "2rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.linkedin.com/company/gympintdp"}>
                            <LinkedIn sx={{fontSize: "2rem"}}/>
                        </IconButton>
                        <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.instagram.com/gympin_ir"}>
                            <Instagram sx={{fontSize: "2rem"}}/>
                        </IconButton>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
                    <Card elevation={10} sx={{m: 2, p: 3}}>
                        <Typography variant={"h3"} color={"info"}>
                            آدرس:
                        </Typography>
                        <Typography sx={{mt: 2, lineHeight: "1.4rem", textAlign: "justify"}} variant={"body2"} color={"info"}>
                            تهران - نارمک جنوبی - پلاک ۴۱۶
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Gympin;
