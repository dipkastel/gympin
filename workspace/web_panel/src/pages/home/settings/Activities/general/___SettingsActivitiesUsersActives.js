import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Avatar, Chip, TableCell, Typography} from "@mui/material";
import {service_GetActiveUsers} from "../../../../../network/api/service.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName} from "../../../../../helper";
import {useHistory} from "react-router-dom";

const ___SettingsActivitiesUsersActives = () => {

    const error = useContext(ErrorContext);
    const history = useHistory();

    const [service,SetService] = useState([])

    useEffect(() => {
        getActivities();
    }, []);


    function getActivities() {
        service_GetActiveUsers({
            ToDate: new Date(),
            FromDate: new Date().setDate(new Date().getDate()-1)
        }).then((data) => {
            SetService(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }



    return (
        <>
            <Portlet>
                <PortletHeader
                    title={<>
                        <Typography variant={"subtitle1"}>کاربر های فعال در 24 ساعت گذشته</Typography>
                    </>}
                />

                <PortletBody className={"p-2"}>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right">کاربر</TableCell>
                                <TableCell align="right">زمان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {service && service.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        {item.ExecutorUser &&
                                        <Avatar alt="gatewayImage"
                                                src={(item.ExecutorUser.Avatar?.Url) ? (item.ExecutorUser.Avatar?.Url || "") : ""}
                                                onClick={(e) => history.push({pathname: "/users/details/" + item.ExecutorUser.Id})}
                                                sx={{width: 40, height: 40}}/>
                                        }
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        {item.ExecutorUser && <Typography>
                                            {item.ExecutorUser.FullName ? getUserFixedName(item.ExecutorUser) :
                                                <Chip label={item.ExecutorUser.Username} color={"error"}/>}
                                        </Typography>}


                                    </TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{new Date(item.ExecutionDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PortletBody>
            </Portlet>

        </>
    );
};

export default ___SettingsActivitiesUsersActives;

