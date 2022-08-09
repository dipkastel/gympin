import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    Switch,
    TextField
} from "@mui/material";

const _PlaceGates = () => {
    const [open, setOpen] = React.useState(false);

    function renderAddButton() {
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen}>افزودن درگاه</Button>
        )
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function ModalAddGate() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن درگاه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن درگاه جدید نام درگاه را وارد کنید
                            <br/>
                            مثال : بدنسازی یا پیلاتس
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام درگاه"
                            type="text"
                            fullWidth
                            variant="standard"
                        />

                        <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت ترافیک"/>
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"درگاه های مجموعه"}
                    action={renderAddButton()}/>

                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="بدنسازی"

                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="تکواندو"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="پیلاتس"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="استخر"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="ایروبیک"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/gate"} alignItems="flex-start"
                                  sx={{width: '100%', bgcolor: 'background.paper', color: "#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="trx"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </List>
                </CardContent>
            </Card>
            {ModalAddGate()}
        </>

    );
};

export default _PlaceGates;
