import React, {useContext, useEffect, useState} from 'react';
import {Chip, Grid, Paper, Tab, Tabs} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {sms_getAllPatterns} from "../../../../network/api/sms.api";
import __SettingSmsSendManual from "./manual/__SettingSmsSendManual";

const __SettingSmsManual = () => {

    const error = useContext(ErrorContext);

    const [selectedTab, setSelectedTab] = useState(1);
    const [patterns, setPatterns] = useState(null);

    useEffect(() => {
        getAllPatterns();
    }, []);


    function getAllPatterns() {
        sms_getAllPatterns().then(result => {
            setPatterns(result.data.Data);

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
            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2,p:1}}>
                <Grid container spacing={1}>
                    {patterns && patterns.map(item => (
                        <Chip variant={selectedTab==item.Id?"filled":"outlined"} color={"success"} key={item.Id} label={item.Name} value={item.Id}
                              onClick={(e) => setSelectedTab(item.Id)} />
                    ))}
                </Grid>
            </Paper>
            {patterns && <__SettingSmsSendManual pattern={patterns.filter(p => p.Id === selectedTab)?.[0]}/>}


        </>
    );
};

export default __SettingSmsManual;
