import Layout from "./layouts/Layout";
import Support from "../pages/support/Support";
import EditProfile from "../pages/editProfile/EditProfile";
import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import { NotFound } from "../pages/error/NotFound";
import Logout from "../pages/auth/Logout";
import EditPlace from "../pages/placeDetail/EditPlace";
import SupportDetail from "../pages/support/supportDetail/SupportDetail";
import SettingsPlace from "../pages/settings/SettingsPlace";
import GeneralReport from "../pages/report/GeneralReport";
import MyPlace from "../pages/myPlace/myPlace";
import Finance from "../pages/finance/Finance";
import Users from "../pages/users/Users";
import PurchasedSubscribe from "../pages/purchased/subscribe/PurchasedSubscribe";
import __DemandPayment from "../pages/finance/__DemandPayment";
import Images from "../pages/images/Images";
import Personnel from "../pages/personnel/Personnel";
import About from "../pages/about/About";
import Option from "../pages/options/Option";
import TestIcons from "../components/TestIcons";
import Contract from "../pages/contract/Contract";

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
    path: "icons",
    Component: Layout,
    children: [
      {
        path: "",
        Component: TestIcons,
      },
    ],
  },
  {
    path: "contract",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Contract,
      },
    ],
  },
  {
    path: "reports",
    Component: Layout,
    children: [
      {
        path: "",
        Component: GeneralReport,
      },
    ],
  },
  {
    path: "finance",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Finance,
      },
      {
        path: "demand",
        Component: __DemandPayment,
      },
    ],
  },
  {
    path: "users",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Users,
      },
    ],
  },
  {
    path: "purchased",
    Component: Layout,
    children: [
      {
        path: "subscribes",
        Component: PurchasedSubscribe,
      },
    ],
  },
  {
    path: "management",
    Component: Layout,
    children: [
      {
        path: "",
        Component: MyPlace,
      },
      {
        path: "images",
        Component: Images,
      },
      {
        path: "personnel",
        Component: Personnel,
      },
      {
        path: "abouts",
        Component: About,
      },
      {
        path: "facilities",
        Component: Option,
      },
    ],
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
        path: "detail/:supportId",
        Component: SupportDetail,
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
        path: "places",
        Component: SettingsPlace,
      },
      {
        path: "editPlace",
        Component: EditPlace,
      },
      {
        path: "exit",
        Component: Logout,
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
