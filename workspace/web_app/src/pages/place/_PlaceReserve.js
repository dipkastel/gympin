import React from 'react';
import {Button, Card, Grid, Typography} from "@mui/material";

const data = [{
    name: "بدنسازی تک جلسه",
    price: 80000,
}, {
    name: "بدنسازی 12 جلسه",
    price: 500000,
}, {
    name: "بدنسازی 24 جلسه",
    price: 600000,
}];
const _PlaceReserve = () => {
    return (
        <div className={"nopadding"}>
            {data.map(item => (
                    <Card  elevation={3} sx={{margin: 1, padding: 1}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <Grid>
                                <Typography variant={"subtitle1"}>
                                    {item.name}
                                </Typography>
                                <Typography variant={"subtitle2"}>
                                    { item.price}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Button variant={"outlined"}>پیش خرید</Button>
                            </Grid>
                        </Grid>
                    </Card>
                )
            )}
        </div>
    );
};

export default _PlaceReserve;
