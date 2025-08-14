import React from 'react';
import {Box, Link, Typography} from "@mui/material";
import {Phone} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const _SinglePlaceGeneralFooter = () => {

    const navigate = useNavigate();
    return (
        <>
            <Box
                component="footer"
                sx={{
                    background: "linear-gradient(to left, #C8102E, #e63946, #ff6f61)",
                    color: "white",
                    mt: 6,
                    py: 4,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1200px",
                        mx: "auto",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            جیم پین
                        </Typography>
                        <Typography variant="body2">
                            پلتفرمی برای ورزش و سلامت کارمندان با دسترسی آسان به مراکز ورزشی سراسر کشور.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            لینک‌ها
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link
                                href="https://gympin.ir"
                                sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                            >
                                {"جیم پین چیست"}
                            </Link>
                            <Link
                                href="https://gympin.ir/about"
                                sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                            >
                                {"درباره ما"}
                            </Link>
                            <Link
                                href="https://gympin.ir/contact"
                                sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                            >
                                {"تماس با ما"}
                            </Link>
                            <Link
                                href="https://gympin.ir/faq"
                                sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                            >
                                {"سوالات متداول"}
                            </Link>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "block" }}}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            تماس با ما
                        </Typography>
                        <Link
                            href="https://gympin.ir/faq"
                            sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                        >
                            <Typography variant="body2" sx={{direction:"rtl",mt:2}}>
                                <Phone sx={{ fontSize: 18, mr: 0.5 }} /> (۰۲۱) ۷۷۱۶۲۱۹۱
                            </Typography>
                        </Link>
                        <Link
                            href="https://gympin.ir/faq"
                            sx={{ color: "white", fontSize: "0.9rem", "&:hover": { color: "#ffeb99" } }}
                        >
                            <Typography  variant="body2" sx={{direction:"rtl",mt:2}} onClick={(e)=>{}}>
                                <Phone sx={{ fontSize: 18, mr: 0.5  }} /> (۰۲۱) ۷۷۱۶۲۱۹۲
                            </Typography>
                        </Link>

                    </Box>
                </Box>

                <Link  href={"https://gympin.ir"} variant="body2" align="center" sx={{ mt: 3, color:"white",opacity: 0.8,width:"100%",display:"block",cursor:"pointer" }}>
                    © {new Date().getFullYear()} جیم پین - تمامی حقوق محفوظ است.
                </Link>
            </Box>
        </>
    );
};

export default _SinglePlaceGeneralFooter;
