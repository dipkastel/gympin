import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip, Grid, Typography} from "@mui/material";
import {PlaceOptions_getByPlace} from "../../../../network/api/placeOptions.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _PlaceSports = ({place}) => {

    return (

        <div className={"nopadding"}>
            <Card elevation={3}  sx={{mx: 2,mt:4,mb:2, padding: 1}}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt:-5,bgcolor:"#FFFFFF",position:"absolute",px:3}} gutterBottom>
                        ورزش ها
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent={"left"}
                        alignItems="stretch"
                    >
                        {place?.Sports?.map((item,number)=>(
                            <Chip size={"small"} key={number} sx={{padding:1,margin:1}} label={item.Name} />
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default _PlaceSports;
