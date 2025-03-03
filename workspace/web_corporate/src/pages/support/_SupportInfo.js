import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";

const _SupportInfo = () => {
    return (
        <Card elevation={3} sx={{p: 2, borderRadius: 5}}>
            <CardContent>
                <Typography variant={"subtitle1"} sx={{mb: 2}} xs={8}>
                    پیش از ایجاد تیکت جدید سوالات متداول را مطالعه کنید!
                </Typography>
                <Button fullWidth xs={4} sx={{mb: 2}} variant={"outlined"} target={"_blank"} size={"small"}
                        href={"https://gympin.ir/faq"}>سوالات
                    متداول</Button>

                <Typography variant={"body2"} sx={{mb: 2}} xs={8}>
                    مشکلات ، پرسش ها و نظرات خود را برای ما ارسال کنید.
                </Typography>
                <Typography variant={"body2"} sx={{mb: 2}} xs={8}>
                    همکاران ما در اسرع وقت پاسخگوی تیکت شما خواهند بود.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default _SupportInfo;
