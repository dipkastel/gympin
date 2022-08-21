import React from 'react';
import {Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

const data = [
    {
        "Id": 1,
        "title": "موضوع پیام 1",
        "description": "توضیح مختصری در مورد این پیام در اینجا نمایش داده میشود که وقتی نیاز به اطلاعات برود",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 2,
        "title": "موضوع پیام 2",
        "description": "توضیح مختصری در مورد این پیام در اینجا نمایش میشود ",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 3,
        "title": "موضوع پیام 3",
        "description": "این پیام در اینجا نمایش داده میشود که وقتی نیاز به اطلاعات برود",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 4,
        "title": "موضوع پیام 4",
        "description": "توضیح مختصری در مورد این پیام  وقت نیاز برود",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 5,
        "title": "موضوع پیام 5",
        "description": "توضیح مختصری در مورد این پیام در اینجا نمایش داده میشود که وقتی نیاز به اطلاعات برود",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 6,
        "title": "موضوع پیام 6",
        "description": "توضیح مختصری در مورد این پیام در اینجا نمایش  نیاز به اطلاعات برود",
        "date": "2022-02-04T11:08:56.235-0700"
    },
    {
        "Id": 7,
        "title": "موضوع پیام 7",
        "description": "توضیح مختصری  این پیام در اینجا نمایش داده میشود که وقتی نیاز به اطلاعات برود",
        "date": "2022-02-04T11:08:56.235-0700"
    }
]

const Notifs = () => {
    return (
        <>
            <Grid  xs display="flex" justifyContent="center" alignItems="center">
                <Typography variant={"h3"} sx={{padding:1}}>
                    اعلانات
                </Typography>
            </Grid>

            <List dense={false}>
                {data.map(item=>(
                    <>
                        <ListItem sx={{textAlign:"inherit"}}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DraftsOutlinedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={item.description ? item.description : null}
                            />
                        </ListItem>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    </>
                ))}
            </List>

        </>
    );
};

export default Notifs;
