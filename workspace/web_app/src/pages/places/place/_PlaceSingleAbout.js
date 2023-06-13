import React from 'react';
import {Card, Grid, Typography} from "@mui/material";

const _PlaceSingleAbout = ({about,number}) => {
    return (
        <Card key={number}  elevation={3} sx={{margin: 1, padding: 1}}>
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
            >
                <Grid>
                    <Typography variant={"subtitle1"}>
                        {about.Name}
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        { about.Description}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default _PlaceSingleAbout;
