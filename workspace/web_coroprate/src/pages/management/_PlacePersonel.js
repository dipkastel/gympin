import React from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, FormControlLabel, FormGroup,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination, Switch, TextField,
    Typography
} from "@mui/material";

import {toAbsoluteUrl} from "../../helper/utils";

const _PlacePersonel = () => {
    const [open, setOpen] = React.useState(false);

    function renderAddButton(){
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen} >افزودن فرد جدید</Button>
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalAddPerson(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدبد شماره همراه و دسترسی هارا وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="شماره موبایل"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت پرسنل" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مشاهده گزارشات" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه بدنسازی" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه تکواندو" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه پیلاتس" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه استخر" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه ایروبیک" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درگاه trx" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت مالی" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت ترافیک" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت درباره" />
                            <FormControlLabel control={<Switch defaultChecked />} label="مدیریت کاربران" />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>ثبت</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    return (
        <>
            <Card elevation={3} sx={{margin: 1}} >
                <CardHeader
                    sx={{paddingBottom:0}}
                    title={"پرسنل مجموعه"}
                    action={renderAddButton()}/>
                <CardContent sx={{margin:0 ,paddingTop:0}}>
                    <List >
                        <ListItem alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper'}}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{width: 50, height: 50}} alt="Remy Sharp" src={toAbsoluteUrl("/assets/images/1.jpg")}/>
                            </ListItemAvatar>
                            <ListItemText
                                className="text-start"
                                primary="ابراهیم میری"
                                secondary={
                                    <>
                                        <Typography
                                            sx={{display: 'inline'}}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            مدیر مرکز
                                        </Typography>
                                        <span>
                            </span>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    </List>
                    <Pagination variant="outlined" count={1} color="primary" />
                </CardContent>
            </Card>
            {ModalAddPerson()}
        </>
    );
};

export default _PlacePersonel;
