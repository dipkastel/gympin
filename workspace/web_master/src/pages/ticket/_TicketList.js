import React from 'react';
import {
    Avatar, Button,
    Card,
    CardContent,
    CardHeader, Chip, Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Typography
} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

const data=[{
    id:154695,
    title:"نام کاربری پرسنل نیست",
    date:"8-8-2022 12:27:15",
    status:0,
},{
    id:165549,
    title:"دکمه ویرایش کار نمیکند",
    date:"8-8-2022 12:27:15",
    status:3,
},{
    id:17195,
    title:"نام مجموعه غلط است",
    date:"8-8-2022 12:27:15",
    status:3,
}]


const _TicketList = () => {
    return (
        <>
            <Card elevation={3} sx={{margin:1}}>
                <CardHeader
                    title={"لیست تیکت ها"}
                    />
                <CardContent>

                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {data.map(item=>(
                            <>
                                <ListItem alignItems="flex-start">
                                    <Link  href={"/management/singleTicket?id="+item.id} sx={{width:"100%",textDecoration: "none", color: "#666666"}}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <ListItemText
                                                className="text-start"
                                                primary={item.title}
                                                secondary={new Date(item.date).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}/>

                                            <Grid>
                                                <Chip size="small"
                                                      color={item.status===0?"warning":"success"}
                                                      label={item.status===0?"در حال بررسی":"تکمیل شده"} />
                                            </Grid>


                                        </Grid>
                                    </Link>
                                </ListItem>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                            </>
                        ))}

                    </List>
                </CardContent>

            </Card>

        </>
    );
};

export default _TicketList;
