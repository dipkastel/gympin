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

const _AddCoach = ({renewList}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAddCoach, setOpenModalAddCoach] = useState(false);

    function ModalAddCoach() {
        function addCoach(e){
            e.preventDefault();
            placePersonnel_add({
                Place:{Id:place.Id},
                PhoneNumber:e.target.PhoneNumber.value,
                UserRole:"PLACE_COACH"
            }).then(result=>{
                renewList();
                setOpenModalAddCoach(false);
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
                <Dialog open={openModalAddCoach} onClose={()=>setOpenModalAddCoach(false)}>
                    <Form onSubmit={(e)=>addCoach(e)}>
                    <DialogTitle>افزودن مربی</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدبد شماره همراه را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="PhoneNumber"
                            label="شماره موبایل"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpenModalAddCoach(false)}>لغو</Button>
                        <Button type={"submit"}>ثبت</Button>
                    </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }
    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"افزودن مربی"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={()=>setOpenModalAddCoach(true)}>افزودن فرد جدید</Button>}/>
            </Card>
            {ModalAddCoach()}
        </>
    );
};
export default _AddCoach;
