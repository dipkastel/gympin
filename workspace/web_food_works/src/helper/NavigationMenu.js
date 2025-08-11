import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import {Badge, Chip} from "@mui/material";
import {
    AccountBalanceWalletOutlined, Ballot, DesignServices, Dvr,
    Fastfood, Grading,
    Group, MenuBook,
    PersonPin,
    Settings,
    SportsVolleyball,
    SupportAgent,
} from "@mui/icons-material";
import _preOrderCount from "./_preOrderCount";
import _OrderCount from "./_OrderCount";

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
        title: "خدمات",
    },
    {
        segment: "sellItems",
        title: "آیتم ها",
        icon: <Ballot/>,
    },
    {
        segment: "menu",
        title: "منو روزانه",
        icon: <MenuBook/>,
    },
    {
        segment: "services",
        title: "دیگر خدمات",
        icon: <DesignServices/>,
        action: <Chip label={"به زودی"} color={"default"} size="small"/>,
    },
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "مدیریت",
    },
    {
        segment: "PreOrders",
        title: "پیش سفارشات",
        icon: <Grading/>,
        action: <_preOrderCount />,
    },
    {
        segment: "Orders",
        title: "سفارشات",
        icon: <Dvr/>,
        action: <_OrderCount />,
    },
    {
        segment: "finance",
        title: "مالی",
        icon: <AccountBalanceWalletOutlined/>,
    },
    {
        kind: "divider",
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
            // {
            //     segment: "caterings",
            //     title: "مجموعه های من",
            //     icon: <Fastfood/>,
            // },
        ],
    },
];
