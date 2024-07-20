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
import {personnelAccessEnumT} from "../enums/personnelAccessEnum";

var purchasedTypes = [
    {
        Id:1,
        Name: "عضویت ها",
        Type: "subscribe",
        Icon: <CardMembershipIcon sx={{fontSize:87}} color={"info"} />,
        Destination:"/purchased/subscribes",
        Access:personnelAccessEnumT.SellsSubscribes,
        Status:"Active"
    },
    {
        Id:2,
        Name: "کلاس ها",
        Type: "course",
        Icon: <GroupsIcon sx={{fontSize:87}} color={"action"} />,
        Destination:"/purchased/courses",
        Access:personnelAccessEnumT.SellsCourse,
        Status:"Soon"
    },
    {
        Id:3,
        Name: "رزرو ها",
        Type: "reserve",
        Icon: <StadiumIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/reserves",
        Access:personnelAccessEnumT.SellsReserve,
        Status:"Soon"
    },
    {
        Id:4,
        Name: "خدمات",
        Type: "service",
        Icon: <VolunteerActivismIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/services",
        Access:personnelAccessEnumT.SellsService,
        Status:"Soon"
    },
    {
        Id:5,
        Name: "برنامه تمرینی",
        Type: "workout",
        Icon: <FitnessCenterIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/workout",
        Access:personnelAccessEnumT.SellsWorkout,
        Status:"Soon"
    },
    {
        Id:6,
        Name: "برنامه غذایی",
        Type: "diet",
        Icon: <MonitorWeightIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/diet",
        Access:personnelAccessEnumT.SellsDiet,
        Status:"Soon"
    },
    {
        Id:7,
        Name: "بوفه و رستوران",
        Type: "food",
        Icon: <FastfoodIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/food",
        Access:personnelAccessEnumT.SellsFood,
        Status:"Soon"
    },
    {
        Id:8,
        Name: "محصولات",
        Type: "product",
        Icon: <ShoppingBasketIcon sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/products",
        Access:personnelAccessEnumT.SellsProduct,
        Status:"Soon"
    },
    {
        Id:9,
        Name: "تنظیمات",
        Type: "sellSetting",
        Icon: <SettingsIcon sx={{fontSize:87}} color={"action"}/>,
        Destination:"/purchased/settings",
        Status:"Soon"
    }
]


export default purchasedTypes;
