import React, {useState} from 'react';
import {Button, Card, CardContent, Chip, Collapse, Typography} from "@mui/material";
import {ChevronLeft, ChevronRight, ExpandLess, ExpandMore} from "@mui/icons-material";


const _GympinIntro = () => {
    const [show,setShow] = useState(false);
    return (
        <>
            <Button variant={"outlined"} fullWidth sx={{py:1.5,px:5,borderRadius:3}} color={"error"} endIcon={
                <Chip variant={"filled"} size={"medium"} sx={{bgcolor:"#FFFFFF",color:"#e7333e"}} label={
                    show?<ExpandLess sx={{mt:0.4,fontSize:"2rem" }} />:<ExpandMore sx={{mt:0.4,fontSize:"2rem" }} />
                } />
            } onClick={e=>setShow(!show)} >
                <Typography sx={{mr:2,ml:4}} variant={"subtitle2"}>
                    جیم پین چیه؟
                </Typography>
            </Button>
            <Collapse in={show}>
                <Card elevation={10} sx={{mt:2,borderRadius:3}}>
                    <CardContent sx={{px:3,py:2.4}}>
                        <Typography sx={{mx:2,textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                            جیم پین یک پلتفرم نوین برای ارتباط بین شرکت ها و مراکز ورزشی است که به طور خاص، به منظور مدیریت خدمات ورزشی و سلامت کارکنان در سازمان ها و شرکت ها طراحی شده است.
                        </Typography>
                        <Button fullWidth variant={"outlined" } href={"https://gympin.ir/"} className={"btn-red1"} sx={{my:3,py:1.5,borderRadius:3}} endIcon={
                            <Chip variant={"filled"} size={"medium"} sx={{bgcolor:"#FFFFFF",color:"#e7333e"}} label={
                                <ChevronLeft sx={{mt:0.3,fontSize:"2rem" }} />
                            } />
                        }>
                            <Typography sx={{mr:2,ml:6}} variant={"subtitle2"}>
                                ورود به سایت
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Collapse>
        </>
    );
};
export default _GympinIntro;
