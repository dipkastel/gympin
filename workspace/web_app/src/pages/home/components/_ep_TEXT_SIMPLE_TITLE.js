import React from 'react';
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _ep_TEXT_SIMPLE_TITLE = ({texts}) => {

    switch (texts?.[0]?.Type) {
        case "TITR6":
            return <Grid sx={{mx: 3,mt:3}}>
                <Typography sx={{fontWeight: 600}}>{texts?.[0]?.Title}</Typography>
            </Grid>
    }
};

export default _ep_TEXT_SIMPLE_TITLE;
