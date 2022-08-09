import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Pagination,
    Typography
} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

const _PersonelList = () => {
    return (

        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                sx={{paddingBottom:0}}
                title={"لیست پرسنل"}/>
            <CardContent sx={{margin:0 ,paddingTop:0}}>
                <List >
                    <ListItem alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper'}}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                        </ListItemAvatar>
                        <ListItemText
                            className="text-start"
                            primary="ابراهیم میری"
                            secondary={
                                <>
                                    <Typography
                                        sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        مدیر مرکز
                                    </Typography>
                                    <span>
                            </span>
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </List>
                <Pagination variant="outlined" count={1} color="primary" />
            </CardContent>
        </Card>
    );
};

export default _PersonelList;
