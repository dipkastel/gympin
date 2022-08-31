import React from 'react';
import {Avatar, Button, Card, CardContent, Grid, IconButton, Rating, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const data = [{
    id:458,
    item:"ورود تک جلسه",
    placeName:"باشگاه ورزشی امیر",
},{
    id:458,
    item:"ورود تک جلسه",
    placeName:"باشگاه ورزشی امیر",
},{
    id:458,
    item:"ورود تک جلسه",
    placeName:"باشگاه ورزشی امیر",
},{
    id:458,
    item:"ورود تک جلسه",
    placeName:"باشگاه ورزشی امیر",
}]

const Survey = () => {
    return (
        <div>
            {data.map(item=>(
                <>
                    <Card elevation={3} sx={{margin:1}}>
                        <CardContent>

                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Grid item  xs={10}>
                                    <Typography sx={{paddingY:1}} variant={"h5"}>{item.placeName}</Typography>
                                    <Typography variant={"subtitle1"}>{item.item}</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Rating name="size-large"  defaultValue={0}  size="large" />
                            </Grid>

                        </CardContent>

                    </Card>
                </>
            ))}
        </div>
    );
};

export default Survey;
