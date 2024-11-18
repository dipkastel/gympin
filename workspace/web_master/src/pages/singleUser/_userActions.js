import React from 'react';
import {Card, CardHeader, FormControlLabel, Switch} from "@mui/material";

const _userActions = () => {
    return (
        <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
            <CardHeader
                title={"عملیات ها"}
                action={(
                    <FormControlLabel
                        control={
                            <Switch   name="susbend" />
                        }
                        label="مسدود سازی"
                    />
                )}
            />
        </Card>
    );
};

export default _userActions;
