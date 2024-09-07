import React, {useContext, useEffect, useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {sms_getAllPatterns} from "../../../../network/api/sms.api";
import __SettingSmsSendManual from "./manual/__SettingSmsSendManual";

const __SettingSmsManual = ({smsSent}) => {

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
            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"scrollable"}
                    aria-label="full width tabs example"
                >
                    {patterns && patterns.map(item => (
                        <Tab key={item.Id} label={item.Name} value={item.Id}/>
                    ))}
                </Tabs>
            </Paper>

            {patterns && <__SettingSmsSendManual pattern={patterns.filter(p => p.Id === selectedTab)?.[0]} smsSent={smsSent}/>}

        </>
    );
};

export default __SettingSmsManual;
