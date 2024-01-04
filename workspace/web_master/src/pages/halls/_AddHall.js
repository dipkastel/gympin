import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField
} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {placePersonnel_add} from "../../network/api/placePersonnel.api";
import {Form} from "react-bootstrap";
import {Halls_add} from "../../network/api/halls.api";

const _AddHall = ({renewList}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);

    function ModalAddHall() {
        function addPersonnel(e){
            Halls_add({Place:{Id:place.Id},Name:e.target.hallName.value}).then(result=>{
                renewList();
                setOpenModalAdd(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
        return (
            <div>
                <Dialog open={openModalAdd} onClose={()=>setOpenModalAdd(false)}>
                    <Form onSubmit={(e)=>addPersonnel(e)}>
                    <DialogTitle>افزودن سالن</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن سالن جدید نام سالن را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="hallName"
                            label="نام سالن"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"}>ثبت</Button>
                    </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"افزودن سالن"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={()=>setOpenModalAdd(true)}>افزودن سالن جدید</Button>}/>
            </Card>
            {ModalAddHall()}
        </>
    );
};
export default _AddHall;
