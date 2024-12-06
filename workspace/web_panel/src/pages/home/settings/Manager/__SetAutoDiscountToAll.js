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

const __SetAutoDiscountToAll = () => {

    const error = useContext(ErrorContext);
    const [openModal, setOpenModal] = useState(false);

    function renderModalConfirm() {
        function doActions(e) {
            e.preventDefault()
            settings_SetAutoToAll()
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setOpenModal(null);
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
                        <Typography variant={"subtitle1"}>اتوماتیک کردن تخفیف همه مجموعه های ورزشی</Typography>
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
                <PortletHeader title={"تخفیف اتوماتیک"}/>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setOpenModal(true)}>فعال سازی تخفیف سیستمیک برای
                        همه مجموعه ها</Button>
                </PortletBody>
            </Portlet>
            {renderModalConfirm()}
        </>
    );
};

export default __SetAutoDiscountToAll;
