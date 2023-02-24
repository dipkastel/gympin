import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import {corporate_getByUser} from "../../../../../network/api/corporate.api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

function UserCorporates({ currentUser }) {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCorporates, setUserCorporates] = useState([]);
    useEffect(() => {
        corporate_getByUser({id:currentUser.Id}).then(result=>{
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
                                <TableCell align="left">وضعیت سازمان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userCorporates&&userCorporates.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                    <TableCell align="right"><Avatar onClick={()=>history.push("/corporate/details/"+row.Id)}  alt={row.Name} src={row.Multimedias?row.Multimedias[0].Url:""}  sx={{width:20,height:20}} /></TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="left">
                                        <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>

                <PortletFooter></PortletFooter>
            </Portlet>
        </>


    );
}

export default UserCorporates;
