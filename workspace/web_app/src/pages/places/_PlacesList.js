import React, {useContext, useEffect, useState} from 'react';
import {Card, Grid, IconButton, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {place_getAll, Place_query} from "../../network/api/place.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Filter, Filter3, FilterAltRounded} from "@mui/icons-material";


const _PlacesList = () => {
    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [places, SetPlaces] = useState([])
    useEffect(() => {
        Place_query({
            queryType: "FILTER",
            Status:'ACTIVE',
            paging: {Page: page, Size: rowsPerPage,Desc:true}
        }).then(result => {
            console.log(result.data.Data.content)
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
            <IconButton >
                <FilterAltRounded/>
            </IconButton>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {places.content&&places.content.map(item => (
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
