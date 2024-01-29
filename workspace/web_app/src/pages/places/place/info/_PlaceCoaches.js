import React from 'react';
import {Avatar, Card, Grid, Paper, Rating, Typography} from "@mui/material";
import _PlaceCoachListItem from "./_PlaceCoachListItem";

const _PlaceCoaches = ({place, personnel}) => {
    return personnel.filter(p => p.UserRole == "PLACE_COACH" && p.IsPublic)[0]&&(
        <Card elevation={3} sx={{margin: 1, padding: 1}}>
               <Typography variant={"subtitle1"}>
                    مربیان
                </Typography>
                <Grid
                    container
                    direction={"row"}
                    justifyContent="start"
                    alignItems="center"
                >
                    {personnel.filter(p => p.UserRole == "PLACE_COACH" && p.IsPublic).map(coach => (
                        <Grid item key={coach.Id} xs={4}>
                            <_PlaceCoachListItem coach={coach.User} />
                        </Grid>
                    ))}
                </Grid>
        </Card>
    )
};

export default _PlaceCoaches;
