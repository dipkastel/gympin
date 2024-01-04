import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {creditTypes} from "../../../../../helper/enums/creditTypes";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {User_getUserCredits} from "../../../../../network/api/user.api";
import {toPriceWithComma} from "../../../../../helper";

const UserCredit = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCredits, SetUserCredits] = useState([])
    useEffect(() => {
        User_getUserCredits({Id: currentUser.Id}).then(result => {
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
            {userCredits&&<>
                <Portlet>
                    <PortletHeader title="مجموع اعتبار کاربر"/>
                    <PortletBody>
                        <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                    component="div" sx={{marginY: 1}}>
                            {userCredits.CreditDetails && toPriceWithComma(userCredits.CreditDetails.reduce((a, b) => a + b.CreditPayableAmount, 0))+" تومان"}
                        </Typography>
                    </PortletBody>
                </Portlet>
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
                                            align="right">{creditTypes[row.CreditType]}
                                            {row.CreditType == "SPONSOR" && (<>(
                                                {row.Corporate.Name}

                                                )</>)
                                            }
                                        </TableCell>
                                        <TableCell align="right">{toPriceWithComma(row.CreditAmount)}</TableCell>
                                        <TableCell align="right">{toPriceWithComma(row.CreditPayableAmount)}</TableCell>
                                        {/*<TableCell align="left">*/}
                                        {/*    <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />*/}
                                        {/*</TableCell>*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PortletBody>

                </Portlet>

            </>
            }
        </>
    );
};

export default UserCredit;
