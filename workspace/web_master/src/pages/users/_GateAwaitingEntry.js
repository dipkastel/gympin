import React from "react";
import {Avatar, Button, Divider, Grid, Link, List, ListItem, ListItemAvatar, Stack, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

let users = [
    {
        userId: 1,
        gateName: "ورودی بدنسازی",
        sportName: "بدنسازی",
        image: "/assets/images/2.jpg",
        userName: "ابراهیم گلستان",
    }
]
export default function _GateAwaitingEntry() {
    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {users.map((item, Index) => (
                <div key={Index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar sx={{margin:0}}>
                            <Avatar
                                sx={{width: 50, height: 50 }}
                                alt="Remy Sharp"
                                src={toAbsoluteUrl(item.image)}/>
                        </ListItemAvatar>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>

                                <Typography
                                    variant="body1"
                                    textAlign={"start"}
                                >
                                    {item.userName}
                                </Typography>
                            </Grid>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                                paddingX={1}
                            >
                                <Link href={"/users/singleuser?id="+item.userId} sx={{textDecoration:"none",color:"#666666"}}>
                                    <Typography
                                        sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.sportName}
                                    </Typography>
                                    {" — " + item.gateName}
                                </Link>
                                <Button variant={"contained"}
                                        href={"/users/qrscan"}> اسکن بارکد</Button>
                            </Stack>
                        </Grid>


                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </div>
            ))}

        </List>
    );
}
