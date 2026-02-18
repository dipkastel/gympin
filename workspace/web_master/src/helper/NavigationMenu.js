import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import {Chip} from "@mui/material";
import {CorporateFare, PersonPin, Settings, SupportAgent,AccountBalanceWallet,AppRegistration,FollowTheSigns} from "@mui/icons-material";

export const NavigationMenu = [
    {
        segment: "dashboard",
        title: "پیشخوان",
        icon: <DashboardIcon/>,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "کاربری",
    },
    {
        segment: "users",
        title: "ثبت ورود - کاربران",
        icon: <FollowTheSigns/>,
    },
    {
        segment: "management" ,
        title: "مجموعه من",
        icon: <AppRegistration/>,
    },
    {
        segment: "finance",
        title: "مالی",
        icon: <AccountBalanceWallet/>,
    },
    {
        kind: "header",
        title: "مدیریت",
    },
    {
        segment: "reports",
        title: "گزارشات",
        icon: <BarChartIcon/>,
        action: <Chip label={"به زودی"} color={"default"} size="small"/>,
    },
    {
        segment: "support",
        title: "پشتیبانی",
        icon: <SupportAgent/>,
    },
    {
        segment: "settings",
        title: "تنظیمات",
        icon: <Settings/>,
        children: [
            {
                segment: "profile",
                title: "پروفایل من",
                icon: <PersonPin/>,
            },
            {
                segment: "places",
                title: "مراکز من",
                icon: <CorporateFare/>,
            },
        ],
    },
];
