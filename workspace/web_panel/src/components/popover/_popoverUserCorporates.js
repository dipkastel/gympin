import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {corporatePersonnel_getByUser} from "../../network/api/CorporatePersonnel.api";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {Avatar, Chip, Divider, TableCell, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";

const _popoverUserCorporates = ({currentUser}) => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCorporates, setUserCorporates] = useState([]);
    useEffect(() => {
        if(!currentUser) return;
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
            {userCorporates.length>0&&<>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <Typography sx={{mt:1}} variant={"subtitle2"}>
                    شرکت ها :
                </Typography>
                <Table className={"table"}>
                    <TableBody>
                        {userCorporates&&userCorporates.map(row => (
                            <TableRow key={row.Id}>
                                <TableCell align="right"><Avatar onClick={()=>history.push("/corporate/details/"+row.Corporate.Id)}  alt={row.Corporate.Name} src={row.Corporate.Multimedias?row.Corporate.Multimedias[0].Url:""}  sx={{width:20,height:20}} /></TableCell>
                                <TableCell align="right">{row.Corporate.Name}</TableCell>
                                <TableCell align="right">{row.Role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
            }
        </>
    );
};

export default _popoverUserCorporates;
