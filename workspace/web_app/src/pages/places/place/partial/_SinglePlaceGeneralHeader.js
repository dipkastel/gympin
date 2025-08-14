import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {LocalPhone, Phone} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const _SinglePlaceGeneralHeader = () => {

    const navigate = useNavigate();

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: "linear-gradient(to left, #C8102E, #e63946, #ff6f61)",
                    boxShadow: 3,
                }}

            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center" gap={2} component={"a"} href={"https://gympin.ir/"} >
                        <img
                            src="/assets/images/gympinTypoLight.svg"
                            alt="GymPin"
                            style={{ height: 40 }}
                        />
                    </Box>

                    {/* Center: Menu */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                        <Button
                            sx={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                "&:hover": { color: "#ffeb99" },
                            }}
                            href={"https://place.gympin.ir/auth/register"}
                        >
                            {"ثبت نام مجموعه ورزشی"}
                        </Button>
                        <Button
                            sx={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                "&:hover": { color: "#ffeb99" },
                            }}
                            href={"https://gympin.ir/"}
                        >
                            {"ثبت نام سازمان"}
                        </Button>
                        <Button
                            sx={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                "&:hover": { color: "#ffeb99" },
                            }}
                            href={"https://gympin.ir/blog"}
                        >
                            {"مطالب و مقالات"}
                        </Button>
                    </Box>

                    {/* Left side: Phone + Button */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center"
                             component={"a"}
                             sx={{ color: "white", fontWeight: 600, fontSize: "0.85rem",direction:"rtl" }}
                             href={"tel:02177162191"}
                        >
                            <Phone sx={{ fontSize: 20, mr: 0.5 }} />
                            (۰۲۱)۷۷۱۶۲۱۹۱
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "white",
                                color: "#C8102E",
                                fontWeight: "bold",
                                borderRadius: 9999,
                                px: 3,
                                py: 1,
                                boxShadow: 2,
                                "&:hover": { backgroundColor: "#ffeb99" },
                            }}
                            href={"https://apps.gympin.ir"}
                        >
                            ورود
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default _SinglePlaceGeneralHeader;
