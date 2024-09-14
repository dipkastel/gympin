import React, {useState} from 'react';
import {Button, Card, CardContent, Chip, Collapse, Typography} from "@mui/material";
import {ExpandLess, ExpandMore,ChevronRight} from '@mui/icons-material';

const _WhatIsGympin = () => {
    const [show,setShow] = useState(false);
    return (
        <div>
            <Button variant={"contained"} sx={{mt:3,py:1.5,px:5,backgroundColor:"#e7333e",borderRadius:8}} color={"error"} startIcon={
                <Chip variant={"filled"} size={"medium"} sx={{bgcolor:"#FFFFFF",color:"#e7333e"}} label={
                  show?<ExpandLess sx={{mt:1.5,fontSize:"2rem" }} />:<ExpandMore sx={{mt:1.5,fontSize:"2rem" }} />
                } />
            } onClick={e=>setShow(!show)} >
                <Typography sx={{mr:2,ml:4}} variant={"subtitle2"}>
                    جیم پین چیه؟
                </Typography>
            </Button>
            <Collapse in={show}>
                <Card elevation={10} sx={{m:1.8,borderRadius:8}}>
                    <CardContent sx={{px:0.8,py:2.4}}>
                        <Typography sx={{mx:2,direction:"rtl",textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                            جیم پین یک پلتفرم نوین برای ارتباط بین شرکت ها و مراکز ورزشی است که به طور خاص، به منظور مدیریت خدمات ورزشی و سلامت کارکنان در سازمان ها و شرکت ها طراحی شده است.
                        </Typography>
                        <Button variant={"contained" } href={"https://gympin.ir/"} className={"btn-red1"} sx={{mx:0.5,my:3,py:1.5,borderRadius:8}} startIcon={
                            <Chip variant={"filled"} size={"medium"} sx={{bgcolor:"#FFFFFF",color:"#e7333e"}} label={
                                <ChevronRight sx={{mt:1.5,fontSize:"2rem" }} />
                            } />
                        }>
                            <Typography sx={{mr:2,ml:6}} variant={"subtitle2"}>
                                ورود به سایت
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Collapse>
        </div>
    );
};

export default _WhatIsGympin;
