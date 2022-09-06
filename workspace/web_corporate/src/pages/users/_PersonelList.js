import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Typography
} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import DeleteIcon from '@mui/icons-material/Delete';

const data = [{
    id: 4512,
    name: "ابراهیم میری",
    creadit: 1100000,
    phone: "09123456789",
    userImage: "/assets/images/1.jpg",
}, {
    id: 4513,
    creadit: 1000000,
    phone: "09123456789",
}, {
    id: 4514,
    creadit: 1200000,
    phone: "09123456789",
}, {
    id: 4515,
    creadit: 1100000,
    phone: "09123456789",
}, {
    id: 4516,
    creadit: 1100000,
    phone: "09123456789",
}]

const _PersonelList = () => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                sx={{paddingBottom: 0}}
                title={"لیست پرسنل"}/>
            <CardContent sx={{margin: 0, paddingTop: 0}}>
                <List>
                    {data.map(item => (
                        <>
                            <ListItem alignItems="flex-start" sx={{width: '100%', bgcolor: 'background.paper'}}>
                                <Link href={"/users/Detail"} sx={{textDecoration: "none", color: "#666666"}}>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{width: 50, height: 50}} alt="user"
                                            src={toAbsoluteUrl(item.userImage)}/>
                                    </ListItemAvatar>
                                </Link>

                                <ListItemText
                                    className="text-start"
                                    primary={item.name ? item.name : item.phone}
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                اعتبار باقی مانده:
                                                {item.creadit}
                                            </Typography>
                                            <br/>
                                            <span>{new Date().toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</span>
                                        </>
                                    }

                                />

                                <IconButton color={"primary"} aria-label="delete" size="small">
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </ListItem>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                        </>
                    ))}

                </List>
                <Pagination variant="outlined" count={1} color="primary"/>
            </CardContent>
        </Card>
    );
};

export default _PersonelList;
