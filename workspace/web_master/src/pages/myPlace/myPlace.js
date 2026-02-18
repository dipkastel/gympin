import React from 'react';
import {Grid, Card, CardContent, Typography, CardActionArea, Box, Container} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ImageIcon from "@mui/icons-material/Image";
import PeopleIcon from "@mui/icons-material/People";
import GavelIcon from "@mui/icons-material/Gavel";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useNavigate } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SubscribesList from "../tickets/subscribe/SubscribesList";

const MyPlace = () => {

    const navigate = useNavigate();

    const cardsData = [
        {
            title: "تصاویر",
            description: "گالری تصاویر",
            icon: <ImageIcon sx={{ fontSize: 50 }} />,
            route: "/management/images",
        },
        {
            title: "پرسنل",
            description: "مدیریت پرسنل",
            icon: <PeopleIcon sx={{ fontSize: 50 }} />,
            route: "/management/personnel",
        },
        {
            title: "قوانین",
            description: "قوانین و مقررات",
            icon: <GavelIcon sx={{ fontSize: 50 }} />,
            route: "/management/abouts",
        },
        {
            title: "امکانات",
            description: "امکانات مجموعه",
            icon: <WidgetsIcon sx={{ fontSize: 50 }} />,
            route: "/management/facilities",
        },
    ];

    return (<>

        <Container>
            <title>مجموعه من</title>
            <Grid sx={{mx: 2, mt: 2}}>
                <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                    <Grid container direction={"row"}>
                        <DashboardIcon/>
                        <Typography sx={{px: 1}}>{"مجموعه من"}</Typography>
                    </Grid>
                </Card>
            </Grid>

            <Box sx={{ p: 2 }}>
                <Grid container spacing={3}>
                    {cardsData.map((card, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Card
                                variant={"outlined"}
                                sx={{
                                    height: "100%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                        boxShadow: 2,
                                    },
                                }}
                            >
                                <CardActionArea
                                    sx={{ height: "100%" }}
                                    onClick={() => navigate(card.route)}
                                >
                                    <CardContent
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            gap: 1.5,
                                        }}
                                    >
                                        <Box sx={{ color: "primary.main" }}>
                                            {card.icon}
                                        </Box>

                                        <Typography variant="h6" fontWeight="bold">
                                            {card.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <SubscribesList />

        </Container>


    </>
    );
};

export default MyPlace;
