import Layout from "./layouts/Layout";
import IncreaseHistory from "../pages/IncreaseListPeyment/IncreaseHistory";
import Finance from "../pages/finance/Finance";
import Groups from "../pages/Groups/Groups";
import Management from "../pages/management/Management";
import Support from "../pages/support/Support";
import IncreaseGroupCredit from "../pages/increaseGroupCredit/IncreaseGroupCredit";
import SingleUser from "../pages/singleUser/SingleUser";
import EditProfile from "../pages/editProfile/EditProfile";
import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import ComingSoon from "../pages/commingSoon/ComingSoon";
import UsageReport from "../pages/report/UsageReport";
import FinanceReport from "../pages/report/FinanceReport";
import {NotFound} from "../pages/error/NotFound";
import Logout from "../pages/auth/Logout";
import EditCorporate from "../pages/corporateDetail/EditCorporate";
import NewUserPage from "../pages/users/NewUserPage";
import Charge from "../pages/charge/Charge";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import NewSupport from "../pages/support/NewSupport";
import SettingsCorporate from "../pages/settings/SettingsCorporate";
import GeneralReport from "../pages/report/GeneralReport";

export const BrowserRouter =[
    {
        path: '',
        Component: ()=>  window.location="/dashboard",
    },
    {
        path: 'dashboard',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Dashboard,
            }
        ],
    },
    {
        path: 'personnel',
        Component: Layout,
        children: [
            {
                path: '',
                Component: NewUserPage,
            },
            {
                path: 'list',
                Component: NewUserPage,
            },
            {
                path: 'increaseGroups',
                Component: IncreaseGroupCredit,
            },
            {
                path: 'groups',
                Component: Groups,
            },
            {
                path: "detail/:PersonnelId",
                Component: SingleUser,

            }
        ],
    },
    {
        path: 'finance',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Charge,
            },
            {
                path: 'IncreaseHistory',
                Component: IncreaseHistory,
            },
        ],
    },
    {
        path: 'reports',
        Component: Layout,
        children: [
            {
                path: '',
                Component: GeneralReport,
            },
            {
                path: 'general',
                Component: GeneralReport,
            },
            {
                path: 'usage',
                Component: UsageReport,
            },
            {
                path: 'finance',
                Component: FinanceReport,
            }
        ],
    },
    {
        path: 'support',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Support,
            },
            {
                path: 'tickets',
                Component: Support,
            },
            {
                path: 'newTicket',
                Component: FinanceReport,
            },
            {
                path: 'detail/:supportId',
                Component: SupportDetail,
            },
            {
                path: 'new',
                Component: NewSupport,
            }
        ],
    },
    {
        path: 'buyTicket',
        Component: Layout,
        children: [
            {
                path: '',
                Component: ComingSoon,
            },
        ],
    },
    {
        path: 'settings',
        Component: Layout,
        children: [
            {
                path: '',
                Component: EditProfile,
            },
            {
                path: 'profile',
                Component: EditProfile,
            },
            {
                path: 'corporates',
                Component: SettingsCorporate,
            },
            {
                path: 'exit',
                Component: Logout,
            }
        ],
    },
    {
        path: 'events',
        Component: Layout,
        children: [
            {
                path: '',
                Component: ComingSoon,
            },
        ],
    },
    {
        path: 'management',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Management,
            },
            {
                path: 'details',
                Component: EditCorporate,
            },
        ],
    },
    {
        path: 'auth',
        Component: Layout,
        children: [
            {
                path: 'logout',
                Component: Logout,
            },
        ],
    },
    {
        path: '*',
        Component: Layout,
        children: [
            {
                path:"*",
                element: <NotFound />,
            }
        ],
    },
]
