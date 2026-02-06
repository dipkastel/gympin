import React, {useContext, useEffect, useState} from 'react';
import {
    Badge, Box,
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
    ListSubheader, TextField,
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
    ReceiptLong, ShoppingCart,
    SupportAgent,
    Wallet
} from "@mui/icons-material";
import {Support_add} from "../network/api/support.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "./GympinPagesProvider";

const DrawerLayout = ({UserBasket,setMenuOpen}) => {

    const [openModalExit,setOpenModalExit] = useState(false);
    const [loading,setLoading] = useState(false);
    const [openModalRegister,setOpenModalRegister] = useState(false);
    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);

    const [formData, setFormData] = useState({
        gymName: '',
        gymAddress: '',
        gymPhone: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {mode, setMode} = useColorScheme();

    useEffect(() => {
        setMode("light");
    }, []);

    useEffect(() => {
        if(openModalRegister)
            setLoading(false);
    }, [openModalRegister]);

    if (!mode) {
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.gymName) newErrors.gymName = 'نام مجموعه ضروری است';
        if (!formData.gymAddress) newErrors.gymAddress = 'آدرس ضروری است';
        if (!formData.gymPhone) newErrors.gymPhone = 'شماره تماس ضروری است';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        setLoading(true);
        if (validate()) {
            Support_add({
                Title:  "درخواست افزودن مجموعه "+formData.gymName,
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: "درخواست افزودن "+formData.gymName+" با شماره "+formData.gymPhone+" با آدرس " + formData.gymAddress +" را دارم اطلاعات اضافی : "+formData.description,
                    IsRead: "true"
                },
                UserId: currentUser.Id
            }).then(result => {
                setSubmitSuccess(true);
                setFormData({
                    gymName: '',
                    gymAddress: '',
                    gymPhone: '',
                    description: '',
                });
                setTimeout(() => {
                    error.showError({message: "ثبت درخواست با موفقیت انجام شد",});
                    setOpenModalRegister(false)
                }, 2000);
            }).catch(e => {
                setLoading(false);
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
    };


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



    function renderModalRegister() {
        return(
            <Dialog
                open={openModalRegister}
                onClose={() => setOpenModalRegister(false)}
            >
                <DialogTitle>درخواست ثبت مجموعه</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" align="center" sx={{ mb: 2,textAlign:"justify" }}>
                        اگر مجموعه مورد نظرتان در اپلیکیشن موجود نیست، جزئیات آن را اینجا وارد کنید. تیم ما بررسی می‌کند و در صورت امکان، در سریع ترین زمان ممکن به اپ اضافه خواهیم کرد.
                    </Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="نام مجموعه"
                            name="gymName"
                            value={formData.gymName}
                            onChange={handleChange}
                            error={!!errors.gymName}
                            helperText={errors.gymName}
                            variant="outlined"
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="آدرس دقیق مجموعه (شامل شهر و خیابان)"
                            name="gymAddress"
                            value={formData.gymAddress}
                            onChange={handleChange}
                            error={!!errors.gymAddress}
                            helperText={errors.gymAddress}
                            variant="outlined"
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="شماره تماس مجموعه"
                            name="gymPhone"
                            value={formData.gymPhone}
                            onChange={handleChange}
                            error={!!errors.gymPhone}
                            helperText={errors.gymPhone}
                            variant="outlined"
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="توضیحات اضافی (اختیاری، مثل نام مدیر مجموعه و..)"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            variant="outlined"
                            disabled={loading}
                        />
                        {submitSuccess && (
                            <Typography variant="body2" color="success.main" align="center">
                                پیشنهاد شما ثبت شد. ممنون!
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={loading} sx={{ m: 1 }} variant="contained" color="error" onClick={() => setOpenModalRegister(false)}>
                        لغو
                    </Button>
                    <Button
                        disabled={loading} sx={{ m: 1 }} variant="contained" color="success" onClick={handleSubmit}>
                        ثبت درخواست
                    </Button>
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
                            <ShoppingCart/>
                        </ListItemIcon>
                        <ListItemText primary="سبد خرید"/>
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
                    <ListItemButton href={"/support"}>
                        <ListItemIcon>
                            <SupportAgent/>
                        </ListItemIcon>
                        <ListItemText primary="پشتیبانی"/>
                    </ListItemButton>
                    <ListSubheader>
                        سیاست‌ها
                    </ListSubheader>
                    <ListItemButton target={"_blank"} onClick={(e)=>{setOpenModalRegister(true)}}>
                        <ListItemIcon>
                            <HelpCenter/>
                        </ListItemIcon>
                        <ListItemText primary="درخواست ثبت مجموعه"/>
                    </ListItemButton>

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

                    <ListItemButton sx={{mb:8}}  target={"_blank"} href={"https://gympin.ir/contact"}>
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
                <Grid sx={{ backgroundColor:"#FFFFFF !important",position:"fixed",bottom:0,width:250}} container justifyContent={"space-between"}>
                    <Typography sx={{ bottom: 5, left: 5}} variant={"overline"}>ساخته شده در جیم پین© 2025</Typography>
                    <IconButton sx={{ bottom: 5, right: 5}} onClick={()=>{
                        setOpenModalExit(true)
                        setMenuOpen(false);
                    }}>
                        <PowerSettingsNew/>
                    </IconButton>
                </Grid>
            </Grid>
            {renderModalExit()}
            {renderModalRegister()}
        </>

    );
};

export default DrawerLayout;
