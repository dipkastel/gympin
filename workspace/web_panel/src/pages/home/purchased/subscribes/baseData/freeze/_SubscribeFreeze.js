import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Button, Divider, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {toPriceWithComma} from "../../../../../../helper";
import {SubscribeStatus} from "../../../../../../helper/enums/SubscribeStatus";
import {Form, Modal} from "react-bootstrap";
import {
    purchasedSubscribe_getById,
    purchasedSubscribe_increaseExpireDate
} from "../../../../../../network/api/purchasedSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const _SubscribeFreeze = ({subscribe,updatePage}) => {

    const error = useContext(ErrorContext);

    function addFreezeTime(e) {
        e.preventDefault();
        purchasedSubscribe_increaseExpireDate({
            SubscribeId:subscribe.Id,
            IncreaseDayCount:e.target.dayCount.value
        }).then(result=>{
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <Portlet>
            <PortletHeader title="فریز" />
            <PortletBody>

                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => addFreezeTime(e)}>
                        <Form.Group>
                            <TextField
                                name="dayCount"
                                type={"number"}
                                placeholder="تعداد روز"
                                label={"تعداد روز اضافه"}
                                variant={"outlined"}
                                fullWidth
                            />
                        </Form.Group>
                        <Button
                            fullWidth
                            variant={"contained"}
                            className={"button_danger"}
                            type={"submit"}
                        >
                            اضافه
                        </Button>
                </Form>
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeFreeze;
