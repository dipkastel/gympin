import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {Place_getPlaceByUser} from "../../network/api/place.api";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, Divider, TableCell, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";

const _popoverUserPlaces = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userPlaces, setUserPlaces] = useState([]);
    useEffect(() => {
        if(!currentUser) return;
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
        <>
            {userPlaces.length>0&&<>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <Typography sx={{mt:1}} variant={"subtitle2"}>
                    مراکز :
                </Typography>
                <Table className={"table"}>
                    <TableBody>
                        {userPlaces && userPlaces.map(row => (
                            <TableRow key={row.Id}>
                                <TableCell align="right"><Avatar onClick={() => history.push("/place/data/" + row.Id)}
                                                                 alt={row.Name} src={row.Logo ? row.Logo.Url : ""}
                                                                 sx={{width: 20, height: 20}}/></TableCell>
                                <TableCell align="right">{row.Name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
            }
        </>
    );
};

export default _popoverUserPlaces;
