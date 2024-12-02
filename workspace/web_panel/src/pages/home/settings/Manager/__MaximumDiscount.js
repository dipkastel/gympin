import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Button, Typography} from "@mui/material";
import {Modal} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {
    settings_DoMaximumDiscount,
    settings_RemoveAllDiscounts,
    settings_SetAutoToAll,
    settings_UpdateAutoDiscount
} from "../../../../network/api/settings.api";

const __MaximumDiscount = () => {

    const error = useContext(ErrorContext);
    const [modalTitle, setModalTitle] = useState(null);

    function renderModalConfirm() {
        function doActions(e) {
            e.preventDefault()
            switch (modalTitle){
                case "DoMaximumDiscount": return DoMaximumDiscount();
                case "RemoveAllDiscounts": return RemoveAllDiscounts();
                case "SetAutoToAll": return SetAutoToAll();
                case "UpdateAutoDiscount": return UpdateAutoDiscount();
            }
        }

        function DoMaximumDiscount(){
            settings_DoMaximumDiscount()
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setModalTitle(null);
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        function RemoveAllDiscounts(){
            settings_RemoveAllDiscounts()
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setModalTitle(null);
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        function SetAutoToAll(){
            settings_SetAutoToAll()
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setModalTitle(null);
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        function UpdateAutoDiscount(){
            settings_UpdateAutoDiscount()
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setModalTitle(null);
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
                <Modal show={!!modalTitle} onHide={() => setModalTitle(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"تایید انجام عملیات"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Typography variant={"h2"}>لطفا احتیاط کنید</Typography>
                        {modalTitle==="DoMaximumDiscount"&&<Typography variant={"subtitle1"}>اعمال حداکثر تخفیف برای همه مجموعه ها ممکن است باعث از بین رفتن سود جیم پین شود لطفا حتما با هماهنگی مدیران این کار را انجام دهید. تایید این دکمه عملیاتی سنگین را آغاز میکند لطفا در ساعات خلوتی سرور انجام شود</Typography> }
                        {modalTitle==="RemoveAllDiscounts"&&<Typography variant={"subtitle1"}>حذف تمام تخفیف ها</Typography> }
                        {modalTitle==="SetAutoToAll"&&<Typography variant={"subtitle1"}>اتوماتیک کردن تخفیف همه مجموعه های ورزشی</Typography> }
                        {modalTitle==="UpdateAutoDiscount"&&<Typography variant={"subtitle1"}>بروز رسانی تخفیف ها</Typography> }
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
                <PortletHeader title={"تخفیف ها"}/>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setModalTitle("DoMaximumDiscount")}>اعمال بیشترین تخفیف ممکن
                        در همه مجموعه ها</Button>
                </PortletBody>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setModalTitle("RemoveAllDiscounts")}>حذف تمام تخفیف
                        ها</Button>
                </PortletBody>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setModalTitle("SetAutoToAll")}>فعال سازی تخفیف سیستمیک برای
                        همه مجموعه ها</Button>
                </PortletBody>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setModalTitle("UpdateAutoDiscount")}>بروزرسانی تخفیفات
                        سیستمیک</Button>
                </PortletBody>
            </Portlet>
            {renderModalConfirm()}
        </>
    );
};

export default __MaximumDiscount;
