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
import {fixMobile, fixPersianNumbers} from "../../helper/utils";

const _AddPersonnel = ({renewList}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAddPersonnel, setOpenModalAddPersonnel] = useState(false);

    function ModalAddPerson() {
        const error = null;
        function addPersonnel(e){
            e.preventDefault();
            placePersonnel_add({
                Place:{Id:place.Id},
                PhoneNumber:e.target.PhoneNumber.value,
                UserRole:"PLACE_PERSONNEL"
            }).then(result=>{
                renewList();
                setOpenModalAddPersonnel(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function phoneNumberFixer(e) {

            e.target.value = fixMobile(e.target.value);
            return e;
        }

        return (
            <div>
                <Dialog open={openModalAddPersonnel} onClose={()=>setOpenModalAddPersonnel(false)}>
                    <Form onSubmit={(e)=>addPersonnel(e)}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدبد شماره همراه را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="PhoneNumber"
                            label="شماره موبایل"
                            type="text"
                            inputProps={{ inputMode: 'numeric' }}
                            onChange={e=>phoneNumberFixer(e)}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpenModalAddPersonnel(false)}>لغو</Button>
                        <Button type={"submit"}>ثبت</Button>
                    </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }
    return (
        <>
            <Button variant={"outlined"} title={"btn_add"} onClick={()=>setOpenModalAddPersonnel(true)}>افزودن فرد جدید</Button>
            {ModalAddPerson()}
        </>
    );
};
export default _AddPersonnel;
