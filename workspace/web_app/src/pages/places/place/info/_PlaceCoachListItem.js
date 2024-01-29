import React from 'react';
import {Avatar, Paper, Rating, Typography} from "@mui/material";

const _PlaceCoachListItem = ({coach}) => {
    console.log("coach",coach)
    return (
        <div>

            <Paper sx={{
                m: 1,
                p: 1,
                border: "1px solid #ffddff",
                borderRadius: "8px",
                textAlign: "-webkit-center"
            }}>
                <Avatar
                    sx={{width: "100%",maxWidth:"150px", aspectRatio: "1/1", height: "auto"}}
                    alt="Remy Sharp"
                    src={coach?.Avatar?.Url}/>
                <Typography variant={"subtitle2"}>
                    {coach?.FullName || "ثبت نشده"}
                </Typography>

                <Rating name="read-only" size={"small"} value={coach?.Rate || 5} readOnly/>
            </Paper>
        </div>
    );
};

export default _PlaceCoachListItem;
