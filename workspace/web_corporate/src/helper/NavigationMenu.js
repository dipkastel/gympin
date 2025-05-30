import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import {Chip} from "@mui/material";
import {
    AccountBalanceWalletOutlined,
    CalendarMonth,
    CardGiftcard,
    Commute,
    ConnectingAirports,
    ContactEmergency,
    CorporateFare,
    CreditScore,
    Fastfood,
    Group,
    HealthAndSafety,
    LocalLibrary,
    Movie,
    PersonPin, ReceiptLong,
    Settings,
    SportsVolleyball,
    SupportAgent,
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
        title: 'خدمات',
    },
    {
        segment: 'sport',
        title: 'ورزش',
        icon: <SportsVolleyball/>,
    },
    {
        segment: 'food',
        title: 'غذا و میان وعده',
        icon: <Fastfood/>,
    },
    {
        segment: 'health',
        title: 'سلامت',
        icon: <HealthAndSafety/>,
    },
    {
        segment: 'event',
        title: 'رویداد',
        icon: <CalendarMonth/>,
    },
    {
        segment: 'consult',
        title: 'مشاوره',
        icon: <ContactEmergency/>,
    },
    {
        segment: 'gift',
        title: 'هدایا',
        icon: <CardGiftcard/>,
    },
    {
        segment: 'learn',
        title: 'آموزش و توسعه',
        icon: <LocalLibrary/>,
    },
    {
        segment: 'loan',
        title: 'اقساط و تسهیلات',
        icon: <CreditScore/>,
    },
    {
        segment: 'transport',
        title: 'حمل و نقل',
        icon: <Commute/>,
    },
    {
        segment: 'travel',
        title: 'سفر و گردشگری',
        icon: <ConnectingAirports/>,
    },
    {
        segment: 'cult',
        title: 'فرهنگ و هنر',
        icon: <Movie/>,
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
        // children: [
        //     {
        //         segment: 'list',
        //         title: 'لیست',
        //         icon: <PermContactCalendar/>,
        //     },
        //     {
        //         segment: 'increaseGroups',
        //         title: 'اعتبار دهی گروهی',
        //         icon: <GroupAdd/>,
        //     },
        //     {
        //         segment: 'groups',
        //         title: 'ویرایش گروه ها',
        //         icon: <ManageAccounts/>,
        //     },
        // ],
    },
    {
        segment: 'finance',
        title: 'شارژ',
        icon: <AccountBalanceWalletOutlined/>,
        // children: [
        // {
        //     segment: '',
        //     title: 'صورت وضعیت',
        //     icon: <DescriptionIcon/>,
        // },
        //     {
        //         segment: 'increaseCharge',
        //         title: 'افزایش شارژ',
        //         icon: <AddCard/>,
        //     },
        //     {
        //         segment: 'IncreaseHistory',
        //         title: 'تاریخچه',
        //         icon: <CreditScore/>,
        //     },
        // ],
    },
    {
        segment: 'receipt',
        title: 'فاکتور ها',
        icon: <ReceiptLong/>,
        // children: [
        // {
        //     segment: '',
        //     title: 'صورت وضعیت',
        //     icon: <DescriptionIcon/>,
        // },
        //     {
        //         segment: 'increaseCharge',
        //         title: 'افزایش شارژ',
        //         icon: <AddCard/>,
        //     },
        //     {
        //         segment: 'IncreaseHistory',
        //         title: 'تاریخچه',
        //         icon: <CreditScore/>,
        //     },
        // ],
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
        segment: 'reports',
        title: 'گزارشات',
        icon: <BarChartIcon/>,
        action: <Chip label={"به زودی"} color={"default"} size="small"/>,
        // children: [
        //     {
        //         segment: 'general',
        //         title: 'عمومی',
        //         icon: <StackedBarChart/>,
        //     },
        //     {
        //         segment: 'usage',
        //         title: 'استفاده',
        //         icon: <PieChart/>,
        //     },
        //     {
        //         segment: 'finance',
        //         title: 'مالی',
        //         icon: <BubbleChart/>,
        //     },
        // ],
    },
    {
        segment: 'support',
        title: 'پشتیبانی',
        icon: <SupportAgent/>,
        // children: [
        //     {
        //         segment: 'tickets',
        //         title: 'تیکت ها',
        //         icon: <ChecklistRtl/>,
        //     },
        //     {
        //         segment: 'new',
        //         title: 'پشتیبانی جدید',
        //         icon: <AddTask/>,
        //     },
        // ],
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
            }
        ],
    }
];
