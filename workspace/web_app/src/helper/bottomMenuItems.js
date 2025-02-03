import React from 'react';
import GrainIcon from "@mui/icons-material/Grain";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";

export const bottomMenuItems = [
    {
        value:"home",
        lable:"جیم پین",
        firstDirection:"/",
        icon:<HomeIcon/>,
        otherRouts:[""]
    },
    {
        value:"places",
        lable:"مجموعه‌ها",
        firstDirection:"/places",
        icon:<GrainIcon/>,
        otherRouts:["places","place"]
    },
    // {
    //     value:"coaches",
    //     lable:"مربیان",
    //     firstDirection:"/coaches",
    //     icon:<GroupsIcon/>,
    //     otherRouts:["coaches","coach"]
    // },
    {
        value:"tickets",
        lable:"بلیط ها",
        firstDirection:"/tickets",
        icon:<ConfirmationNumberOutlinedIcon/>,
        otherRouts:["tickets","wallet","basket","invoices","ticketsHistory"]
    },
    // {
    //     value:"profile",
    //     lable:"پروفایل",
    //     firstDirection:"/profile",
    //     icon:<ManageAccountsIcon/>,
    //     otherRouts:["profile","wallet","notifs",]
    // }
]
