import React from 'react';
import {Card, Grid, Typography} from "@mui/material";

const _PlaceAddress = ({place}) => {
    return (
        <Card elevation={3} sx={{borderRadius: 3,margin: 1, padding: 1}}>
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
            >
                <Grid>
                    <Typography variant={"subtitle1"}>
                        آدرس
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        { place.Address}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export default _PlaceAddress;
