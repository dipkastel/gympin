import React, {useContext, useState} from 'react';
import Grid from "@mui/material/Grid2";
import _MercheantSelerItem from "../../../../components/_MercheantSelerItem";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Support_add} from "../../../../network/api/support.api";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";

const _SendCouch = ({}) => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd,setOpenModalAdd] = useState(false);



    function renderModalAdd() {
        function submitRequest(e) {
            e.preventDefault()

            Support_add({
                Title: "درخواست مربی",
                Message: {
                    Status: "AWAITING_EXPERT",
                    Message: e.target.Request.value,
                    IsRead: "true"
                },
                CorporateId: corporate.Id
            }).then(result => {
                setOpenModalAdd(false);
                error.showError({message: "درخواست شما با موفقیت ثبت شد",});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalAdd} maxWidth={"sm"} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => submitRequest(e)}>
                    <DialogTitle>{"درخواست مربی درون سازمان"}</DialogTitle>
                    <DialogContent>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"subtitle2"}>
                            ما در جیم‌پین با همکاری جمعی از مربیان حرفه‌ای در رشته‌های مختلف ورزشی، آماده‌ایم تا متناسب با نیاز سازمان شما، برنامه‌های تمرینی، کلاس‌های گروهی و فعالیت‌های ورزشی منظم برگزار کنیم.
                        </Typography>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"body2"}>
                            در صورتی که نوع ورزش، زمان‌بندی یا جزئیات خاصی مد نظر دارید، لطفاً در کادر زیر وارد کنید تا هماهنگی لازم انجام شود.
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="Request"
                            label="خدمات درخواستی خود را شرح دهید"
                            multiline={true}
                            rows={5}
                            type="text"
                            fullWidth
                            variant={"outlined"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{px:7,mb:2,mx:2}} type={"submit"} variant={"outlined"} color={"success"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <div>
                <_MercheantSelerItem
                    title={"اعزام مربی"}
                    icon={<img width={100} alt="icon" src={"/assets/images/btn/morabi.png"}/>}
                    describe={"درخواست اعزام مربی ورزشی به سازمان برای برگزاری کلاس‌ها، برنامه‌های تمرینی و فعالیت‌های گروهی متناسب با نیاز پرسنل."}
                    onClick={() => setOpenModalAdd(true)}
                    status={"ACTIVE"}
                />
            {renderModalAdd()}
        </div>
    );
};

export default _SendCouch;
