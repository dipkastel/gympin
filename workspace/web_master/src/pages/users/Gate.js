import React from "react";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

export default function Gate() {
    return (
        <List sx={{width: '100%',  bgcolor: 'background.paper'}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                </ListItemAvatar>
                <ListItemText
                    className="text-start"
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                </ListItemAvatar>
                <ListItemText
                    className="text-start"
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                </ListItemAvatar>
                <ListItemText
                    className="text-start"
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                </ListItemAvatar>
                <ListItemText
                    className="text-start"
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </List>
    );
}
