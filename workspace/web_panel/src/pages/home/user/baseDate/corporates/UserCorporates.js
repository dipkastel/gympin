import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {corporatePersonnel_getByUser} from "../../../../../network/api/CorporatePersonnel.api";


function UserCorporates({ currentUser }) {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCorporates, setUserCorporates] = useState([]);
    useEffect(() => {
        corporatePersonnel_getByUser({id:currentUser.Id}).then(result=>{
            setUserCorporates(result.data.Data)
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
                <PortletHeader title="سازمان های کاربر" />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">نام سازمان</TableCell>
                                <TableCell align="right">نقش در سازمان</TableCell>
                                <TableCell align="left">وضعیت سازمان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userCorporates&&userCorporates.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar onClick={()=>history.push("/corporate/details/"+row.Corporate.Id)}  alt={row.Corporate.Name} src={row.Corporate.Multimedias?row.Corporate.Multimedias[0].Url:""}  sx={{width:20,height:20}} /></TableCell>
                                    <TableCell align="right">{row.Corporate.Name}</TableCell>
                                    <TableCell align="right">{row.Role}</TableCell>
                                    <TableCell align="left">
                                        <Chip label={row.Corporate.Status} color={(row.Corporate.Status.startsWith("ACTIVE"))?"success":"error"} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
        </>


    );
}

export default UserCorporates;
