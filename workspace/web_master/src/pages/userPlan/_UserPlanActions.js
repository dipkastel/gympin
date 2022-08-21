import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Link} from "@mui/material";

const _UserPlanAcitons = () => {
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"عملیات ها"}
            />
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    padding={1}
                >

                    ثبت ورود جدید :
                    <Button size="small" variant={"outlined"}>ثبت ورود</Button>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    padding={1}
                >
                    افزایش تاریخ انقضا (فریز):
                    <Button sx={{float: "left"}} size="small" variant={"outlined"}>افزایش</Button>
                </Grid>

            </CardContent>
        </Card>
    );
};

export default _UserPlanAcitons;
