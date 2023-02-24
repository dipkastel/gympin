import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {transaction_query} from "../../../../../network/api/transactions.api";
import {Typography} from "@mui/material";
import {TransactionTypes} from "../../../../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {toPriceWithComma} from "../../../../../helper";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const _Transactions = ({ticket}) => {
    const error = useContext(ErrorContext);

    const [transactions, SetTransactions] = useState(null);

    useEffect(() => {
        if (ticket.Serial)
            getTransactionsBySerial()
    }, [ticket]);

    function getTransactionsBySerial() {
        transaction_query({
            queryType: "FILTER",
            Serial: ticket.Serial,
            paging: {Page: 0, Size: 99, Desc: true}
        }).then(result => {
            SetTransactions(result.data.Data.content)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }

    return (transactions) ? (

        <Portlet>
            <PortletHeader title="ترکنش های بلیط"/>
            <PortletBody>
                {transactions.map((item, Number) => (
                    <div key={Number}>
                        <Typography variant={"body2"} component={"span"}>
                            {TransactionTypes[item.TransactionType] +
                                " " +
                                toPriceWithComma(item.Amount)+" تومان "+
                                " با وضعیت "+
                                TransactionStatus[item.TransactionStatus]+
                                " "
                            }
                            {item.Place&& ("مربوط به مجموعه "+item.Place.Name)}
                            {item.Corporate&& ("مربوط به شرکت "+item.Corporate.Name)}
                            {item.CorporatePersonnel&& ("مربوط به "+item.CorporatePersonnel.User.FullName+" از شرکت "+item.CorporatePersonnel.Corporate.Name)}
                        </Typography>
                    </div>
                ))}
            </PortletBody>
        </Portlet>
    ) : (<></>)
};

export default _Transactions;
