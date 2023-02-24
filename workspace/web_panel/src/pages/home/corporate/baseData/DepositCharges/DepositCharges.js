import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {corporate_getTransactions} from "../../../../../network/api/corporate.api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";

import TableBody from "@mui/material/TableBody";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {toPriceWithComma} from "../../../../../helper";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const DepositCharges = ({currentCorporate}) => {
    const error = useContext(ErrorContext);
    const [transactions, SetTransactions] = useState([])
    useEffect(() => {
        corporate_getTransactions({CorporateId: currentCorporate.Id}).then(result => {
            SetTransactions(result.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);

    return (
        <Portlet>
            <PortletHeader title="تراکنش های شارژ"/>
            <PortletBody>


                <Table className={"table"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">مبلغ</TableCell>
                            <TableCell align="right">مانده</TableCell>
                            <TableCell align="right">وضعیت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {transactions && transactions.reverse().map(item => (
                            <TableRow key={"transaction-" + item.Id}>
                                <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                <TableCell align="right" component="th"
                                           scope="row">{toPriceWithComma(item.Amount||0)}</TableCell>
                                <TableCell align="right" component="th"
                                           scope="row">{toPriceWithComma(item.Balance||0)}</TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {(item.TransActionType == "CHARGE") ?
                                        item.IsPayed ?
                                            item.IsChecked ?
                                                <DoneAllIcon color={"success"}/> :
                                                <DoneIcon color={"success"}/> :
                                            <RemoveDoneIcon color={"error"}/> :
                                        <PersonRemoveIcon color={"error"}/>

                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PortletBody>
        </Portlet>
    );
};

export default DepositCharges;
