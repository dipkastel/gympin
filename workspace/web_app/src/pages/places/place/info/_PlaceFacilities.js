import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Chip, Grid2 as Grid, ListItem, Typography} from "@mui/material";
import {PlaceOptions_getByPlace} from "../../../../network/api/placeOptions.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {CheckCircle, FormatListBulleted} from "@mui/icons-material";

const _PlaceFacilities = ({place}) => {
    const error = useContext(ErrorContext);
    const [placeOptions, SetPlaceOptions] = useState([])
    useEffect(() => {
        PlaceOptions_getByPlace({Id: place.Id}).then(result => {
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
        <Card elevation={3} sx={{mx: 2, mt: 4, mb: 2, padding: 1}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" textAlign={"left"} sx={{mt: -5, bgcolor: "#FFFFFF", position: "absolute", px: 3}}
                            gutterBottom>
                    امکانات مجموعه
                </Typography>
                <Grid
                    container
                    direction="row"
                    alignItems="stretch"
                >
                    {placeOptions.map((item, number) => (
                        <Grid container direction={"row"} size={6} key={"fs-"+number} >
                          <CheckCircle fontSize={"small"} color={"success"} />  <Typography variant={"body2"} sx={{pl:1}}>{item.PlaceOption.Name}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default _PlaceFacilities;
