import React, {useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, TableCell, Tooltip} from "@mui/material";
import TableBody from "@mui/material/TableBody";

const PersonnelCredit = ({personelCredit}) => {
    const [openModalAdd,setOpenModalAdd]=useState(false)
    const [itemToDelete,setItemToDelete]=useState(null)
    return (
        <>

            <Portlet>
                <PortletHeader
                    title={personelCredit.Corporate&&("اعتبار های "+personelCredit.Corporate.Name)}
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) =>setOpenModalAdd(true)}
                            >
                                <AddIcon />
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">اعتبار</TableCell>
                                <TableCell align="right">تاریخ</TableCell>
                                <TableCell align="right">اعتبار توسط</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {personelCredit.CreditList&&personelCredit.CreditList.reverse().map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right">{row.CreditAmount}</TableCell>
                                    <TableCell align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title={row.CreatorUser.Username||""} placement="left">
                                            <span>{(row.CreatorUser.FullName||"")}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>

        </>
    );
};

export default PersonnelCredit;
