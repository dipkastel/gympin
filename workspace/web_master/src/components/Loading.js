import React from 'react';
import {CircularProgress, Grid} from "@mui/material";

const Loading = (props) => {
    return (
        <>
            <Grid sx={{width:props.width,height:props.height}} container justifyContent={"center"} alignContent={"center"}>
                <CircularProgress/>
            </Grid>
        </>
    );
};

export default Loading;
