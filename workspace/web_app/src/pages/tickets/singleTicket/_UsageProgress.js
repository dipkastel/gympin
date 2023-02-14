import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, IconButton, LinearProgress, Typography} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const _UsageProgress = ({ticket,setUserCanEnter}) => {
    const [entryList,setEntryList] = useState([]);
    useEffect(() => {
        if(ticket.EntryList)
            setEntryList(ticket.EntryList)
    }, [ticket]);

    function getProgressValue() {
        if(entryList.length>=ticket.EntryTotalCount)setUserCanEnter(false)
        return (entryList.length*100)/(ticket.EntryTotalCount);
    }

    return (
    <>
        {(ticket.EntryTotalCount>1)&& <Card elevation={3} sx={{margin:1}}>
                <CardContent>

                    <LinearProgress variant="determinate" color={"success"} value={getProgressValue()} />
                </CardContent>
            </Card>
        }
    </>
    );
};

export default _UsageProgress;
