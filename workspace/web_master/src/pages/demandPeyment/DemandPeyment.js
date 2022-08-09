import React from 'react';
import {
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Pagination
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DemandPeyment  = () => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardContent>
                درخواست های تصویه
                <List disablePadding>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <CheckCircleOutlineIcon  color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="90,000,000 تومان" secondary="1401/01/15"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <CheckCircleOutlineIcon  color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="80,000,000 تومان" secondary="1401/01/05"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <CheckCircleOutlineIcon  color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="50,000,000 تومان" secondary="1400/10/25"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <CheckCircleOutlineIcon  color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="40,000,000 تومان" secondary="1400/09/10"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <CheckCircleOutlineIcon  color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="30,000,000 تومان" secondary="1400/08/22"/>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Pagination variant="outlined" count={1} color="primary" />
            </CardContent>
        </Card>
    );
};

export default DemandPeyment;
