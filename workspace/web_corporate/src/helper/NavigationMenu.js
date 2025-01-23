import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import {Chip} from "@mui/material";
import {
    AccountBalanceWallet, AccountBalanceWalletOutlined,
    AddCard, AddTask, CalendarMonth,
    CardGiftcard, ChecklistRtl, CorporateFare,
    CreditScore,
    Group,
    GroupAdd, LegendToggle,
    ManageAccounts, PieChart,
    PermContactCalendar, PersonPin, PowerSettingsNew, Settings, ShowChart, SsidChart, StackedBarChart, SupportAgent, BubbleChart
} from "@mui/icons-material";

export const NavigationMenu = [
    {
        segment: 'dashboard',
        title: 'پیشخوان',
        icon: <DashboardIcon/>,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'مدیریت',
    },
    {
        segment: 'personnel',
        title: 'کارمندان',
        icon: <Group/>,
        children: [
            {
                segment: 'list',
                title: 'لیست',
                icon: <PermContactCalendar/>,
            },
            {
                segment: 'increaseGroups',
                title: 'اعتبار دهی گروهی',
                icon: <GroupAdd/>,
            },
            {
                segment: 'groups',
                title: 'ویرایش گروه ها',
                icon: <ManageAccounts/>,
            },
        ],
    },
    {
        segment: 'finance',
        title: 'مالی',
        icon: <AccountBalanceWalletOutlined/>,
        children: [
            // {
            //     segment: '',
            //     title: 'صورت وضعیت',
            //     icon: <DescriptionIcon/>,
            // },
            {
                segment: 'increaseCharge',
                title: 'افزایش شارژ',
                icon: <AddCard/>,
            },
            {
                segment: 'IncreaseHistory',
                title: 'تاریخچه',
                icon: <CreditScore/>,
            },
        ],
    },
    // {
    //     segment: 'profile',
    //     title: 'پروفایل',
    //     icon: <ShoppingCartIcon/>,
    //     children: [
    //         {
    //             segment: 'me',
    //             title: 'من',
    //             icon: <DescriptionIcon/>,
    //         },
    //         {
    //             segment: 'corporate',
    //             title: 'سازمان',
    //             icon: <DescriptionIcon/>,
    //         },
    //     ]
    // },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'خرید',
    },
    {
        segment: 'buyTicket',
        title: 'هدایا',
        icon: <CardGiftcard/>,
        action: <Chip label={"به زودی"} color={"default"} size="small" />,
    },
    {
        segment: 'events',
        title: 'ایونت ها',
        icon: <CalendarMonth/>,
        action: <Chip label={"به زودی"} color={"default"} size="small" />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'reports',
        title: 'گزارشات',
        icon: <BarChartIcon/>,
        children: [
            {
                segment: 'general',
                title: 'عمومی',
                icon: <StackedBarChart/>,
            },
            {
                segment: 'usage',
                title: 'استفاده',
                icon: <PieChart/>,
            },
            {
                segment: 'finance',
                title: 'مالی',
                icon: <BubbleChart/>,
            },
        ],
    },
    {
        segment: 'support',
        title: 'پشتیبانی',
        icon: <SupportAgent/>,
        children: [
            {
                segment: 'tickets',
                title: 'تیکت ها',
                icon: <ChecklistRtl/>,
            },
            {
                segment: 'new',
                title: 'پشتیبانی جدید',
                icon: <AddTask/>,
            },
        ],
    },
    {
        segment: 'settings',
        title: 'تنظیمات',
        icon: <Settings/>,
        children: [
            {
                segment: 'profile',
                title: 'پروفایل من',
                icon: <PersonPin/>,
            },
            {
                segment: 'corporates',
                title: 'سازمان های من',
                icon: <CorporateFare/>,
            },
            {
                segment: 'exit',
                title: 'خروج',
                icon: <PowerSettingsNew/>,
            },
        ],
    }
];
