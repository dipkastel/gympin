import React, {useContext, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {settings_RemoveAllDiscounts} from "../../../../network/api/settings.api";
import {Modal} from "react-bootstrap";
import {Button, Typography} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";

const __RemoveAllDescounts = () => {


    const error = useContext(ErrorContext);
    const [openModal, setOpenModal] = useState(false);

    function renderModalConfirm() {
        function doActions(e) {
            e.preventDefault()

            settings_RemoveAllDiscounts()
                .then(data=>{
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
                         <Typography variant={"subtitle1"}>حذف تمام تخفیف ها</Typography>
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
                <PortletHeader title={"حذف تمام تخفیف ها"}/>
                <PortletBody className={"p-2"}>
                    <Button variant={"outlined"} color={"error"} onClick={e => setOpenModal(true)}>حذف تمام تخفیف
                        ها</Button>
                </PortletBody>
            </Portlet>
            {renderModalConfirm()}
        </>
    );
};

export default __RemoveAllDescounts;
