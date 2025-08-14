import React from 'react';
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

const _SinglePlaceRegister = () => {
    return (
        <>

                <Card sx={{  textAlign: "center", p: 2, boxShadow: 3, width:"100%" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            این مجموعه هنوز در جیم پین ثبت نشده
                        </Typography>
                        <Box display="flex" justifyContent="center" gap={2} my={3}>
                            <Button variant="contained" sx={{ backgroundColor: "#C8102E", "&:hover": { backgroundColor: "#a50e26" } }}>
                                درخواست ثبت توسط کارمند
                            </Button>
                            <Button variant="outlined" sx={{ color: "#C8102E", borderColor: "#C8102E", "&:hover": { borderColor: "#a50e26", color: "#a50e26" } }}>
                                مدیر مجموعه هستم
                            </Button>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            افتخار ما افزودن مراکز مورد علاقه شماست
                        </Typography>
                    </CardContent>
                </Card>
        </>
    );
};

export default _SinglePlaceRegister;
