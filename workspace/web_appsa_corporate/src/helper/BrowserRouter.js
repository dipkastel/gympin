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
import Food from "../pages/food/Food";
import CateringDetail from "../pages/cateringDetail/CateringDetail";
import Health from "../pages/health/Health";
import Event from "../pages/Event/Event";
import Cult from "../pages/Cult/Cult";
import Travel from "../pages/Travel/Travel";
import Transport from "../pages/Transport/Transport";
import Loan from "../pages/Loan/Loan";
import Gift from "../pages/Gift/Gift";
import Consult from "../pages/Consult/Consult";
import Sports from "../pages/sport/Sports";
import Gympin from "../pages/sport/Gympin/Gympin";
import Learn from "../pages/Learn/Learn";
import Employment from "../pages/employment/Employment";
import IncreaseSelect from "../pages/increaseSelect/IncreaseSelect";
import PayCateringInvoices from "../pages/cateringDetail/payCateringInvoices/PayCateringInvoces";
import ProcessingInvoices from "../pages/cateringDetail/ProcessingInvoices/ProcessingInvoces";
import Transactions from "../pages/TransActions/Transactions";
import TheaterAndLearn from "../pages/Learn/theaterAndLearn/TheaterAndLearn";
import Survay from "../pages/Survay/Survay";
import EmployeeHampers from "../pages/EmployeeHampers/EmployeeHampers";
import Nuts from "../pages/EmployeeHampers/nuts/Nuts";

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
        path: 'food',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Food,
            },
            {
                path: 'details/:cateringId',
                Component: CateringDetail,
            },
            {
                path: 'needToPay/:cateringId',
                Component: PayCateringInvoices,
            },
            {
                path: 'Process/:cateringId',
                Component: ProcessingInvoices,
            },
        ],
    },
    {
        path: 'sport',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Sports,
            },
            {
                path: 'Gympin',
                children: [
                    {
                        path: '',
                        Component: Gympin,
                    },
                    {
                        path: 'increaseGroups',
                        Component: IncreaseGroupCredit,
                    },
                    {
                        path: 'increaseSelect',
                        Component: IncreaseSelect,
                    },
                ],
            },
        ],
    },
    {
        path: 'health',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Health,
            },
        ],
    },
    {
        path: 'learn',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Learn,
            },
            {
                path: 'theaterAndLearn',
                Component: TheaterAndLearn,
            },
        ],
    },
    {
        path: 'event',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Event,
            },
        ],
    },
    {
        path: 'consult',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Consult,
            },
        ],
    },
    {
        path: 'gift',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Gift,
            },
        ],
    },
    {
        path: 'loan',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Loan,
            },
        ],
    },
    {
        path: 'transport',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Transport,
            },
        ],
    },
    {
        path: 'employment',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Employment,
            },
        ],
    },
    {
        path: 'survay',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Survay,
            },
        ],
    },
    {
        path: 'travel',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Travel,
            },
        ],
    },
    {
        path: 'cult',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Cult,
            },
        ],
    },
    {
        path: 'receipt',
        Component: Layout,
        children: [
            {
                path: '',
                Component: Transactions,
            },
        ],
    },
    {
        path: 'EmployeeHampers',
        Component: Layout,
        children: [
            {
                path: '',
                Component: EmployeeHampers,
            },
            {
                path: 'nuts',
                Component: Nuts,
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
