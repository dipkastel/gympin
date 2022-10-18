import React from 'react';
import {Avatar, Grid, Paper, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {Image} from "react-bootstrap";

const _ScanUser = (props) => {
    return (
        <Paper
            sx={{
                padding: 1,
                margin: 2,
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: () => props.LoginComplete ? '#d5f579' : '#ffffff',
            }}
        >
            <Grid wrap="nowrap" container>
                <Grid item container>
                    <Typography variant="h5" display={"contents"}>
                        {props.user.userName}
                    </Typography>
                    <br/>
                    <Typography variant="body1" display={"contents"}>
                        {props.user.sportName}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="text.secondary" display={"contents"}>
                        {props.user.gateName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Image
                        className={"w-25"}  src={"https://www.pngmart.com/files/3/Green-Tick-PNG-Picture.png"}/>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{width: "100px", height: "100px"}} alt="Remy Sharp" src={toAbsoluteUrl(props.user.image)}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default _ScanUser;
