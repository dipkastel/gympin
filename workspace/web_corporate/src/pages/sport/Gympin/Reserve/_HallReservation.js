import React, {useContext, useState} from 'react';
import Grid from "@mui/material/Grid2";
import _MercheantSelerItem from "../../../../components/_MercheantSelerItem";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Support_add} from "../../../../network/api/support.api";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";

const _HallReservation = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd,setOpenModalAdd] = useState(false);



    function renderModalAdd() {
        function submitRequest(e) {
            e.preventDefault()

            Support_add({
                Title: "درخواست رزرو سالن",
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
                    <DialogTitle>{"درخواست رزرو سانس و سالن"}</DialogTitle>
                    <DialogContent>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"subtitle2"}>
                            ما در جیم‌پین با ارائه سالن‌های چندمنظوره ورزشی برای رشته‌هایی مانند فوتبال، والیبال، بسکتبال و دیگر فعالیت‌های گروهی، آماده‌ایم تا تجربه‌ای پویا و سالم برای شما و تیم‌تان فراهم کنیم.
                        </Typography>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"body2"}>
                            در صورتی که برای رزرو سالن یا خدمات مرتبط، جزئیات یا نیاز خاصی مد نظر دارید، لطفاً در کادر زیر بنویسید.
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
                    title={"سانس و سالن"}
                    icon={<img width={100} alt="icon" src={"/assets/images/btn/salon.png"}/>}
                    describe={"درخواست رزرو سالن چندمنظوره جهت برگزاری ورزش‌هایی مانند فوتبال، والیبال، بسکتبال و سایر فعالیت‌های گروهی سازمانی."}
                    onClick={() => setOpenModalAdd(true)}
                    status={"ACTIVE"}
                />
            {renderModalAdd()}
        </div>
    );
};

export default _HallReservation;
