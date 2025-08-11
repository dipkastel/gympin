import Layout from "./layouts/Layout";
import Support from "../pages/support/Support";
import EditProfile from "../pages/editProfile/EditProfile";
import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import {NotFound} from "../pages/error/NotFound";
import Logout from "../pages/auth/Logout";
import EditCatering from "../pages/editCatering/EditCatering";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import NewSupport from "../pages/support/NewSupport";
import SettingsCatering from "../pages/settings/SettingsCatering";
import Finance from "../pages/finance/Finance";
import BaseReportBox from "../pages/report/BaseReportBox";
import FoodItems from "../pages/foodItems/FoodItems";
import Menu from "../pages/menu/Menu";
import PreOrders from "../pages/preOrders/PreOrders";
import Orders from "../pages/orders/Orders";
import EditPreOrder from "../pages/preOrders/edit/EditPreOrder";
import OrderDetails from "../pages/orders/Details/OrderDetails";

export const BrowserRouter = [
  {
    path: "",
    Component: () => (window.location = "/dashboard"),
  },
  {
    path: "dashboard",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
    ],
  },
  {
    path: "sellItems",
    Component: Layout,
    children: [
      {
        path: "",
        Component: FoodItems,
      },
    ]
  },
  {
    path: "menu",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Menu,
      },
    ]
  },
  {
    path: "finance",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Finance,
      },
    ],
  },
  {
    path: "PreOrders",
    Component: Layout,
    children: [
      {
        path: "",
        Component: PreOrders,
      },
      {
        path: "edit/:invoiceId",
        Component: EditPreOrder,
      },
    ],
  },
  {
    path: "Orders",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Orders,
      },
      {
        path: "details/:invoiceId",
        Component: OrderDetails,
      },
    ],
  },
  {
    path: "reports",
    Component: Layout,
    children: [
      {
        path: "",
        Component: BaseReportBox,
      },
    ]
  },
  {
    path: "support",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Support,
      },
      {
        path: "tickets",
        Component: Support,
      },
      {
        path: "detail/:supportId",
        Component: SupportDetail,
      },
      {
        path: "new",
        Component: NewSupport,
      },
    ],
  },
  {
    path: "settings",
    Component: Layout,
    children: [
      {
        path: "",
        Component: EditProfile,
      },
      {
        path: "profile",
        Component: EditProfile,
      },
      {
        path: "caterings",
        Component: SettingsCatering,
      },
      {
        path: "exit",
        Component: Logout,
      },
    ],
  },
  {
    path: "EditCatering",
    Component: Layout,
    children: [
      {
        path: "",
        Component: EditCatering,
      },
    ],
  },
  {
    path: "auth",
    Component: Layout,
    children: [
      {
        path: "logout",
        Component: Logout,
      },
    ],
  },
  {
    path: "*",
    Component: Layout,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
