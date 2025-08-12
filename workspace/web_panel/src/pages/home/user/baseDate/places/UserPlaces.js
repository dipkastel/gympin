import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Place_getPlaceByUser} from "../../../../../network/api/place.api";

function UserPlaces({currentUser}) {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userPlaces, setUserPlaces] = useState([]);
    useEffect(() => {
        Place_getPlaceByUser({id: currentUser.Id}).then(result => {
            setUserPlaces(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [currentUser]);

    return (
        <Portlet>
            <PortletHeader title="مراکز های کاربر"/>

            <PortletBody>

                <Table className={"table"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">نام مرکز</TableCell>
                            <TableCell align="left">وضعیت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPlaces && userPlaces.map(row => (
                            <TableRow key={row.Id}>
                                <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                <TableCell align="right"><Avatar onClick={() => history.push("/place/data/" + row.Id)}
                                                                 alt={row.Name} src={row.Logo ? row.Logo.Url : ""}
                                                                 sx={{width: 20, height: 20}}/></TableCell>
                                <TableCell align="right">{row.Name}</TableCell>
                                <TableCell align="left">
                                    <Chip label={row.Status}
                                          color={(row.Status.startsWith("ACTIVE")) ? "success" : "error"}/>
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
