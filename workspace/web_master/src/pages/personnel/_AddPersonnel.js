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

const _AddPersonnel = ({renewList}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAddPersonnel, setOpenModalAddPersonnel] = useState(false);

    function ModalAddPerson() {
        function addPersonnel(e){
            placePersonnel_add({Place:{Id:place.Id},PhoneNumber:e.target.PhoneNumber.value}).then(result=>{
                renewList();
                setOpenModalAddPersonnel(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
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
                            type="number"
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
    //
    // <FormGroup>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت پرسنل"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مشاهده گزارشات"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه بدنسازی"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه تکواندو"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه پیلاتس"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه استخر"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه ایروبیک"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درگاه trx"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت مالی"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت ترافیک"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت درباره"/>
    //     <FormControlLabel control={<Switch defaultChecked/>} label="مدیریت کاربران"/>
    // </FormGroup>
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"افزودن پرسنل"}
                    action={<Button variant={"contained"} title={"btn_add"} onClick={()=>setOpenModalAddPersonnel(true)}>افزودن فرد جدید</Button>}/>
            </Card>
            {ModalAddPerson()}
        </>
    );
};
export default _AddPersonnel;
