import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Button, TextField, Typography} from "@mui/material";
import {Modal} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {settings_DoMaximumManagedDiscount} from "../../../../network/api/settings.api";

const __MaximumManagedDiscount = () => {

    const error = useContext(ErrorContext);
    const [openModal, setOpenModal] = useState(false);
    const [profitMargin, setProfitMargin] = useState(null);

    function renderModalConfirm() {
        function doActions(e) {
            e.preventDefault()
            settings_DoMaximumManagedDiscount({Profit:profitMargin})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setOpenModal(false);
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <>
                <Modal show={openModal} onHide={() => setOpenModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"تایید انجام عملیات"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Typography variant={"h2"}>لطفا احتیاط کنید</Typography>
                        <Typography variant={"subtitle1"}>اعمال حداکثر تخفیف برای همه مجموعه ها ممکن است باعث از بین رفتن سود جیم پین شود
                            لطفا حتما با هماهنگی مدیران این کار را انجام دهید. تایید این دکمه عملیاتی سنگین را آغاز میکند لطفا در ساعات
                            خلوتی سرور انجام شود</Typography>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"button_danger"} type={"submit"} variant={"contained"}
                                onClick={(e) => doActions(e)}> تایید </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    return (
        <>
            <Portlet>
                <PortletHeader title={"تخفیف مدیریت شده"}/>
                <PortletBody className={"p-2"}>


                    <TextField
                        id="standard-full-width"
                        label="حاشیه سود"
                        placeholder="حاشیه سود"
                        value={profitMargin}
                        onChange={(e) => setProfitMargin( e.target.value)}
                        type={"text"}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant={"outlined"} color={"error"} onClick={e => setOpenModal(true)}>اعمال بیشترین تخفیف مدیریت شده ممکن
                        در همه مجموعه ها</Button>
                </PortletBody>
            </Portlet>
            {renderModalConfirm()}
        </>
    );
};

export default __MaximumManagedDiscount;
