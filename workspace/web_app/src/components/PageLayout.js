import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button, createStyles,
    FormControlLabel, Grid2 as Grid,
    IconButton,
    Paper,
    SwipeableDrawer,
    Toolbar,
    Typography, useColorScheme
} from "@mui/material";
import {AccountCircleRounded, AccountCircleTwoTone, MenuOpen} from "@mui/icons-material";
import {toPriceWithComma} from "../helper/utils";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../helper/redux/actions/SagaActions";
import {Link, useLocation} from "react-router-dom";
import {bottomMenuItems} from "../helper/bottomMenuItems";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DrawerLayout from "./DrawerLayout";
import ChatWidget from "./ChatWidget";

const PageLayout = (props) => {

    const currentUser = useSelector(state => state.auth.user);
    const userBasket = useSelector(state => state.invoice.userBasket);
    const location = useLocation();
    const pathname = window.location.pathname
    const [value, setValue] = React.useState(getTabName(pathname));
    const [openDrawer, SetOpenDrawer] = useState(false);


    function getTabName(path) {
        let selectedItem = bottomMenuItems[0].value;
        let pathParam = path.split('/')[1]
        bottomMenuItems.forEach(function (item) {

            if (item.otherRouts.includes(pathParam)) {
                selectedItem = item.value
            }
        })
        return selectedItem;
    }

    useEffect(() => {
        setValue(getTabName(location.pathname));
    }, [location]);

    useEffect(() => {
        if (currentUser) {
            props.RequestUser();
        }
    }, []);

    useEffect(() => {
        if (currentUser?.Id && window?.location?.pathname !== "/basket")
            props.RequestUserInvoices(currentUser);
    }, [currentUser]);


    return (
        <>

            <Box sx={{flexGrow: 1}}>
                <AppBar position={"fixed"} color={"primary"} >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={()=>{SetOpenDrawer(!openDrawer)}}

                        >
                            <Badge badgeContent={userBasket?.InvoiceSubscribe?.length}  sx={{
                                '& .MuiBadge-standard': {
                                    // boxShadow: '2px 3px 4px #000000'
                                },
                            }} color={"manuBadge"}  variant={"standard"}>
                                {openDrawer ? <MenuOpen sx={{fontSize:"1.8rem"}}/> : <MenuIcon sx={{fontSize:"1.8rem"}}/>}
                            </Badge>
                        </IconButton>



                        <Typography variant="h6" component="div"
                                    sx={{flexGrow: 1}}>

                        </Typography>

                        {currentUser &&
                        <Button sx={{fontWeight:600,fontSize:"1rem"}} color={"inherit"} endIcon={<AccountCircleIcon sx={{fontSize:"1.8rem !important"}}/>}  href={"/wallet"}>
                            {!!currentUser.Balance&&toPriceWithComma(currentUser.Balance)}
                        </Button>}

                    </Toolbar>
                </AppBar>
            </Box>

                <SwipeableDrawer
                    anchor={'left'}
                    sx={{zIndex:1099}}
                    open={openDrawer}
                    onClose={() => SetOpenDrawer(false)}
                    onOpen={() => SetOpenDrawer(true)}
                >
                    <DrawerLayout UserBasket={userBasket} setMenuOpen={(e)=>SetOpenDrawer(e)} />

                </SwipeableDrawer>
            <Paper  sx={{pt: {xs:7,sm:9},pb:8,minHeight:"100vh"}} elevation={0}>
                {props.children}
            </Paper>
            <ChatWidget />

            <Paper sx={{position: 'fixed',mx:2, bottom: 0, left: 0, right: 0, zIndex: 1098,borderRadius:"32px 32px 0 0",boxShadow:"0px 0px 15px #333333"}} elevation={24}>
                <BottomNavigation
                    showLabels
                    value={value}
                    sx={{borderRadius:"32px 32px 0 0"}}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    {bottomMenuItems.map((item, index) => (
                        <BottomNavigationAction key={index}   sx={{minWidth: "auto",":after":{content:'" "',bgcolor:(item.value==value)?"#e7333e":"#fff",
                                position:"absolute",
                                bottom:0,
                                width:"90px",
                                justifySelf:"center",
                                height:"7px",
                                transition:"300ms all ease",
                                borderRadius:"7px 7px 0 0"}}} component={Link} to={item.firstDirection}
                                                value={item.value} label={item.lable} icon={item.icon}/>
                    ))}
                </BottomNavigation>
            </Paper>

        </>
    );
};

export default connect(null, sagaActions)(PageLayout);
