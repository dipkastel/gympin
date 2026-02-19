import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Button} from "@mui/material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";

const _Transactions = ({transactions,purchased,updatePage}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();

    return (
        <>
            {transactions&&<Portlet>
                <PortletHeader title="فاکتور مرتبط"/>
                <PortletBody>
                    {transactions.Invoices.map((item, Number) => (
                        <Button key={Number} fullWidth variant={"contained"} color={"error"}
                                href={"/invoice/detail/" + item.Id} > فاکتور</Button>
                    ))}
                </PortletBody>
            </Portlet>}
        </>
    )
};

export default _Transactions;
