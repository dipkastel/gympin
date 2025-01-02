import React, {useState} from 'react';
import {Alert, Button, Card, CardContent, Collapse, Drawer, IconButton, Link, TextField, Typography} from "@mui/material";
import {LocalPhone, PhoneInTalk} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Grid2";
import _ContactForm from "../pages/partials/_ContactForm";
import {formTypeEnum} from "../helper/enum/formTypeEnum";
import {formStatus} from "../helper/enum/fromStatusEnum";

const Header = () => {
    const [openDrawer,setOpenDrawer] = useState(false);
    const [thisFormStatus, setThisFormStatus] = useState(null)
    return (
        <>
            <header className={"DesktopHeader"}>
                <a href={"/"} >
                    <img src={"/assets/images/logo300.png"} alt={"لوگو جیم پین"} />
                </a>
                <ul>
                    <li><a href={"/#intro"}>ثبت نام</a></li>
                    <li><a href={"/corporate"}>سازمان‌ها و شرکت‌ها</a></li>
                    <li><a href={"/about"}> آشنایی با جیم پین </a></li>
                    <li><a href={"/blog"}>مطالب و مقالات</a></li>
                </ul>
                <div className={"header-actions"}>
                    <Button href={"https://apps.gympin.ir"} color={"primary"} sx={{px:"32px !important",mt:2,ml:1.6,color:"#ffffff !important"}} size={"small"} variant={"contained"} >ورود</Button>
                    <div className={"header-call"} >
                        <LocalPhone color={"primary"} />
                        <Typography sx={{mt:"5px" ,ml:"8px",fontWeight:600,direction:"ltr" }} ><a href={"tel:02177162191"}>(۰۲۱) ۷۷۱۶۲۱۹۱_۲</a></Typography>
                    </div>
                </div>
            </header>
            <header className={"mobileHeader"} >
                <a href={"/"} >
                    <img src={"/assets/images/logo300.png"} alt={"لوگو جیم پین"} />
                </a>
                <div className={"header-actions"}>
                    <IconButton onClick={(e)=>{setOpenDrawer(true)}} sx={{m:1}} size={"large"}><MenuIcon sx={{fontSize:"2rem",padding:1}}/></IconButton>
                    <Button href={"https://apps.gympin.ir"} color={"primary"} sx={{px:"32px !important",mt:3.2,height:35,ml:1.6,color:"#ffffff !important"}} size={"small"} variant={"contained"} >ورود</Button>

                </div>

                <Drawer
                    anchor={"top"}
                    open={openDrawer}
                    onClose={(event, reason)=>{setOpenDrawer(false)}}
                    className={"drawer"}
                >
                    <a href={"/"} >
                        <img src={"/assets/images/logo300.png"} className={"logo"} alt={"لوگو جیم پین"} />
                    </a>
                    <ul>
                        <li><a href={"/#intro"}>ثبت نام</a></li>
                        <li><a href={"/corporate"}>ثبت سازمان‌ها و شرکت‌ها</a></li>
                        {/*<li><a href={"/places"}>ثبت مجموعه ورزشی</a></li>*/}
                        <li><a href={"/about"}> آشنایی با جیم پین </a></li>
                        <li><a href={"/blog"}>مطالب و مقالات</a></li>
                        <li><a onClick={()=>{thisFormStatus===null?setThisFormStatus(formStatus.filled):setThisFormStatus(null)}}>درخواست تماس</a></li>
                    </ul>

                    <Collapse in={thisFormStatus === formStatus.complete}>
                        <Alert sx={{m: 3}} elevation={10} variant={"filled"} severity={"success"}>با تشکر از شما. همکاران ما به زودی با
                            شما تماس خواهند گرفت.</Alert>
                    </Collapse>
                    <Collapse in={thisFormStatus === formStatus.error}>
                        <Alert sx={{m:3}} elevation={10} variant={"filled"} severity={"error"}>خطا در ارسال اطلاعات . لطفا با شماره
                           ‌های جیم پین تماس بگیرید!</Alert>
                    </Collapse>
                    <Collapse in={thisFormStatus === formStatus.filled}>
                        <Card elevation={5} sx={{ borderRadius: 3,maxWidth:500,m:4}}>
                            <CardContent>
                                <Grid direction={"column"} spacing={3} textAlign={"center"}><Typography variant={"body2"} sx={{
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    textAlign: "justify"
                                }}>برای دریافت اطلاعات بیشتر فرم زیر را تکمیل نمایید : </Typography>

                                    <_ContactForm formType={formTypeEnum.advise} setFormStatus={(e)=>setThisFormStatus(e)} />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Collapse>
                </Drawer>
            </header>
        </>
    );
};

export default Header;
