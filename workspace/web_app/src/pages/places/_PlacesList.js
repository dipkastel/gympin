import React, {useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {place_getAll} from "../../network/api/place.api";


const _PlacesList = () => {
    const [places, SetPlaces] = useState([])
    useEffect(() => {
        place_getAll().then(result => {
            console.log(result)
            SetPlaces(result.data.Data)
        }).catch(e => console.log(e))
    }, []);

    return (
        <>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.map(item => (
                        <Grid key={item.Id} item component={"a"} href={"/place/" + item.Id} sx={{textDecoration: "none"}}
                              md={6} sm={6} xs={6}>
                            <Card elevation={3} sx={{margin: 0.5, padding: 0.5}}>
                                <Grid container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Grid item md={6} sm={6} xs={6} sx={{padding: 0.5}}>
                                        <Image src={item.Multimedias[0] ? item.Multimedias[0].Url : "2"} width={"100%"}
                                               rounded={3}/>
                                    </Grid>
                                    <Grid item sx={{padding: 0}} md={6} sm={6} xs={6}>
                                        <Typography variant={"subtitle1"}>
                                            {item.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {'\r\n' + item.Location.Name}
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {item.Sports.map((sport, number) => (
                                                sport.Name + ((number !== (item.Sports.length - 1)) ? ",\t" : "")
                                            ))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                )}
                {/*{data.Data.map(item => (*/}
                {/*        <Grid key={item.id} item component={"a"} href={"/place?id="+item.id+"&name="+item.name} sx={{textDecoration:"none"}} md={6} sm={6} xs={6}>*/}
                {/*            <Card elevation={3} sx={{margin:0.5,padding:0.5}}>*/}
                {/*                <Grid container*/}
                {/*                      direction="row"*/}
                {/*                      justifyContent="center"*/}
                {/*                      alignItems="center">*/}
                {/*                    <Grid item md={6} sm={6} xs={6} sx={{padding:0.5}}>*/}
                {/*                        <Image src={item.image} width={"100%"} rounded={3}/>*/}
                {/*                    </Grid>*/}
                {/*                    <Grid item sx={{padding:0}} md={6} sm={6} xs={6}>*/}
                {/*                        <Typography variant={"subtitle1"}>*/}
                {/*                            {item.name}*/}
                {/*                        </Typography>*/}
                {/*                        <Typography variant={"body1"}>*/}
                {/*                            {'\r\n'+item.address}*/}
                {/*                        </Typography>*/}
                {/*                        <Typography variant={"body2"}>*/}
                {/*                            {item.sports.map(sport=>(*/}
                {/*                                sport+","*/}
                {/*                            ))}*/}
                {/*                        </Typography>*/}
                {/*                    </Grid>*/}
                {/*                </Grid>*/}
                {/*            </Card>*/}
                {/*        </Grid>*/}
                {/*    )*/}
                {/*)}*/}
            </Grid>
        </>
    );
};

export default _PlacesList;
