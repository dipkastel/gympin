import React, {useContext, useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {place_getAll} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";


const _PlacesList = () => {
    const error = useContext(ErrorContext);
    const [places, SetPlaces] = useState([])
    useEffect(() => {
        place_getAll().then(result => {
            SetPlaces(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    return (
        <>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places&&places.map(item => (
                        <Grid key={item.Id} item component={"a"} href={"/place/" + item.Id} sx={{textDecoration: "none"}}
                              lg={3} md={4} sm={6} xs={6}>
                            <Card elevation={3} sx={{margin: 0.5, padding: 0.5}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item md={6} sm={6} xs={12} sx={{padding: 0.5}}>
                                        <Image src={item.Multimedias[0] ? item.Multimedias[0].Url : "https://api.gympin.ir/resource/image?Id=11"} width={"100%"}
                                               rounded={3}/>
                                    </Grid>
                                    <Grid item sx={{padding: 0}} md={6} sm={6} xs={12}>
                                        <Typography variant={"h5"}>
                                            {item.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {item.Location&&item.Location.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {item.Sports&&item.Sports.map((sport, number) => (
                                                sport.Name + ((number !== (item.Sports.length - 1)) ? ",\t" : "")
                                            ))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
};

export default _PlacesList;
