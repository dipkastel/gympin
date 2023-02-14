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
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";

const _PlaceGates = () => {
    const [open, setOpen] = React.useState(false);
    function renderAddButton(){
        return (
            <Button variant={"contained"} title={"btn_add"} onClick={handleClickOpen} >افزودن</Button>
        )
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function ModalAddStall(){
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>افزودن بوفه یا فروشگاه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن بوفه یا فروشگاه جدید نام را وارد کنید
                            <br/>
                            مثال : بوفه بدنسازی یا بوفه استخر
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="نام بوفه یا فروشگاه"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
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
                    sx={{paddingBottom:0}}
                    title={"فروشگاه و بوفه"}
                    action={renderAddButton()}/>

                <CardContent  sx={{margin:0 ,paddingTop:0}}>
                    <List >
                        <ListItem component="a" href={"/management/stall"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="بوفه باشگاه"

                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/stall"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="فروشگاه"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem component="a" href={"/management/stall"} alignItems="flex-start" sx={{width: '100%',  bgcolor: 'background.paper',color:"#000000"}}>
                            <ListItemText
                                className="text-start"
                                primary="بوفه استخر"/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            {ModalAddStall()}
        </>
    );
};

export default _PlaceGates;
