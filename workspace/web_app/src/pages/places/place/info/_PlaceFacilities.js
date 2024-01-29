import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Chip, Grid, Typography} from "@mui/material";
import {PlaceOptions_getByPlace} from "../../../../network/api/placeOptions.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _PlaceFacilities = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeOptions,SetPlaceOptions] = useState([])
    useEffect(() => {
        PlaceOptions_getByPlace({Id:place.Id}).then(result=>{
            SetPlaceOptions(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [place]);


    return (
        <div className={"nopadding"}>
            <Card elevation={3} sx={{margin: 1, padding: 1}}>
                <Typography variant={"subtitle1"}>
                    امکانات مجموعه
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    {placeOptions.map((item,number)=>(
                        <Chip size={"small"} key={number} sx={{padding:1,margin:1}} label={item.PlaceOption.Name} />
                    ))}
                </Grid>
            </Card>
        </div>
    );
};

export default _PlaceFacilities;
