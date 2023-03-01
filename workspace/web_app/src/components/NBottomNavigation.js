import React from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import {Link} from "react-router-dom";


export default function NBottomNavigation(){
    const bottomItems = [
        {
            value:"home",
            lable:"جیم پین",
            firstDirection:"/",
            icon:<HomeIcon/>,
            otherRouts:[""]
        },
        {
            value:"places",
            lable:"مجموعه ها",
            firstDirection:"/places",
            icon:<GrainIcon/>,
            otherRouts:["places","place"]
        },
        {
            value:"tickets",
            lable:"بلیت ها",
            firstDirection:"/tickets",
            icon:<ConfirmationNumberOutlinedIcon/>,
            otherRouts:["tickets"]
        },
        {
            value:"profile",
            lable:"پروفایل",
            firstDirection:"/profile",
            icon:<ManageAccountsIcon/>,
            otherRouts:["profile","wallet","notifs",]
        }
    ]
    const pathname = window.location.pathname
    const [value, setValue] = React.useState(getTabName(pathname));

    console.log("NBN",getTabName(pathname));
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
                        <BottomNavigationAction key={index} sx={{minWidth:"auto"}} component={Link} to={item.firstDirection} value={item.value} label={item.lable} icon={item.icon} />
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
