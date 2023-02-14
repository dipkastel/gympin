import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Divider, Grid, Typography} from "@mui/material";
import {TransactionTypes} from "../../../../../helper/enums/TransactionTypes";
import {toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";

const _TicketEntryList = ({ticket}) => {
    const [entryList,setEntryList] = useState(ticket.EntryList);
    useEffect(() => {
        setEntryList(ticket.EntryList)
    }, [ticket]);

    return (

        <Portlet>
            <PortletHeader title="ورود های کاربر"/>
            <PortletBody>
                {entryList&&entryList.map((item, Number) => (
                    <div key={Number}>
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Typography variant={"body2"} component={"span"}>
                                {"ورود : "+new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>
                            <Typography variant={"body2"} component={"span"}>
                                {"  خروج : "+new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>
                        </Grid>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                    </div>

                ))}
            </PortletBody>
        </Portlet>
    );
};

export default _TicketEntryList;
