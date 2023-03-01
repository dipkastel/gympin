import React, {useContext, useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _PlaceAbout = ({place}) => {
    const error = useContext(ErrorContext);
    const [abouts,SetAbouts] = useState([]);
    useEffect(() => {
        PlaceAbout_getByPlace({Id:place.Id}).then(result=>{
            SetAbouts(result.data.Data)
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
            {abouts.map((item,number) => (
                    <Card key={number}  elevation={3} sx={{margin: 1, padding: 1}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid>
                                <Typography variant={"subtitle1"}>
                                    {item.Name}
                                </Typography>
                                <Typography variant={"subtitle2"}>
                                    { item.Description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                )
            )}
        </div>
    );
};

export default _PlaceAbout;
