import React, {useEffect, useState} from 'react';
import {Card, CardContent, LinearProgress} from "@mui/material";

const _UsageProgress = ({ subscribe,setUserCanEnter}) => {
    const [entryList,setEntryList] = useState([]);
    useEffect(() => {
        if(subscribe.EntryList)
            setEntryList(subscribe.EntryList)
    }, [subscribe]);

    function getProgressValue() {
        if(entryList.length>=subscribe.EntryTotalCount)setUserCanEnter(false)
        return (entryList.length*100)/(subscribe.EntryTotalCount);
    }

    return (
    <>
        {(subscribe.EntryTotalCount>1)&& <Card elevation={3} sx={{margin:1}}>
                <CardContent>

                    <LinearProgress variant="determinate" color={"success"} value={getProgressValue()} />
                </CardContent>
            </Card>
        }
    </>
    );
};

export default _UsageProgress;
