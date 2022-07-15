import React from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";


export default function NBottomNavigation(){
    const pathname = window.location.pathname
    const [value, setValue] = React.useState(pathname);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction sx={{minWidth:"auto"}} component={Link} to={'/'} value={'/'} label="خانه" icon={<HomeIcon />} />
                <BottomNavigationAction sx={{minWidth:"auto"}} component={Link} to={'/users'} value={'/users'} label="کاربران" icon={<GroupIcon />} />
                <BottomNavigationAction sx={{minWidth:"auto"}} component={Link} to={'/finance'} value={'/finance'} label="مالی" icon={<CreditCardIcon />} />
                <BottomNavigationAction sx={{minWidth:"auto"}} component={Link} to={'/management'} value={'/management'} label="مدیریت" icon={<ManageAccountsIcon />} />
                <BottomNavigationAction sx={{minWidth:"auto"}} component={Link} to={'/report'} value={'/report'} label="گزارشات" icon={<AssessmentIcon />} />
            </BottomNavigation>
        </Paper>
    );
}
