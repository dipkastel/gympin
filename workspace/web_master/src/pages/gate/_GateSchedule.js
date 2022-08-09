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
    List,
    ListItem, ListItemIcon,
    ListItemText
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
                />
                <CardContent sx={{margin: 0}}>
                    <List dense={false}>
                        {props.data.map((p,number)=>
                            <ListItem sx={{direction: "rtl"}} key={number} >
                                <ListItemText
                                    className="text-start"
                                    primary={p.name+" ( "+p.gender+" ) "}
                                    secondary={"از "+p.start+" تا "+p.end}
                                />
                                <ListItemIcon
                                    className="text-end"
                                >
                                    <DeleteIcon onClick={(e)=>handleClickOpen(p)} color={"primary"}/>
                                </ListItemIcon>
                            </ListItem>,
                        )}
                    </List>
                </CardContent>
            </Card>

            {ModalDeletePlan()}
        </>
    );
};

export default _GateSchedule;
