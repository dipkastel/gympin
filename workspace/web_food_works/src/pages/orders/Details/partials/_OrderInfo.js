import React from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _OrderInfo = ({invoice}) => {
    return (
        <>

            <Card elevation={10} sx={{m:2}}>
                <CardHeader sx={{borderBottom:"1px solid #909090"}} title={"مشخصات سفارش"}/>
                <CardContent>
                    <Grid sx={{p:1}} spacing={1} container columns={12} justifyContent={"space-between"}>
                        <Grid size={12}>
                            <Avatar
                                sx={{width: 80, height: 80, marginTop: 1}}
                                alt="cateringImage"
                                src={invoice?.Corporate?.Logo?.Url}
                            />
                        </Grid>
                        <Grid size={12}>{"سازمان : "+invoice?.Corporate?.Name}</Grid>
                        <Grid size={12}>{"آدرس : "+invoice?.Corporate?.Address}</Grid>
                        <Grid size={12}>{"ایمیل : "+invoice?.Corporate?.Email}</Grid>
                        <Grid size={12}>{"تلفن : "+invoice?.Corporate?.Tel}</Grid>
                    </Grid>
                    <Divider color={"success"} />
                    <Grid sx={{p:1}} spacing={1} container columns={12} justifyContent={"space-between"}>
                        <Grid size={12}>
                            <Avatar
                                sx={{width: 80, height: 80, marginTop: 1}}
                                alt="cateringImage"
                                src={invoice?.User?.Avatar?.Url}
                            />
                        </Grid>
                        <Grid size={12}>{"سفارش دهنده : "+invoice?.UserFullName}</Grid>
                        <Grid size={12}>{"تماس : "+invoice?.UserPhoneNumber}</Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    );
};

export default _OrderInfo;
