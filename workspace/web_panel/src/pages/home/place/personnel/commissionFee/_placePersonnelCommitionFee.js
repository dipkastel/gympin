import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {placePersonnel_updatePersonnelCommissionFee} from "../../../../../network/api/placePersonnel.api";
import {Button, TextField} from "@mui/material";

const _placePersonnelCommitionFee = ({personel, getPerson}) => {
    const error = useContext(ErrorContext);

    function updateUserRole(e) {
        e.preventDefault();
        placePersonnel_updatePersonnelCommissionFee({
            Id: personel.Id,
            CommissionFee: e.target.commissionFee.value
        }).then(result => {
            getPerson();
            error.showError({message: "عملیات موفق",});
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
            <Portlet>
                <PortletHeader
                    title={"درصد کمیسیون جیم پین"}
                />
                <form onSubmit={(e) => updateUserRole(e)}>
                    <PortletBody>
                        <Form.Group>
                            <TextField
                                id="standard-full-width"
                                label="درصد کمیسیون"
                                name={"commissionFee"}
                                placeholder="20"
                                defaultValue={personel.CommissionFee}
                                type={"number"}
                                fullWidth
                                margin={"none"}
                            />

                        </Form.Group>
                    </PortletBody>
                    <PortletFooter>
                        <div className="text-right">
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </div>
                    </PortletFooter>
                </form>
            </Portlet>
        </>
    );
};

export default _placePersonnelCommitionFee;
