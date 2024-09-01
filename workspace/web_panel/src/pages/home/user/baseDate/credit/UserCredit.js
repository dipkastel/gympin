import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {creditTypes} from "../../../../../helper/enums/creditTypes";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {User_getUserCredits} from "../../../../../network/api/user.api";
import {toPriceWithComma} from "../../../../../helper";
import {CorporateContractType} from "../../../../../helper/enums/CorporateContractType";

const UserCredit = ({currentUser,userCredits}) => {
    const history = useHistory();
    return (
        <>
            {userCredits&&
                <Portlet>
                    <PortletHeader title="اعتبار های کاربر"/>

                    <PortletBody>

                        <Table className={"table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">نوع اعتبار</TableCell>
                                    <TableCell align="right">مبلغ</TableCell>
                                    <TableCell align="right">قابل پرداخت</TableCell>
                                    {/*<TableCell align="left">وضعیت سازمان</TableCell>*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userCredits.CreditDetails &&
                                userCredits.CreditDetails.map((row, number) => (
                                    <TableRow key={number}>
                                        {/*<TableCell align="right"><Avatar onClick={()=>history.push("/corporate/details/"+row.Id)}  alt={row.Name} src={row.Multimedias?row.Multimedias[0].Url:""}  sx={{width:20,height:20}} /></TableCell>*/}
                                        <TableCell
                                            onClick={() => row.CreditType == "SPONSOR" ? history.push("/corporate/details/" + row.Corporate.Id) : ""}
                                            align="right">{row.CreditType != "SPONSOR"&&creditTypes[row.CreditType]}
                                            {row.CreditType == "SPONSOR" &&
                                                CorporateContractType[row.ContractType]+ " ( " + row.Corporate.Name +" )"
                                            }
                                        </TableCell>
                                        <TableCell align="right">{toPriceWithComma(row.CreditAmount)}</TableCell>
                                        <TableCell align="right">{toPriceWithComma(row.CreditPayableAmount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PortletBody>

                </Portlet>
            }
        </>
    );
};

export default UserCredit;
