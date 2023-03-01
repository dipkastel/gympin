import React, {useEffect, useState} from 'react';
import {Card, CardContent, LinearProgress} from "@mui/material";

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
