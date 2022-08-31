import React, {useState} from 'react';
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

let user = {
    userId: 416,
    image: "",
    userName: "",
    phoneNumber: "09126548595",
    creadit:1100000,
}

const _userDetails = () => {
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={(
                    <>
                        <Typography
                            sx={{display: "inline"}}
                            component="P"
                            variant="body1"
                            color="text.primary"
                        >
                            اعتبار فعلی :
                            {user.creadit}
                        </Typography>
                    </>
                )}
                action={(<>
                    <Button variant={"outlined"} sx={{margin:1}}>افزایش اعتبار</Button>
                </>)}
            />
            <CardContent>
                <Grid container alignItems={"center"}
                      direction="column"
                      justifyContent={"center"}>
                    <Avatar
                        sx={{width: 120, height: 120}}
                        alt="Remy Sharp"
                        src={user.image&&toAbsoluteUrl(user.image)}
                        aria-valuetext={"asdasd"}
                    />

                    <Typography
                        sx={{display: "inline"}}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.userName?user.userName:user.phoneNumber}
                    </Typography>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default _userDetails;
