import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid2 as Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
    useColorScheme
} from "@mui/material";
import {
    BookOnline,
    Dialpad,
    Gavel,
    Grain,
    HelpCenter,
    LocalActivity, LocalActivityOutlined,
    Notifications,
    PowerSettingsNew,
    ReceiptLong,
    SupportAgent,
    Wallet
} from "@mui/icons-material";

const DrawerLayout = ({UserBasket,setMenuOpen}) => {

    const [openModalExit,setOpenModalExit] = useState(false);
    const {mode, setMode} = useColorScheme();

    useEffect(() => {
        setMode("light");
    }, []);

    if (!mode) {
        return null;
    }



    function renderModalExit() {
        return(<Dialog
            open={openModalExit} onClose={() => setOpenModalExit(false)}>
            <DialogTitle>خروج از جیم پین</DialogTitle>
            <DialogContent>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    واقعا‌ می‌خواید از جیم پین خارج بشید؟
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"success"} onClick={() => setOpenModalExit(false)}> لغو </Button>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} href={"/logout"} >خروج</Button>
            </DialogActions>
        </Dialog>)
    }



    return (
        <>
            <Grid sx={{pt: 6, minWidth: 250, height: "100vh"}}>

                <List
                    sx={{width: '100%', maxWidth: 360}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListSubheader>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Typography sx={{pt: 2, pb: 1.5}} variant={"caption"}>منو</Typography>
                            {/*<IconButton onClick={()=>setMode(mode==='dark'?'light':'dark')}>*/}
                            {/*    {mode==='dark'?<LightMode/>:<DarkMode/>}*/}
                            {/*</IconButton>*/}
                        </Grid>
                    </ListSubheader>
                    <ListItemButton href={"/places"}>
                        <ListItemIcon>
                            <Grain/>
                        </ListItemIcon>
                        <ListItemText primary="مجموعه ها"/>
                    </ListItemButton>
                    <ListItemButton href={"/wallet"}>
                        <ListItemIcon>
                            <Wallet/>
                        </ListItemIcon>
                        <ListItemText primary="کیف پول"/>
                    </ListItemButton>
                    {UserBasket &&
                    <ListItemButton href={"/basket"}>
                        <ListItemIcon>
                            <LocalActivity/>
                        </ListItemIcon>
                        <ListItemText primary="خرید"/>
                        <Badge sx={{mr: 2}} badgeContent={UserBasket?.InvoiceSubscribe?.length} color="primary"/>
                    </ListItemButton>
                    }
                    <ListItemButton href={"/tickets"}>
                        <ListItemIcon>
                            <BookOnline/>
                        </ListItemIcon>
                        <ListItemText primary="بلیط ها"/>
                    </ListItemButton>
                    {/*{UserBasket &&*/}
                    {/*<ListItemButton href={"/notifs"}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <Notifications/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="پیام ها"/>*/}
                    {/*    <Badge sx={{mr: 2}} badgeContent={0} color="primary"/>*/}
                    {/*</ListItemButton>*/}
                    {/*}*/}
                    <ListSubheader>
                        دسترسی ها
                    </ListSubheader>
                    {/*<ListItemButton href={"/support"}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <SupportAgent/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="پشتیبانی"/>*/}
                    {/*</ListItemButton>*/}
                    <ListItemButton href={"/invoices"}>
                        <ListItemIcon>
                            <ReceiptLong/>
                        </ListItemIcon>
                        <ListItemText primary="تراکنش ها"/>
                    </ListItemButton>
                    <ListItemButton href={"/ticketsHistory"}>
                        <ListItemIcon>
                            <LocalActivityOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="تاریخچه بلیط ها"/>
                    </ListItemButton>
                    <ListSubheader>
                        سیاست‌ها
                    </ListSubheader>
                    <ListItemButton target={"_blank"} href={"https://gympin.ir/faq"}>
                        <ListItemIcon>
                            <HelpCenter/>
                        </ListItemIcon>
                        <ListItemText primary="سوالات متداول"/>
                    </ListItemButton>

                    <ListItemButton target={"_blank"} href={"https://gympin.ir/term-and-conditions"}>
                        <ListItemIcon>
                            <Gavel/>
                        </ListItemIcon>
                        <ListItemText primary="شرایط و قوانین"/>
                    </ListItemButton>

                    <ListItemButton target={"_blank"} href={"https://gympin.ir/contact"}>
                        <ListItemIcon>
                            <Dialpad/>
                        </ListItemIcon>
                        <ListItemText primary="تماس با ما"/>
                    </ListItemButton>
                    {/*<ListItemButton onClick={handleClick}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <InboxIcon />*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="Inbox" />*/}
                    {/*    {open ? <ExpandLess /> : <ExpandMore />}*/}
                    {/*</ListItemButton>*/}
                    {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                    {/*    <List component="div" disablePadding>*/}
                    {/*        <ListItemButton sx={{ pl: 4 }}>*/}
                    {/*            <ListItemIcon>*/}
                    {/*                <StarBorder />*/}
                    {/*            </ListItemIcon>*/}
                    {/*            <ListItemText primary="Starred" />*/}
                    {/*        </ListItemButton>*/}
                    {/*    </List>*/}
                    {/*</Collapse>*/}
                </List>
                <Divider sx={{position: "absolute", bottom: 50, right: 0, width: "100%", borderColor: "#000000"}} color={"primary"}/>
                <Typography sx={{position: "absolute", bottom: 5, left: 5}} variant={"overline"}>ساخته شده در جیم پین© 2025</Typography>
                <IconButton sx={{position: "absolute", bottom: 5, right: 5}} onClick={()=>{
                    setOpenModalExit(true)
                    setMenuOpen(false);
                }}>
                    <PowerSettingsNew/>
                </IconButton>
            </Grid>
            {renderModalExit()}
        </>

    );
};

export default DrawerLayout;
