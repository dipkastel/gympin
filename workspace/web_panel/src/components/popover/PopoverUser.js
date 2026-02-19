import React, {useContext, useState} from 'react';
import {Button, Card, CardContent, ClickAwayListener, Grid, IconButton, Popper, Typography} from "@mui/material";
import {getUserFixedName} from "../../helper";
import {ArrowCircleLeft, Call} from "@mui/icons-material";
import _popoverUserCorporates from "./_popoverUserCorporates";
import _popoverUserPlaces from "./_popoverUserPlaces";
import {useHistory} from "react-router-dom";
import {settings_callToNumber} from "../../network/api/settings.api";
import {ErrorContext} from "../GympinPagesProvider";

const PopoverUser = ({user}) => {

    const error = useContext(ErrorContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const id = isOpen ? "user" + user?.Id : undefined;

    function clickAwayHandler() {
        setIsOpen(false)
    }

    function clickHandler(e) {
        setIsOpen(true)
        setAnchorEl(e.currentTarget);
    }


    function callTOUser(e) {
        e.preventDefault();
        settings_callToNumber({to_number: user?.PhoneNumber})
            .then(data => {
                error.showError({message: data.data.Data,});
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    if(!user) return (<></>);

    return (
        <div>
            <Button onClick={clickHandler}>{getUserFixedName(user)}</Button>
            <Popper sx={{zIndex: 1060}} placement="bottom-start" id={id} open={isOpen} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={clickAwayHandler}>
                    <Card variant={"elevation"} elevation={10} sx={{borderRadius: 3}} className="popper">
                        <CardContent>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>صفحه کاربر </Typography></Grid>
                                <Grid>
                                    <IconButton
                                        href={"/users/details/" + user?.Id}>
                                        <ArrowCircleLeft/>
                                    </IconButton>
                                </Grid>
                            </Grid>
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
                                    <IconButton onClick={(e) => callTOUser(e)} size={"small"}><Call color={"success"}/></IconButton>
                                </Grid>
                            </Grid>
                            <Grid container direction={"row"} justifyContent={"space-between"}>
                                <Grid><Typography sx={{p: 1}}>تاریخ تولد</Typography></Grid>
                                <Grid><Typography sx={{p: 1}}>{user?.Birthday ? new Date(user.Birthday).toLocaleDateString('fa-IR', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) : "ثبت نشده"}</Typography></Grid>
                            </Grid>
                            <_popoverUserCorporates currentUser={user}/>
                            <_popoverUserPlaces currentUser={user}/>
                        </CardContent>
                    </Card>
                </ClickAwayListener>
            </Popper>
        </div>
    )
};

export default PopoverUser;
