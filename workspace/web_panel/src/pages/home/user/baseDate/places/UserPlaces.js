import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import { Place_getPlaceByUser} from "../../../../../network/api/place.api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";

function UserPlaces({ currentUser }) {
    const history = useHistory();
    const [userPlaces, setUserPlaces] = useState([]);
    useEffect(() => {
        Place_getPlaceByUser({id:currentUser.Id}).then(result=>{
            console.log(result.data.Data)
            setUserPlaces(result.data.Data)
        }).catch(e=>console.log(e))
    }, [currentUser]);

    return (
        <Portlet>
            <PortletHeader title="مراکز های کاربر" />

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
                        {userPlaces&&userPlaces.map(row => (
                            <TableRow key={row.Id}>
                                <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                                <TableCell align="right"><Avatar onClick={()=>history.push("/place/data/"+row.Id)}  alt={row.Name} src={row.Logo?row.Logo.Url:""}  sx={{width:20,height:20}} /></TableCell>
                                <TableCell align="right">{row.Name}</TableCell>
                                <TableCell align="left">
                                    <Chip label={row.Status} color={(row.Status.startsWith("ACTIVE"))?"success":"error"} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </PortletBody>
        </Portlet>
    );
}
export default UserPlaces;
