import * as React from 'react';
import {useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import _ActiveSubscribes from "../purchased/subscribe/activeSubscribes/_ActiveSubscribes";
import _EnterByCamera from "./partials/_EnterByCamera";
import _EnterByCode from "./partials/_EnterByCode";
import _UserEnterRequest from "./partials/_UserEnterRequest";

function Users() {

    const [enterRequestCode,SetEnterRequestCode] = useState(null);

    function onFind(code) {
        if(!enterRequestCode)
            SetEnterRequestCode(code);
    }
    return (<>

            <Container>
                <title>ثبت ورود - کاربران</title>
                <Grid sx={{mx: 2, mt: 2}}>
                    <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                        <Grid container direction={"row"}>
                            <DashboardIcon/>
                            <Typography sx={{px: 1}}>{"ثبت ورود - کاربران"}</Typography>
                        </Grid>
                    </Card>
                </Grid>

                <Grid sx={{p: 1}} container columns={12}>
                    <Grid sx={{p: 1}} size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                            <_EnterByCamera onFind={onFind}/>
                            <_EnterByCode setCode={onFind}/>
                    </Grid>
                    <Grid sx={{p: 1}} size={{xs: 12, sm: 12, md: 6, lg: 6}}>
                        <_ActiveSubscribes/>
                    </Grid>
                </Grid>
            </Container>
            <_UserEnterRequest enterRequestCode={enterRequestCode} SetEnterRequestCode={SetEnterRequestCode}  />
        </>
    );
}

export default Users;

