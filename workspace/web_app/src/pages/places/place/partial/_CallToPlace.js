import React, {useState} from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import {replacePersianNumbers} from "../../../../helper/utils";

const _CallToPlace = ({place,currentUser}) => {

    const [open, setOpen] = useState(false);

    function getFixedPlaceNumbers() {
        return place?.Tell ? place.Tell.split(",") : [];
    }

    function showCallSuggest() {
        return !!currentUser && place?.CallUs && place?.Tell;
    }


    function renderDialogCall(){
        return (
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>شماره‌های تماس مرکز</DialogTitle>
                <DialogContent dividers>
                    <List>
                        {getFixedPlaceNumbers().map((num, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton component="a" href={`tel:${num.trim()}`}>
                                    <ListItemText primary={num.trim()} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>بستن</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <>
            {showCallSuggest() && (
                <Alert sx={{ textDecoration: "none", m: 2 }} severity="warning"  onClick={() => setOpen(true)}>
                    <AlertTitle>قبل از رزرو بلیط، شرایط استفاده را هماهنگ نمایید.</AlertTitle>
                    <Button variant="contained" color="warning">
                        {"تماس با "+place?.Name}
                    </Button>
                </Alert>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle variant={"subtitle1"} >{"تماس با "+place?.Name}</DialogTitle>
                <DialogContent dividers>
                    <Alert variant={"outlined"} severity={"info"} >
                        <Typography variant={"subtitle1"}>{"ساعات فعالیت مجموعه "+place?.Name}</Typography>
                        <Typography variant={"body2"}>{place?.ActiveTimes}</Typography>
                    </Alert>
                    <List>
                        {getFixedPlaceNumbers().map((num, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton  component="a" href={`tel:${num.trim()}`}>
                                    <ListItemText sx={{border:"1px solid #e7333e",borderRadius:3,p:2,textAlign:"center"}} primary={"تماس با "+place?.Name+" شماره : "+replacePersianNumbers(num.trim())} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Button fullWidth sx={{alignSelf:"center",mt:3}} variant={"contained"} component="a" href={`tel:02128424190`}>{"تماس با جیم پین"}</Button>
                        <Button fullWidth sx={{alignSelf:"center",mt:3}} variant={"contained"} component="a" href={`/support`}>{"ثبت تیکت پشتیبانی"}</Button>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default _CallToPlace;
