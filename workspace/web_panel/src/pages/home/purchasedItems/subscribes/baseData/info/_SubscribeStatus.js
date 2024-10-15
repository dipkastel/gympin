import React, {useContext, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {PurchasedSubscribeStatus} from "../../../../../../helper/enums/PurchasedSubscribeStatus";
import {purchasedSubscribe_updateStatus} from "../../../../../../network/api/purchasedSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {Article_delete} from "../../../../../../network/api/article.api";
import {Form, Modal} from "react-bootstrap";

const _SubscribeStatus = ({subscribe, updatePage}) => {
    const error = useContext(ErrorContext);

    const [showRefoundModal,setShowRefoundModal] = useState(false);


    function updateStatus(value) {
        purchasedSubscribe_updateStatus({
            Id: subscribe.Id,
            Status:value
        }).then(result => {
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function renderModalRefound() {
        function refound(e) {
            e.preventDefault()
            Article_delete({Id: subscribe.Id})
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    setShowRefoundModal(false);
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={showRefoundModal} onHide={() => setShowRefoundModal(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => refound(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"عودت بلیط "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>آیا مبلغ بلیط به حساب کاربر بازپرداخت شود ؟</p>
                            <p>اگر بلیط استفاده (اولین ورود) شده باشد این امر تنها با هماهنگی مستقیم مجموعه ورزشی باید انجام شود چرا که مبلغ بلیط از حساب مرکز کسر میگردد.</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant={"contained"}
                                className={"button_danger"}
                                type={"submit"}
                            >
                                تایید
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader title="وضعیت"/>

                <PortletBody>
                    <div className={"row"}>

                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">وضعیت</InputLabel>
                            <Select

                                sx={{my: 1}}
                                label="status"
                                value={subscribe.Status || "null"}
                                onChange={e => updateStatus(e.target.value)}>
                                {Object.keys(PurchasedSubscribeStatus).map((item, number) => (
                                    <MenuItem key={number} value={item}>{PurchasedSubscribeStatus[item]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </PortletBody>
            </Portlet>
            {(subscribe.Status==="ACTIVE"||subscribe.Status==="COMPLETE")&&
            <Portlet>
                <PortletHeader title="عودت وجه"/>

                <PortletBody>
                    <Button variant={"contained"}
                            size={"large"}
                            color={"error"}
                            onClick={(e) => setShowRefoundModal(true)}>عودت وجه</Button>
                </PortletBody>
            </Portlet>}
            {renderModalRefound()}
        </>

    );
};

export default _SubscribeStatus;
