import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {user_getUserRoles, user_updateUserRoles} from "../../../../../network/api/user.api";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {InvoiceStatus} from "../../../../../helper/enums/InvoiceStatus";
import {invoice_changeStatus} from "../../../../../network/api/invoice.api";

const InvoiceDetailStatusData = ({invoice,updatePage}) => {
    const error = useContext(ErrorContext);

    function changeUserAccess(data) {
        invoice_changeStatus({Id: invoice.Id, Status: data}).then(response => {
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
        <>
            <Portlet>
                <PortletHeader title="وضعیت"/>
                <PortletBody>
                    <Form.Group>
                        <Select
                            className={"dropdown"}
                            options={Object.keys(InvoiceStatus).map(item => {
                                return {label: InvoiceStatus[item], value: item}
                            })}
                            value={Object.keys(InvoiceStatus).filter(f => f === invoice.Status).map(status => {
                                return {label: InvoiceStatus[status], value: status}
                            })[0]}
                            onChange={e => changeUserAccess(e.value)}
                        />
                    </Form.Group>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default InvoiceDetailStatusData;
