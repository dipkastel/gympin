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
import {ControlPoint,RemoveCircleOutline } from '@mui/icons-material';

const _wallet = () => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardContent>
                تراکنش ها
                <List disablePadding>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <ControlPoint color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="30,000 تومان" secondary="کامیار شیرازی"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <ControlPoint color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="30,000 تومان"  secondary="حسن دردشتی"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <ControlPoint color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="30,000 تومان"  secondary="سیامک کوشا"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                        <ListItem disablePadding >
                            <ListItemButton >
                                <ListItemIcon >
                                    <RemoveCircleOutline color={"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="3,300,000 تومان"  secondary="شماره تراکنش 2205125428"/>
                            </ListItemButton>
                        </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    <ListItem disablePadding >
                        <ListItemButton >
                            <ListItemIcon >
                                <ControlPoint color={"success"}/>
                            </ListItemIcon>
                            <ListItemText primary="30,000 تومان"  secondary="علی لاجوردی"/>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Pagination variant="outlined" count={10} color="primary" />
            </CardContent>
        </Card>
    );
};

export default _wallet;
