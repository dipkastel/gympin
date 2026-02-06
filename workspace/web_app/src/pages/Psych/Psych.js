import React, {useContext, useEffect, useState} from 'react';
import {gym_query} from "../../network/api/gym.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {CircularProgress, Grid2 as Grid} from "@mui/material";
import __placeListItem from "../places/placesList/__placeListItem";

const Psych = () => {
    const error = useContext(ErrorContext);
    const [places, setPlaces] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData(0);
    }, []);


    function getData(page) {
        setIsLoading(true)
        gym_query({
            queryType: "FILTER",
            TagName: "روانشناسی",
            paging: {Page: page, Size: 20, Desc: true, OrderBy: "Id"}
        }).then(result => {
            setIsLoading(false)
            setPlaces(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    };

    return (

        <>

            {places && <>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {places.content && places.content.map(item => (
                            <Grid item component={"a"} key={"5i" + item.Id} sx={{textDecoration: "none"}}
                                  lg={3} size={{md: 4, sm: 6, xs: 12}}>
                                <__placeListItem item={item}/>
                            </Grid>
                        )
                    )}
                    {isLoading && <div>
                        <CircularProgress/>
                    </div>}
                </Grid>
            </>}
            {!places && <Grid
                container
                sx={{width: "100%", height: "80vh"}}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <CircularProgress/>
            </Grid>}
        </>
    );
};

export default Psych;
