import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Chip, Grid, Typography} from "@mui/material";
import {PlaceOptions_getByPlace} from "../../../../network/api/placeOptions.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _PlaceSports = ({place}) => {

    return (
        <div className={"nopadding"}>
            <Card elevation={3} sx={{margin: 1, padding: 1}}>
                <Typography variant={"subtitle1"}>
                    ورزش های مجموعه
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    {place?.Sports?.map((item,number)=>(
                        <Chip size={"small"} key={number} sx={{padding:1,margin:1}} label={item.Name} />
                    ))}
                </Grid>
            </Card>
        </div>
    );
};

export default _PlaceSports;
