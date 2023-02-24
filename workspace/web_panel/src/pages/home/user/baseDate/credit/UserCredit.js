import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import {UserCredit_getByUser} from "../../../../../network/api/userCredit.api";
import {Avatar, Chip, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useHistory} from "react-router-dom";
import {creditTypes} from "../../../../../helper/enums/creditTypes";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const UserCredit = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCredits,SetUserCredits] = useState([])
    useEffect(() => {
        UserCredit_getByUser({Id:currentUser.Id}).then(result=>{
            SetUserCredits(result.data.Data);
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, [currentUser]);

    return (
        <>

            <Portlet>
                <PortletHeader title="اعتبار های کاربر" />

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
                            {userCredits.CreditDetails&&
                            userCredits.CreditDetails.map((row,number) => (
                                <TableRow key={number}>
                                    {/*<TableCell align="right"><Avatar onClick={()=>history.push("/corporate/details/"+row.Id)}  alt={row.Name} src={row.Multimedias?row.Multimedias[0].Url:""}  sx={{width:20,height:20}} /></TableCell>*/}
                                    <TableCell onClick={()=>row.CreditType=="SPONSOR"?history.push("/corporate/details/"+row.Corporate.Id):""} align="right">{creditTypes[row.CreditType]}
                                        {row.CreditType=="SPONSOR"&&(<>(
                                            {row.Corporate.Name}

                                        )</>)
                                    }
                                    </TableCell>
                                    <TableCell align="right">{row.CreditAmount}</TableCell>
                                    <TableCell align="right">{row.CreditPayableAmount}</TableCell>
                                    {/*<TableCell align="left">*/}
                                    {/*    <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>

                <PortletFooter></PortletFooter>
            </Portlet>
        </>
    );
};

export default UserCredit;
