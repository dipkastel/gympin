import React from "react";
import {Avatar, Divider, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

export default function StallDeliverd() {
    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                </ListItemAvatar>
                <Link href={"/users/singleuser?id=2"} sx={{textDecoration: "none", color: "#666666"}}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <ListItemText
                            className="text-start"
                            primary="ابراهیم میری"
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            تخم مرغ آب پز
                            <Typography
                                sx={{display: "inline"}}
                                component="span"
                                variant="caption"
                                color="text.primary"
                                textAlign={"end"}
                            >
                                {new Date().toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
            </ListItem>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
        </List>
    );
}
