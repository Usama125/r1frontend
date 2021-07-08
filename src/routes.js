/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import Packages from "views/Packages/Index";
import Category from "views/Category/index";
import Users from 'views/Users/index';
import Reviews from 'views/Reviews/index';
import Staff from 'views/Staff/index';
import Bookings from 'views/Bookings/index'
import Setting from "views/Setting/index";
import { Settings } from "@material-ui/icons";
import AddCategory from "views/Category/AddCategory";
import AddPackage from "views/Packages/AddPackages";
import AddStaff from "views/Staff/AddStaff";
import BookingDetails from "views/Bookings/BookingDetails";

const dashboardRoutes = [
  {
    path: "/packages",
    name: "Packages",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Packages,
    layout: "/admin"
  },
  {
    path: "/addPackage",
    name: "Add Package",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddPackage,
    layout: "/admin"
  },
  {
    path: "/editPackage/:id",
    name: "Edit Package",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddPackage,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Category,
    layout: "/admin"
  },
  {
    path: "/addCategory",
    name: "Add Category",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddCategory,
    layout: "/admin"
  },
  {
    path: "/editCategory/:id",
    name: "Edit Category",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddCategory,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/reviews",
    name: "Package Reviews",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Reviews,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "Staff List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Staff,
    layout: "/admin"
  },
  {
    path: "/addStaff",
    name: "Add Staff",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddStaff,
    layout: "/admin"
  },
  {
    path: "/editStaff/:id",
    name: "Edit Staff",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddStaff,
    layout: "/admin"
  },
  {
    path: "/bookings",
    name: "Bookings List",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Bookings,
    layout: "/admin"
  },
  {
    path: "/viewDetails/:id",
    name: "Booking Details",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: BookingDetails,
    layout: "/admin"
  }
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   rtlName: "لوحة القيادة",
  //   icon: Settings,
  //   component: Setting,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
