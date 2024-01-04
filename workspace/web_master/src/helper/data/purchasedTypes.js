import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GroupsIcon from "@mui/icons-material/Groups";
import StadiumIcon from "@mui/icons-material/Stadium";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SettingsIcon from '@mui/icons-material/Settings';
import React from "react";

var purchasedTypes = [
    {
        Id:1,
        Name: "عضویت ها",
        Type: "subscribe",
        Icon: <CardMembershipIcon sx={{fontSize:87}} color={"info"} />,
        Destination:"/purchased/subscribes",
        Status:"Active"
    },
    {
        Id:2,
        Name: "کلاس ها",
        Type: "courses",
        Icon: <GroupsIcon sx={{fontSize:87}} color={"action"} />,
        Destination:"/purchased/courses",
        Status:"Soon"
    },
    {
        Id:3,
        Name: "رزرو ها",
        Type: "reserves",
        Icon: <StadiumIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/reserves",
        Status:"Soon"
    },
    {
        Id:4,
        Name: "خدمات",
        Type: "services",
        Icon: <VolunteerActivismIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/services",
        Status:"Soon"
    },
    {
        Id:5,
        Name: "برنامه تمرینی",
        Type: "workout",
        Icon: <FitnessCenterIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/workout",
        Status:"Soon"
    },
    {
        Id:6,
        Name: "برنامه غذایی",
        Type: "diet",
        Icon: <MonitorWeightIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/diet",
        Status:"Soon"
    },
    {
        Id:7,
        Name: "بوفه و رستوران",
        Type: "food",
        Icon: <FastfoodIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/food",
        Status:"Soon"
    },
    {
        Id:8,
        Name: "محصولات",
        Type: "products",
        Icon: <ShoppingBasketIcon sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/products",
        Status:"Soon"
    },
    {
        Id:9,
        Name: "تنظیمات",
        Type: "sellSettings",
        Icon: <SettingsIcon sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/settings",
        Status:"Soon"
    }
]


export default purchasedTypes;
