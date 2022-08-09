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
    DialogTitle, FormControl, FormGroup, FormHelperText, Input, InputLabel,
    List,
    ListItem, ListItemIcon,
    ListItemText, Switch
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const _GateSchedule = (props) => {
    const [open, setOpen] = React.useState(false);
    const [deleteItem, setDeleteItem] = React.useState([]);

    function ModalDeletePlan() {
        return (
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>حذف زمان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            آیا حذف زمان {deleteItem.name} را تایید میکنید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>لغو</Button>
                        <Button onClick={handleClose}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const handleClickOpen = (e) => {
        setDeleteItem(e)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getValue() {
        return Math.floor(Math.random() * 10) * 16000
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={props.name}
                    action={(
                        <>
                            فعال
                            <Switch  defaultChecked />
                        </>
                    )}
                />

                <CardContent sx={{margin: 0}}>
                    <FormGroup>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">توضیح</InputLabel>
                            <Input multiline={true} aria-describedby="my-helper-text"/>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">قیمت</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text"/>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <InputLabel htmlFor="my-input">قیمت ویژه</InputLabel>
                            <Input aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text">قیمت با تخفیف</FormHelperText>
                        </FormControl>
                        <FormControl sx={{margin: 1}}>
                            <Button variant={"contained"}>ثبت</Button>
                        </FormControl>
                    </FormGroup>
                </CardContent>
            </Card>

            {ModalDeletePlan()}
        </>
    );
};

export default _GateSchedule;
