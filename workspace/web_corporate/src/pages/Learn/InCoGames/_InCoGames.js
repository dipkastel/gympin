import React, {useContext, useState} from 'react';
import _MercheantSelerItem from "../../../components/_MercheantSelerItem";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Support_add} from "../../../network/api/support.api";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";

const _InCoGames = () => {

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
                    <DialogTitle>{"درخواست بازی سازمانی"}</DialogTitle>
                    <DialogContent>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"subtitle2"}>
                            با برگزاری بازی‌های گروهی و سازمانی مانند مافیا، گیم‌بردها و سایر فعالیت‌های تعاملی، به ایجاد فضایی شاد، پویا و تقویت روحیه‌ی تیمی در میان پرسنل کمک می‌کنیم.
                        </Typography>
                        <Typography sx={{textAlign:"justify",mb:2}} variant={"body2"}>
                            در صورتی که نوع بازی، تعداد نفرات یا جزئیات خاصی مد نظر دارید، لطفاً در کادر زیر بنویسید تا هماهنگی لازم انجام شود.
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
                title={"بازی‌های سازمانی"}
                icon={<img width={100} alt="icon" src={"/assets/images/btn/game.png"}/>}
                describe={"درخواست برگزاری بازی‌ها و فعالیت‌های گروهی و سازمانی مانند مافیا، گیم‌بردها و سایر برنامه‌های تعاملی و سرگرم‌کننده برای پرسنل، با هدف افزایش مشارکت، نشاط و تقویت روحیه تیمی در محیط کار"}
                onClick={() => setOpenModalAdd(true)}
                status={"ACTIVE"}
            />
            {renderModalAdd()}
        </div>
    );
};

export default _InCoGames;
