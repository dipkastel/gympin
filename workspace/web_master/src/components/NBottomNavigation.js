import React from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import EggAltIcon from '@mui/icons-material/EggAlt';
import {Link} from "react-router-dom";
import getAccessOf from "../helper/accessManager";
import {personnelAccessEnum, personnelAccessEnumT} from "../helper/enums/personnelAccessEnum";


export default function NBottomNavigation(){
    const bottomItems = [
        {
            value:"home",
            lable:"خانه",
            firstDirection:"/",
            active:getAccessOf(personnelAccessEnumT.Home),
            icon:<HomeIcon/>,
            otherRouts:[""]
        },
        {
            value:"users",
            lable:"کاربران",
            firstDirection:"/users",
            active:getAccessOf(personnelAccessEnumT.Users),
            icon:<GroupIcon/>,
            otherRouts:["users","userqrscan"]
        },
        {
            value:"finance",
            lable:"مالی",
            firstDirection:"/finance",
            active:getAccessOf(personnelAccessEnumT.Finance),
            icon:<CreditCardIcon/>,
            otherRouts:["finance"]
        },
        {
            value:"management",
            lable:"مدیریت",
            firstDirection:"/management",
            active:true,
            icon:<ManageAccountsIcon/>,
            otherRouts:["management"]
        },
        {
            value:"report",
            lable:"گزارشات",
            firstDirection:"/report",
            active:false,
            icon:<AssessmentIcon/>,
            otherRouts:["report"]
        },
    ]
    const pathname = window.location.pathname
    const [value, setValue] = React.useState(getTabName(pathname));

    function getTabName(path){
        let selectedItem =bottomItems[0].value;
        let pathParam = path.split('/')[1]
        bottomItems.forEach(function (item) {

            if(item.otherRouts.includes(pathParam)){
                selectedItem= item.value
            }
        })
        return selectedItem;
    }
    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 , zIndex:5}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    {bottomItems.map( (item, index)=> (
                        <BottomNavigationAction hidden={!item.active} key={index} sx={{minWidth:"auto"}} component={Link} to={item.firstDirection} value={item.value} label={item.lable} icon={item.icon} />
                    ))}
                </BottomNavigation>
            </Paper>

            <Paper sx={{position: 'static', bottom: 0, left: 0, right: 0}} elevation={0}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                </BottomNavigation>
            </Paper>
        </>
    );
}
