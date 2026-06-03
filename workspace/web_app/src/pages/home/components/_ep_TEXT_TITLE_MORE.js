import React from 'react';
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

const _ep_TEXT_TITLE_MORE = ({texts}) => {
    return (<>
        <Grid container justifyContent={"space-between"}>
            {texts?.sort((a, b) => {
                return a.Priority - b.Priority
            })?.map(item=>(
                <Grid  key={"textmore"+item.Id} sx={{mx: 3,mt:3}}>
                    <Typography href={item?.Url}  sx={{fontWeight: 600,textDecoration:"none",color:"#2f2f2f"}} component={item?.Url?"a":"p"} >{item?.Title}</Typography>
                </Grid>
            ))}
        </Grid>
    </>);

};

export default _ep_TEXT_TITLE_MORE;
