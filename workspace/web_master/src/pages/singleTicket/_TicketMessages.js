import React from 'react';
import {List, Typography} from "@mui/material";
import {Alert} from "react-bootstrap";
const data =[{
    id:145,
    text:" مشکلی وجود دارد که باید حل شود لطفا بررسی کنید",
    operator:"ابراهیم ساجدی",
    date:"8-8-2022 12:01:15",
    auther:"client"
},{
    id:146,
    text:" مشکل شما بررسی و رفع کردید",
    operator:"احسان مقامی",
    date:"8-8-2022 12:27:15",
    auther:"gympin"
}]
const _TicketMessages = () => {
    return (
        <>
            <List>
                {data.reverse().map(item=>(
                    <>
                        <Alert key={item.id} variant={item.auther==="gympin"?"info":"warning"} className={"m-2"}>
                            <Typography variant={"body2"}>{item.text}</Typography>
                            <Typography variant={"caption"}>{item.operator}</Typography>-
                            <Typography variant={"caption"}>{new Date(item.date).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: "2-digit",
                                minute: "2-digit"
                            })}</Typography>
                        </Alert>
                    </>
                ))}

            </List>

        </>
    );
};

export default _TicketMessages;
