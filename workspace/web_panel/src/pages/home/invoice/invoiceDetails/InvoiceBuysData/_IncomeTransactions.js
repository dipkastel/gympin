import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";

const _IncomeTransactions = ({transactions}) => {
    return (
        <>
            {transactions &&<Portlet>
                <PortletHeader title="درامد"/>
                <PortletBody>
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">کاربر</TableCell>
                                <TableCell align="right">مبلغ</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نوع</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {transactions.map((row, number) => (
                                <TableRow key={"purchased-"+number} sx={{backgroundColor:(row.Amount>0)?"#d3fcef":"#f5d2d2"}}>
                                    <TableCell align="right">{row.Id}</TableCell>
                                    <TableCell align="right">{getUserFixedName(row.User)}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.Amount)}</TableCell>
                                    <TableCell align="right">{row.Purchased?.Name}</TableCell>
                                    <TableCell align="right">{TransactionStatus[row.TransactionStatus]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>}
        </>
    );
};

export default _IncomeTransactions;
