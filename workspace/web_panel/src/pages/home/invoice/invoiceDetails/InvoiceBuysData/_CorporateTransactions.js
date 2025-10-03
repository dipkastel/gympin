import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {TransactionCorporateTypes} from "../../../../../helper/enums/TransactionCorporateTypes";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {toPriceWithComma} from "../../../../../helper";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";

const _CorporateTransactions = ({transactions}) => {
    return (
        <>
            {transactions && <Portlet>
                <PortletHeader title="تراکنش های مرتبط با شرکت"/>
                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">مبلغ</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نوع</TableCell>
                                <TableCell align="right">شرکت</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {transactions.map((row, number) => (
                                <TableRow key={"purchased-"+number}  sx={{backgroundColor:(row.Amount>0)?"#d3fcef":"#f5d2d2"}}>
                                    <TableCell align="right">{row.Id}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(row.Amount)}</TableCell>
                                    <TableCell align="right">{row.Amount>0?"افزایش":"کاهش"}</TableCell>
                                    <TableCell align="right">{TransactionCorporateTypes[row.TransactionType]}</TableCell>
                                    <TableCell align="right">{row?.CorporatePersonnel?.Corporate?.Name}</TableCell>
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

export default _CorporateTransactions;
