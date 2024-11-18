import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Chip, Grid, Typography} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {optionOfPlace_getByPlaceId} from "../../../network/api/optionOfPlace.api";

const _PlaceFacilities = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeOptions,SetPlaceOptions] = useState([])
    useEffect(() => {
        optionOfPlace_getByPlaceId({Id:place.Id}).then(result=>{
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
            <Card elevation={3} sx={{borderRadius: 3,margin: 1, padding: 1}}>
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
