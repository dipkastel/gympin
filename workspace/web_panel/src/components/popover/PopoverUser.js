import React, {useState} from 'react';
import {Button, Card, CardContent, ClickAwayListener, Grid, IconButton, Paper, Popper, Typography} from "@mui/material";
import {getUserFixedName} from "../../helper";
import {Call} from "@mui/icons-material";
import _popoverUserCorporates from "./_popoverUserCorporates";
import _popoverUserPlaces from "./_popoverUserPlaces";

const PopoverUser = ({user}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const id = isOpen ? "user" + user.Id : undefined;

    function clickAwayHandler() {
        setIsOpen(false)
    }

    function clickHandler(e) {
        setIsOpen(true)
        setAnchorEl(e.currentTarget);
        console.log(user);

    }

    return (
        <div>
            <Button onClick={clickHandler}>{getUserFixedName(user)}</Button>
            <Popper placement="bottom-start" id={id} open={isOpen} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={clickAwayHandler}>
                    <Card variant={"elevation"} elevation={10} sx={{borderRadius:3}} className="popper">
                        <CardContent>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>نام و نام خانوادگی </Typography></Grid>
                                <Grid><Typography sx={{p: 1}}>{user?.FullName}</Typography></Grid>
                            </Grid>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>نام کاربری </Typography></Grid>
                                <Grid><Typography sx={{p: 1}}>{user?.Username}</Typography></Grid>
                            </Grid>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>تلفن </Typography></Grid>
                                <Grid container direction={"row"} alignContent={"center"}>
                                    <Typography sx={{p: 1}}>{user?.PhoneNumber}</Typography>
                                    <IconButton  size={"small"}><Call color={"success"}/></IconButton>
                                </Grid>
                            </Grid>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>تاریخ تولد</Typography></Grid>
                                <Grid><Typography sx={{p: 1}}>{user?.Birthday?new Date(user.Birthday).toLocaleDateString('fa-IR', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }):"ثبت نشده"}</Typography></Grid>
                            </Grid>
                            <_popoverUserCorporates currentUser={user} />
                            <_popoverUserPlaces currentUser={user} />
                        </CardContent>
                    </Card>
                </ClickAwayListener>
            </Popper>
        </div>
    )
};

export default PopoverUser;
