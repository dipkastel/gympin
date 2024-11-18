import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const WPageSelectPlace = ({onNext}) => {

    const [selectedPlace,setSelectedPlace] = useState();
    const navigate = useNavigate()
    const place = useSelector(({place}) => place.place);

    useEffect(() => {
        setSelectedPlace(place);
    }, [place]);


    return (
        <>
             <Card sx={{borderRadius: 3,m:2}} elevation={3}><CardHeader
                sx={{
                    backgroundColor: "primary.main",
                    color: "#fff"
                }}
                title={"انتخاب مرکز"}
            />
                <CardContent sx={{textAlign: "center"}}>
                    {selectedPlace&&<Alert severity="success" sx={{px: 1}}>
                        <Typography variant={"body1"} sx={{px: 1}}>{"مرکز ورزشی " +selectedPlace.Name+ " انتخاب شده است"}</Typography>
                    </Alert>}
                    {!selectedPlace&&<Alert severity="error" sx={{px: 1}}>
                        <Typography variant={"body1"} sx={{px: 1}}>{"لطفا مرکز ورزشی خود ا برای ادامه انتخاب کنید."}</Typography>
                    </Alert>}

                    <Button  fullWidth variant={"contained"} onClick={(e)=>navigate('/management/settings', {replace: true})} >{selectedPlace?"تغییر مرکز":"انتخاب مرکز"}</Button>


                </CardContent>
            </Card>

            {selectedPlace&&<Grid sx={{p:2}}>
                <Button fullWidth variant={"contained"} onClick={(e)=>onNext()} > مرحله بعد </Button>
            </Grid>}


        </>
    );
};

export default WPageSelectPlace;
