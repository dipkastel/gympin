import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GroupsIcon from "@mui/icons-material/Groups";
import StadiumIcon from "@mui/icons-material/Stadium";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React from "react";
import {personnelAccessEnumT} from "../enums/personnelAccessEnum";

var ticketTypes = [
    {
        Id:1,
        Name: "عضویت ها",
        Type: "subscribe",
        Icon: <CardMembershipIcon sx={{fontSize:87}} color={"secondary"} />,
        Destination:"/ticket/subscribes",
        Access:personnelAccessEnumT.ManagementTicketSubscribes,
        Status:"Active"
    },
    {
        Id:2,
        Name: "کلاس ها",
        Type: "courses",
        Icon: <GroupsIcon sx={{fontSize:87}}  color={"secondary"}  />,
        Destination:"/ticket/courses",
        Access:personnelAccessEnumT.ManagementTicketCourse,
        Status:"Active"
    },
    {
        Id:3,
        Name: "رزرو ها",
        Type: "reserves",
        Icon: <StadiumIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/reserves",
        Access:personnelAccessEnumT.ManagementTicketReserve,
        Status:"Soon"
    },
    {
        Id:4,
        Name: "خدمات",
        Type: "services",
        Icon: <VolunteerActivismIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/services",
        Access:personnelAccessEnumT.ManagementTicketService,
        Status:"Soon"
    },
    {
        Id:5,
        Name: "برنامه تمرینی",
        Type: "workout",
        Icon: <FitnessCenterIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/workout",
        Access:personnelAccessEnumT.ManagementTicketWorkout,
        Status:"Soon"
    },
    {
        Id:6,
        Name: "برنامه غذایی",
        Type: "diet",
        Icon: <MonitorWeightIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/diet",
        Access:personnelAccessEnumT.ManagementTicketDiet,
        Status:"Soon"
    },
    {
        Id:7,
        Name: "بوفه و رستوران",
        Type: "food",
        Icon: <FastfoodIcon  sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/food",
        Access:personnelAccessEnumT.ManagementTicketFood,
        Status:"Soon"
    },
    {
        Id:8,
        Name: "محصولات",
        Type: "products",
        Icon: <ShoppingBasketIcon sx={{fontSize:87}} color={"action"}/>,
        Destination:"/ticket/products",
        Access:personnelAccessEnumT.ManagementTicketProduct,
        Status:"Soon"
    }
]


export default ticketTypes;
